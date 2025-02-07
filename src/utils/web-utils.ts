import { FontFace, TextStyleToken } from '../types'
import { capitalCase } from 'change-case'

export function colorComponentToHexString(component: number): string {
  const hex = Math.round(component * 255).toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export function hexColorCode(r: number, g: number, b: number): string {
  return `${colorComponentToHexString(r)}${colorComponentToHexString(g)}${colorComponentToHexString(b)}`.toUpperCase()
}

function semanticWeight(weight: number): string {
  switch(weight) {
    case 400:
      return 'Regular'
    case 500:
    case 510:
      return 'Medium'
    case 590:
    case 600:
      return 'SemiBold'
    case 674:
    case 700:
      return 'Bold'
    default:
      return '???'
  }
}

export function fontFaces(textStyles: TextStyleToken[]): FontFace[] {
  return textStyles.filter(
    (ts, i, arr) => arr.findIndex(t => t.fontFamily === ts.fontFamily) === i
  ).map(ts => {
    return {
      family: ts.fontFamily,
      fileName: `${ts.fontPostScriptName}.woff2`
    }
  })
}

export function fontFamily(figmaFamilyName: string, weight: number, isItalic: boolean): string {
  const ffn = capitalCase(figmaFamilyName)
  const sw = semanticWeight(weight)
  return `${ffn}${sw === 'Regular' && isItalic ? '' : ` ${sw}`}${isItalic ? ' Italic' : ''}`
}

export function fontPostScriptName(figmaFamilyName: string, weight: number, isItalic: boolean): string {
  const ffn = capitalCase(figmaFamilyName).replace(/ /g, '')
  const sw = semanticWeight(weight)
  return `${ffn}-${sw === 'Regular' && isItalic ? '' : sw}${isItalic ? 'Italic' : ''}`
}

export function toEm(fontSizePtPx: number): string {
  return `${(fontSizePtPx / 16).toString()}em`
}

export function textTransform(textCase?: string): string {
  switch(textCase) {
    case 'LOWER':
      return 'lowercase'
    case 'UPPER':
      return 'uppercase'
    case 'TITLE':
      return 'capitalize'
    default:
      return 'none'
  }
}

export const classCase = (input: string, shouldPrefix: boolean = true) => {
  const convertedText = input.toLowerCase().replace(/ /g, _ => '.')
  return shouldPrefix ? `.${convertedText}` : convertedText
}
