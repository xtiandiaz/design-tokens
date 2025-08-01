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
 
  return `${warningComment}

@use 'sass:color';
@use 'sass:list';
@use 'sass:map';
  
${schemeColors('light', groupedTokens['light'])}

${schemeColors('dark', groupedTokens['dark'])}

@mixin _color-attribute($attribute, $light-scheme-color, $dark-scheme-color, $inverted: false) {
  & {
    #{$attribute}: if($inverted, $dark-scheme-color, $light-scheme-color);
    
    @media (prefers-color-scheme: dark) {
      #{$attribute}: if($inverted, $light-scheme-color, $dark-scheme-color);
    }
  }
}

@mixin color-attribute($attribute, $color-alpha, $inverted: false) {
  $color-key: list.nth($color-alpha, 1);
  $alpha: if(list.length($color-alpha) > 1, list.nth($color-alpha, 2), 1);
  
  @include _color-attribute(
    $attribute, 
    rgba(map.get($light-scheme-colors, $color-key), $alpha),
    rgba(map.get($dark-scheme-colors, $color-key), $alpha),
    $inverted
  )
}
  
@mixin color-attributes($attribute-color-alpha-map, $inverted: false) {
  @each $attribute, $color-alpha in $attribute-color-alpha-map {
    $alpha: if(list.length($color-alpha) > 1, list.nth($color-alpha, 2), 1);
    
    @include color-attribute($attribute, list.nth($color-alpha, 1) $alpha, $inverted);
  }
}

@mixin mixed-color-attribute($attribute, $color-key-from, $color-key-to, $at, $alpha: 1) {
  $percentage: clamp(0, $at, 100);
  
  @include _color-attribute(
    $attribute, 
    color.mix(
      rgba(map.get($light-scheme-colors, $color-key-to), $alpha),
      rgba(map.get($light-scheme-colors, $color-key-from), $alpha),
      $percentage,
      $method: rgb
    ),
    color.mix(
      rgba(map.get($dark-scheme-colors, $color-key-to), $alpha),
      rgba(map.get($dark-scheme-colors, $color-key-from), $alpha),
      $percentage,
      $method: rgb
    ),
  )
}
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
${Object.keys(groupedTokens).map(sk => {
return `    case ColorScheme.${pascalCase(sk)}:
      switch(color) {
${groupedTokens[sk].map(c => `        case Color.${pascalCase(c.key)}: return 0x${c.hexCode}`).join('\n')} 
      }
      break`
    })
    .join('\n')}
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

const textStyleRule = (textStyle: TextStyleToken) => {
  const adaptedKey = textStyle.key.replace(/[- ]/g, '.')
  const isElement =  /^h[1-6]|body|strong/.test(adaptedKey)
  const ignoresFontSize = /^strong|serif|italic|handwritten/.test(adaptedKey)
  const selector = isElement ? `${adaptedKey}, .${adaptedKey}` : `.${adaptedKey}` 
  
  let mixin = `@mixin ${textStyle.key}() {
  font-family: '${textStyle.fontFamily}', ${selector.match(/serif/) !== null ? 'serif' : 'sans-serif'};
  font-weight: normal;
`
  
  if (!ignoresFontSize) {
    mixin += `  font-size: ${UTILS.toEm(textStyle.fontSize)};\n`
    mixin += `  line-height: ${textStyle.fontSize <= 16 ? 1.5 : 1.25};\n`
  }
  
  mixin += `}

${selector}, %${textStyle.key} {
  @include ${textStyle.key}();
}
`
  
  return mixin
}

export function typographySCSS(textStyleTokens: TextStyleToken[], fontsPath: string): string {    
  return `${warningComment}

html {
  font-size: ${UTILS.emPx}px;
}
  
${UTILS.fontFaces(textStyleTokens).map(tst => fontFace(tst, fontsPath)).join('\n')}
${textStyleTokens.map(tst => `${textStyleRule(tst)}`).join('\n')}
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
