import * as UTILS from '../utils/web-utils'
import { ColorToken, TextStyleToken, FontFace, IconToken, EncodedSvgTemplate } from '../types'
import groupBy from 'lodash/groupBy'
import { kebabCase, pascalCase } from 'change-case'

const warningComment = '/* File automatically generated; DO NOT edit! */'

export function paletteSCSS(colorTokens: ColorToken[]): string {
  const groupedTokens = groupBy(colorTokens, t => t.scheme)
  const schemeColors = (schemeName: string, colors: ColorToken[]) => 
`$${schemeName}-scheme-colors: (
${colors.map(c => `  '${kebabCase(c.name)}': #${c.hexCode},`).join('\n')}
);`
  
  return `${warningComment}

@use 'sass:map';
  
${schemeColors('light', groupedTokens['light'])}

${schemeColors('dark', groupedTokens['dark'])}

@mixin color-attribute($attribute, $color-key, $alpha:1) {
  & {
    #{$attribute}: rgba(map.get($light-scheme-colors, $color-key), $alpha);
    
    @media (prefers-color-scheme: dark) {
      #{$attribute}: rgba(map.get($dark-scheme-colors, $color-key), $alpha);
    }
  }
};

@mixin color-attributes($map, $alpha:1) {
  @each $attribute, $color-key in $map {
    @include color-attribute($attribute, $color-key, $alpha);
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

export enum ColorKey {
${groupedTokens['light'].map(c => `  ${pascalCase(c.name)} = '${kebabCase(c.name)}',`).join('\n')}
}

export const schemeColor = (scheme: ColorScheme, colorKey: ColorKey): number => {
  switch(scheme) {
  ${Object.keys(groupedTokens)
    .map(sk => {
      return `  case ColorScheme.${pascalCase(sk)}:
      switch(colorKey) {
${groupedTokens[sk].map(c => `        case ColorKey.${pascalCase(c.name)}: return 0x${c.hexCode}`).join('\n')} 
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

const textStyleRule = (selector: string, textStyle: TextStyleToken, exclusiveTextStyle?: TextStyleToken) => {
  let rule = `${selector} {\n`
  if (textStyle.fontFamily !== exclusiveTextStyle?.fontFamily) {
    rule += `  font-family: '${textStyle.fontFamily}', ${selector.match(/serif/) !== null ? 'serif' : 'sans-serif'};\n`
  }
  if (textStyle.fontWeight !== exclusiveTextStyle?.fontWeight) {
    rule += `  font-weight: ${textStyle.fontWeight};\n`
  }
  
  rule += `  font-size: ${UTILS.toEm(textStyle.fontSize)};\n`
  
  if (textStyle.letterSpacing !== exclusiveTextStyle?.letterSpacing) {
    rule += `  letter-spacing: ${UTILS.toEm(textStyle.letterSpacing)};\n`
  }
  if (textStyle.lineHeight !== exclusiveTextStyle?.lineHeight) {
    rule += `  line-height: ${Math.ceil(textStyle.lineHeight)}%;\n`
  }
  if (textStyle.textCase !== exclusiveTextStyle?.textCase) {
    rule += `  text-transform: ${UTILS.textTransform(textStyle.textCase)};\n`
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
    variants: string[]
    selectorType: TextStyleSelectorType
  }
  
  const targetRules: TargetTextStyleRule[] = [
    { key: 'h1', variants: ['serif', 'italic'], selectorType: TextStyleSelectorType.Element },
    { key: 'h2', variants: ['serif', 'italic'], selectorType: TextStyleSelectorType.Element },
    { key: 'h3', variants: ['serif', 'italic'], selectorType: TextStyleSelectorType.Element },
    { key: 'h4', variants: ['serif', 'italic'], selectorType: TextStyleSelectorType.Element },
    { key: 'h5', variants: ['serif', 'italic'], selectorType: TextStyleSelectorType.Element },
    { key: 'h6', variants: ['serif', 'italic'], selectorType: TextStyleSelectorType.Element },
    { key: 'body', variants: [], selectorType: TextStyleSelectorType.Element },
    { key: 'strong', variants: ['serif', 'italic'], selectorType: TextStyleSelectorType.Element },
    { key: 'italic', variants: ['serif'], selectorType: TextStyleSelectorType.Class },
    { key: 'serif', variants: [], selectorType: TextStyleSelectorType.Class },
    { key: 'footnote', variants: [], selectorType: TextStyleSelectorType.Class },
    { key: 'caption', variants: ['all-caps'], selectorType: TextStyleSelectorType.Class },
  ]
  
  type TextStyleRule = {
    selector: string
    textStyle: TextStyleToken
    exclusiveTextStyle?: TextStyleToken
  }
  
  const rules: TextStyleRule[] = []
  
  for (const target of targetRules) {
    for (const variant of [undefined, ...target.variants]) {
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
        exclusiveTextStyle: variant !== undefined ? textStyleTokens.find(ts => ts.key === target.key) : undefined
      })
    }
  }
  
  return `${warningComment}

html {
  font-size: ${UTILS.emPx}px;
}
  
${UTILS.fontFaces(textStyleTokens).map(f => fontFace(f, fontsPath)).join('\n')}
${rules.map(r => `${textStyleRule(r.selector, r.textStyle, r.exclusiveTextStyle)}`).join('\n')}
`
}

export function iconographySCSS(encodedSvgTemplates: EncodedSvgTemplate[]): string {
  return `${warningComment}
  
@use 'sass:string';
@use 'sass:map';
@use 'sass:list';
@use 'palette';

@function colored-encoded-icon($icon-key, $color-key, $color-map) {
  $color-string: '%23' + string.slice(#{map.get($color-map, $color-key)}, 2);
  
${encodedSvgTemplates.map((template, index) => {
  return `${index > 0 ? '  } @else if' : '  @if'} $icon-key == '${template.key}' {
    @return '${template.template.replace(/currentColor/g, '#{$color-string}')}';`
  }).join('\n')}
  }
  @return 'not-found';
};

@mixin colored-icon-content-attribute($icon-key, $color-key) {
  $scheme-colored-encoded-icons: (
    colored-encoded-icon($icon-key, $color-key, palette.$light-scheme-colors),
    colored-encoded-icon($icon-key, $color-key, palette.$dark-scheme-colors)
  );
  
  content: url("data:image/svg+xml, #{list.nth($scheme-colored-encoded-icons, 1)}");
  
  @media (prefers-color-scheme: dark) {
    content: url("data:image/svg+xml, #{list.nth($scheme-colored-encoded-icons, 2)}");
  }
};
  
.icon {
  display: block;
  width: ${UTILS.toEm(24)};
  height: ${UTILS.toEm(24)};
}
`
}

export function iconographyTS(iconTokens: IconToken[]): string {
  return `${warningComment}

export enum IconKey {
${iconTokens.map(t => `  ${pascalCase(t.key)} = '${kebabCase(t.key)}',`).join('\n')}
}
`
}
