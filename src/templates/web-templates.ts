import { Color } from '../types'
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
`    '${scheme}': (
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
