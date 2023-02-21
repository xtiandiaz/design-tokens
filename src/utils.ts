import { camelCase } from 'change-case'
import { Color } from './types.js'

export const colorComponentToHex = (component: number) => {
    // Multiply by 255 since original value is in 0 to 1 range
    const hex = Math.round(component * 255).toString(16)
    return hex.length == 1 ? '0' + hex : hex
}

export const rgbToHex = (color: Color) =>
    `#${colorComponentToHex(color.r)}${colorComponentToHex(color.g)}${colorComponentToHex(color.b)}`

export const propCase = (str: string) =>
    camelCase(str).replace(/_/g, s => "")
