import { camelCase } from 'change-case'
import { Color } from './types.js'

export function colorComponentToHexString(component: number): string {
    const hex = Math.round(component * 255).toString(16)
    return hex.length == 1 ? '0' + hex : hex
}

export function hexColorCode(r: number, g: number, b: number): string {
    return `${colorComponentToHexString(r)}${colorComponentToHexString(g)}${colorComponentToHexString(b)}`.toUpperCase()
}

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
        return 'default'
    }
}
