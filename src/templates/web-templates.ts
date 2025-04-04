import * as UTILS from '../utils/web-utils'
import { ColorToken, TextStyleToken, FontFace, RawSvg } from '../types'
import groupBy from 'lodash/groupBy'
import { kebabCase, pascalCase } from 'change-case'

const warningComment = '/* File automatically generated; DO NOT edit! */'

export function paletteSCSS(colorTokens: ColorToken[]): string {
  const groupedTokens = groupBy(colorTokens, t => t.scheme)
  for (const key in groupedTokens) {
    groupedTokens[key] = groupedTokens[key].sort((a, b) => a.key.localeCompare(b.key))
  }
  
  const schemeColors = (schemeName: string, tokens: ColorToken[]) => 
`$${schemeName}-scheme-colors: (
${tokens.map(c => `  '${kebabCase(c.key)}': #${c.hexCode},`).join('\n')}
);`
  
  const colorClass = (tokens: ColorToken[]) => `.color {
${tokens.map(c => {
  const kebabKey = kebabCase(c.key)
  return `  &.${kebabKey} {
    @include color-attribute('color', '${kebabKey}');
  }`
}).join('\n')
}
}
`
 
  return `${warningComment}

@use 'sass:map';
  
${schemeColors('light', groupedTokens['light'])}

${schemeColors('dark', groupedTokens['dark'])}

@mixin color-attribute($attribute, $color, $alpha:1) {
  & {
    #{$attribute}: rgba(map.get($light-scheme-colors, $color), $alpha);
    
    @media (prefers-color-scheme: dark) {
      #{$attribute}: rgba(map.get($dark-scheme-colors, $color), $alpha);
    }
  }
};

@mixin color-attributes($attribute-map, $alpha:1) {
  @each $attribute, $color in $attribute-map {
    @include color-attribute($attribute, $color, $alpha);
  }
};
`
}

export function paletteTS(colorTokens: ColorToken[]): string {
  const groupedTokens = groupBy(colorTokens, (c) => c.scheme)

  return `${warningComment}

export enum ColorScheme {
${Object.keys(groupedTokens).map(sk => `  ${pascalCase(sk)},`).join('\n')}
}

export enum Color {
${groupedTokens['light'].map(c => `  ${pascalCase(c.key)} = '${kebabCase(c.key)}',`).join('\n')}
}

export const schemeColor = (scheme: ColorScheme, color: Color): number => {
  switch(scheme) {
  ${Object.keys(groupedTokens)
    .map(sk => {
      return `  case ColorScheme.${pascalCase(sk)}:
      switch(color) {
${groupedTokens[sk].map(c => `        case Color.${pascalCase(c.key)}: return 0x${c.hexCode}`).join('\n')} 
      }
      break
    `
    })
    .join('')}
  }
}
`
}

const fontFace = (face: FontFace, path: string) => 
`@font-face {
  font-family: '${face.family}';
  src: ${face.formats.map((format, index) => {
  return `url('${path}/${face.fileName}.${format.extension}') format('${format.name}')${index === (face.formats.length - 1) ? ';' : ','}`
}).join(' ')
}
}
`

const textStyleRule = (
  selector: string, 
  textStyle: TextStyleToken, 
  ignoresFontSize: boolean, 
  exclusiveTextStyle?: TextStyleToken
) => {
  let rule = `${selector} {\n`
  if (textStyle.fontFamily !== exclusiveTextStyle?.fontFamily) {
    rule += `  font-family: '${textStyle.fontFamily}', ${selector.match(/serif/) !== null ? 'serif' : 'sans-serif'};\n`
  }
  
  rule += `  font-weight: normal;\n`
  
  if (!ignoresFontSize) {
    rule += `  font-size: ${UTILS.toEm(textStyle.fontSize)};\n`
  }
  
  rule += `}\n`
  return rule
}

export function typographySCSS(textStyleTokens: TextStyleToken[], fontsPath: string): string {
  enum TextStyleSelectorType {
    Element,
    Class
  }
  type TargetTextStyleRule = {
    key: string
    variants?: string[]
    selectorType: TextStyleSelectorType,
    ignoresFontSize: boolean
  }
  
  const targetRules: TargetTextStyleRule[] = [
    { key: 'h1', selectorType: TextStyleSelectorType.Element, ignoresFontSize: false },
    { key: 'h2', selectorType: TextStyleSelectorType.Element, ignoresFontSize: false },
    { key: 'h3', selectorType: TextStyleSelectorType.Element, ignoresFontSize: false },
    { key: 'h4', selectorType: TextStyleSelectorType.Element, ignoresFontSize: false },
    { key: 'h5', selectorType: TextStyleSelectorType.Element, ignoresFontSize: false },
    { key: 'h6', selectorType: TextStyleSelectorType.Element, ignoresFontSize: false },
    { key: 'body', selectorType: TextStyleSelectorType.Element, ignoresFontSize: false },
    { key: 'strong', variants: ['serif', 'italic'], selectorType: TextStyleSelectorType.Element, ignoresFontSize: true },
    { key: 'caption', selectorType: TextStyleSelectorType.Class, ignoresFontSize: false },
    { key: 'italic', variants: ['serif'], selectorType: TextStyleSelectorType.Class, ignoresFontSize: true },
    { key: 'serif', variants: [], selectorType: TextStyleSelectorType.Class, ignoresFontSize: true },
  ]
  
  type TextStyleRule = {
    selector: string
    textStyle: TextStyleToken
    exclusiveTextStyle?: TextStyleToken,
    ignoresFontSize: boolean
  }
  
  const rules: TextStyleRule[] = []
  
  for (const target of targetRules) {
    for (const variant of [undefined, ...(target.variants ?? [])]) {
      const styleKey = variant !== undefined ? `${target.key} ${variant}` : target.key
      const textStyle = textStyleTokens.find(ts => ts.key === styleKey)
      if (textStyle === undefined){
        continue
      }
      const partialSelector = variant !== undefined ? `${target.key}.${variant}` : target.key
      let selector: string
      switch (target.selectorType) {
        case TextStyleSelectorType.Class:
          selector = `.${partialSelector}`
          break
        case TextStyleSelectorType.Element:
          selector = `${partialSelector}, .${partialSelector}`
          break
      }
      rules.push({ 
        selector: selector, 
        textStyle: textStyle, 
        exclusiveTextStyle: variant ? textStyleTokens.find(ts => ts.key === target.key) : undefined,
        ignoresFontSize: target.ignoresFontSize
      })
    }
  }
  
  return `${warningComment}

html {
  font-size: ${UTILS.emPx}px;
}
  
${UTILS.fontFaces(textStyleTokens).map(f => fontFace(f, fontsPath)).join('\n')}
${rules.map(r => `${textStyleRule(r.selector, r.textStyle, r.ignoresFontSize, r.exclusiveTextStyle)}`).join('\n')}
`
}

export function iconographySCSS(svgTemplates: RawSvg[]): string {
  return `${warningComment}
  
@use 'sass:string';
@use 'sass:map';
@use 'sass:list';
@use 'palette';

@function colored-encoded-icon($icon, $color, $color-map) {
  $color-string: '%23' + string.slice(#{map.get($color-map, $color)}, 2);
  
${svgTemplates.map((rawSvg, index) => {
  const encodedRawSvg = encodeURI(rawSvg.value)
  return `${index > 0 ? '  } @else if' : '  @if'} $icon == '${rawSvg.key}' {
    @return '${encodedRawSvg.replace(/currentColor/g, '#{$color-string}')}';`
  }).join('\n')}
  }
  @return 'not-found';
};

@mixin colored-icon-content-attribute($icon, $color) {
  content: url("data:image/svg+xml, #{colored-encoded-icon($icon, $color, palette.$light-scheme-colors)}");
  
  @media (prefers-color-scheme: dark) {
    content: url("data:image/svg+xml, #{colored-encoded-icon($icon, $color, palette.$dark-scheme-colors)}");
  }
};
`
}

export function iconographyTS(rawSvgs: RawSvg[]): string {
  return `${warningComment}

export enum Icon {
${rawSvgs.map(svg => `  ${pascalCase(svg.key)} = '${kebabCase(svg.key)}',`).join('\n')}
}

export function svgIconString(icon: Icon): string {
  let pathsString = ''
  
  switch (icon) {
${rawSvgs.map(svg => {
  const regExp = /^(?:<svg.*)\n((.?|\n)*)(?:\n<\/svg>(.?|\n)*)$/
  const valueParts = [...regExp.exec(svg.value)!]
  
  return `    case Icon.${pascalCase(svg.key)}:
      pathsString = \`${valueParts[1]}\`
      break`
  }).join('\n')}
  }
  
  return \`<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\${pathsString}</svg>\`
}`
}
