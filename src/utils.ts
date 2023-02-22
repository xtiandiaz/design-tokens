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
    camelCase(str).replace(/_/g, s => '')
    
export const semanticWeight = (weight: number) => {
    switch(weight) {
        case 510:
            return 'medium'
        case 590:
        case 600:
            return 'semibold'
        case 674:
        case 700:
            return 'bold'
        default:
            return 'regular'
    }
}

export const fontDesign = (name: string) => {
    if (name.includes('Rounded')) {
        return 'rounded'
    } else if (name.includes('Serif')) {
        return 'serif'
    } else {
        return '`default`'
    }
}
