import { camelCase } from 'change-case'

export const propCase = (str: string) =>
    camelCase(str).replace(/_/g, s => '')
    

export const fontDesign = (name: string) => {
    if (name.includes('Rounded')) {
        return 'rounded'
    } else if (name.includes('Serif')) {
        return 'serif'
    } else {
        return 'default'
    }
}
