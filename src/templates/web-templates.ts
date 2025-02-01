import * as UTILS from '../utils/web-utils'
import { Color, TextStyle, FontFace } from '../types'
import groupBy from 'lodash/groupBy'
import { kebabCase, pascalCase, capitalCase } from 'change-case'

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

const fontFace = (face: FontFace, path: string) => 
`@font-face {
  font-family: '${face.family}';
  src: local('${face.family}'), url('${path}/${face.fileName}') format('woff2');
}
`

const textStyleRule = (selector: string, textStyle: TextStyle) => 
`${selector} {
  font-family: '${textStyle.fontFamily}', sans-serif;
  font-size: ${UTILS.toEm(textStyle.fontSize)};
  font-weight: ${textStyle.fontWeight};
  letter-spacing: ${UTILS.toEm(textStyle.letterSpacing)};
  line-height: ${Math.ceil(textStyle.lineHeight)}%;
  text-transform: ${UTILS.textTransform(textStyle.textCase)};
}
`

export function typographySCSS(textStyles: TextStyle[], fontsPath: string): string {
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
    { key: 'h1', variants: ['serif'], selectorType: TextStyleSelectorType.Element },
    { key: 'h2', variants: ['serif'], selectorType: TextStyleSelectorType.Element },
    { key: 'h3', variants: ['serif'], selectorType: TextStyleSelectorType.Element },
    { key: 'h4', variants: ['serif'], selectorType: TextStyleSelectorType.Element },
    { key: 'h5', variants: ['serif'], selectorType: TextStyleSelectorType.Element },
    { key: 'h6', variants: ['serif'], selectorType: TextStyleSelectorType.Element },
    { key: 'body', variants: [], selectorType: TextStyleSelectorType.Element },
    { key: 'strong', variants: ['serif'], selectorType: TextStyleSelectorType.Element },
    { key: 'italic', variants: ['serif'], selectorType: TextStyleSelectorType.Class },
    { key: 'serif', variants: [], selectorType: TextStyleSelectorType.Class },
    { key: 'footnote', variants: [], selectorType: TextStyleSelectorType.Class },
    { key: 'caption', variants: ['all-caps'], selectorType: TextStyleSelectorType.Class },
  ]
  
  type TextStyleRule = {
    selector: string
    textStyle: TextStyle
  }
  
  const rules: TextStyleRule[] = []
  
  for (const target of targetRules) {
    for (const variant of ['', ...target.variants]) {
      const styleKey = variant.length > 0 ? `${target.key} ${variant}` : target.key
      const textStyle = textStyles.find(ts => ts.key === styleKey)
      if (textStyle === undefined) 
        continue
      
      const selector = UTILS.classCase(styleKey, target.selectorType === TextStyleSelectorType.Class)
      rules.push({ selector: selector, textStyle: textStyle})
    }
  }
  
  return `${warningComment}

${UTILS.fontFaces(textStyles).map(f => fontFace(f, fontsPath)).join('\n')}
${rules.map(r => `${textStyleRule(r.selector, r.textStyle)}`).join('\n')}
`
}
