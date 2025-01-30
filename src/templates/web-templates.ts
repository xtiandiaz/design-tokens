import { Color, TextStyle, FontFace } from '../types'
import * as utils from '../utils/web-utils'
import groupBy from 'lodash/groupBy'
import { kebabCase, camelCase, capitalCase } from 'change-case'

export const schemingSCSS = `@use 'colors';

@mixin scheme($property, $color) {
  $lightSchemeColors: map-get(colors.$schemedColors, 'light');
  $darkSchemeColors: map-get(colors.$schemedColors, 'dark');
  
  #{$property}: map-get($lightSchemeColors, $color);
  
  @media (prefers-color-scheme: dark) {
    #{$property}: map-get($darkSchemeColors, $color);
  }
};
`

export function schemedColorsSCSS(colors: Color[]): string {
  const groupedColors = groupBy(colors, (c) => c.scheme)
  const color = (color: Color) => `        '${kebabCase(color.name)}': #${color.hexCode},`
  const schemeColors = (scheme: string, colors: Color[]) => 
`  '${scheme}': (
${colors.map(c => color(c)).join('\n')}
  ),`
    
  return `$schemedColors: (
${Object.entries(groupedColors)
  .map(([scheme, colors]) => schemeColors(scheme, colors))
  .join('\n')}
);
`
}

export function schemedColorsTS(colors: Color[]): string {
  const groupedColors = groupBy(colors, (c) => c.scheme)
  const color = (color: Color) => `   ${camelCase(color.name)} = 0x${color.hexCode},`
  const schemeColors = (scheme: string, colors: Color[]) => 
`export enum ${capitalCase(scheme)}SchemeColor {
${colors.map(c => color(c)).join('\n')}
}`

  return `${Object.entries(groupedColors)
    .map(([scheme, colors]) => schemeColors(scheme, colors))
    .join('\n\n')}`
}

// const typographyVars = (headingFont: string, bodyFont: string) =>
// `$heading-font: '${headingFont}', sans-serif;
// $body-font: '${bodyFont}', sans-serif;
// `

const fontFace = (face: FontFace, path: string) => 
`@font-face {
  font-family: '${face.family}';
  src: url('${path}/${face.fileName}') format('truetype');
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
  
  return `${utils.fontFaces(textStyles).map(f => fontFace(f, fontsPath)).join('\n')}
${elementStyles.map(es => elementStyling(es, false)).join('\n')}
${weightStyles.map(ws => weightStyling(ws)).join('\n')}
${italicStyles.map(is => italicStyling(is, true)).join('\n')}
${classStyles.map(cs => elementStyling(cs, true)).join('\n')}
`
}
