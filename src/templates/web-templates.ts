import { Color, TextStyle, FontFace } from '../types'
import * as utils from '../utils/web-utils'
import groupBy from 'lodash/groupBy'
import { kebabCase, pascalCase } from 'change-case'

const warningComment = '/* File automatically generated; DO NOT edit! */'

export const mixinsSCSS = `${warningComment}

@use 'color';

@mixin colorAttribute($attributeName, $colorKey) {
  $lightSchemeColors: map-get(color.$schemeColors, 'light');
  $darkSchemeColors: map-get(color.$schemeColors, 'dark');
  
  #{$attributeName}: map-get($lightSchemeColors, $colorKey);
  
  @media (prefers-color-scheme: dark) {
    #{$attributeName}: map-get($darkSchemeColors, $colorKey);
  }
};
`

export function schemedColorsSCSS(colors: Color[]): string {
  const groupedColors = groupBy(colors, (c) => c.scheme)
  const color = (color: Color) => `    '${kebabCase(color.name)}': #${color.hexCode},`
  const schemeColors = (scheme: string, colors: Color[]) => 
`  '${scheme}': (
${colors.map(c => color(c)).join('\n')}
  ),`
  
  return `${warningComment}

$schemeColors: (
${Object.entries(groupedColors)
  .map(([scheme, colors]) => schemeColors(scheme, colors))
  .join('\n')}
);
`
}

export function schemedColorsTS(colors: Color[]): string {
  const groupedColors = groupBy(colors, (c) => c.scheme)

  return `${warningComment}

export enum ColorScheme {
${Object.keys(groupedColors).map(sk => `  ${pascalCase(sk)},`).join('\n')}
}

export enum ColorKey {
${groupedColors['light'].map(c => `  ${pascalCase(c.name)},`).join('\n')}
}

export const valueForScheme = (scheme: ColorScheme, colorKey: ColorKey): number => {
  switch(scheme) {
  ${Object.keys(groupedColors)
    .map(sk => {
      return `  case ColorScheme.${pascalCase(sk)}:
      switch(colorKey) {
${groupedColors[sk].map(c => `        case ColorKey.${pascalCase(c.name)}: return 0x${c.hexCode}`).join('\n')} 
      }
    `
    })
    .join('')}
  }
}

const mediaQueryToMatch = '(prefers-color-scheme: dark)'
const colorScheme = (matchesQuery: boolean) => matchesQuery ? ColorScheme.Dark : ColorScheme.Light

export let currentColorScheme: ColorScheme = colorScheme(window.matchMedia(mediaQueryToMatch).matches)

window.matchMedia(mediaQueryToMatch).addEventListener('change', e => {
   currentColorScheme = colorScheme(e.matches)
})
   
export const value = (key: ColorKey) => valueForScheme(currentColorScheme, key)
`
}

// const typographyVars = (headingFont: string, bodyFont: string) =>
// `$heading-font: '${headingFont}', sans-serif;
// $body-font: '${bodyFont}', sans-serif;
// `

const fontFace = (face: FontFace, path: string) => 
`@font-face {
  font-family: '${face.family}';
  src: local('${face.family}'), url('${path}/${face.fileName}') format('woff2');
}
`

const elementStyling = (style: TextStyle, asClass: boolean) => 
`${asClass ? `.${utils.classifyKey(style.key)}` : style.key} {
  font-family: '${style.fontFamily}', sans-serif;
  font-size: ${utils.toEm(style.fontSize)};
  font-weight: ${style.fontWeight};
  letter-spacing: ${utils.toEm(style.letterSpacing)};
  line-height: ${Math.ceil(style.lineHeight)}%;
  text-transform: ${utils.textTransform(style.textCase)};
}
`

const weightStyling = (style: TextStyle) =>
`${style.key} {
  font-family: '${style.fontFamily}', sans-serif;
  font-weight: ${style.fontWeight};
}
`

const italicStyling = (style: TextStyle, asClass: boolean) =>
`${asClass ? '.' : ''}${style.key} {
  font-family: '${style.fontFamily}', sans-serif;
  font-style: italic;
}
`

export function typographySCSS(textStyles: TextStyle[], fontsPath: string): string {
  const elementStyleKeys = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body']
  const weightStyleKeys = ['strong']
  const italicStyleKeys = ['italic']
  const classStyleKeys = ['footnote', 'caption']
  
  const tsKeyIcludesDesiredKey = (ts: TextStyle, dKeys: string[]) => dKeys.find((dk) => ts.key.includes(dk)) != null

  const elementStyles = textStyles.filter(ts => elementStyleKeys.includes(ts.key))
  const weightStyles = textStyles.filter(ts => weightStyleKeys.includes(ts.key))
  const italicStyles = textStyles.filter(ts => italicStyleKeys.includes(ts.key))
  const classStyles = textStyles.filter(ts => tsKeyIcludesDesiredKey(ts, classStyleKeys))
  
  // const headingFont = textStyles.find(ts => ts.key == 'h1')!.fontFamily
  // const bodyFont = textStyles.find(ts => ts.key == 'body')!.fontFamily
  // ${typographyVars(headingFont, bodyFont)}
  
  return `${warningComment}
  
${utils.fontFaces(textStyles).map(f => fontFace(f, fontsPath)).join('\n')}
${elementStyles.map(es => elementStyling(es, false)).join('\n')}
${weightStyles.map(ws => weightStyling(ws)).join('\n')}
${italicStyles.map(is => italicStyling(is, true)).join('\n')}
${classStyles.map(cs => elementStyling(cs, true)).join('\n')}
`
}
