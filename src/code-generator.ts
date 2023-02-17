import { writeFileSync } from 'fs';
import { colorsTemplate } from './templates.js';
import { DesignTokens } from './types.js';
import { Color, AdaptiveColor } from './types.js'
import * as Utils from './utils.js'

import { Theme } from './types.js'

export default function generateCode(path: string, tokens: DesignTokens) {
    const themedColors = Object.fromEntries(tokens.themed.map(t => {
        const colorDict = Object.fromEntries(t.colors.map(c => [c.name, c]))
        return [t.theme, colorDict]
    }))
    
    const simpleColors: Color[] = []
    
    const adaptiveColors: AdaptiveColor[] = Object.values(themedColors[Theme.Light]).map(tc => {
        return {
            lightMode: tc,
            darkMode: themedColors[Theme.Dark][tc.name]
        }
    })
    
    writeFileSync(`${path}/Colors.swift`, colorsTemplate(simpleColors, adaptiveColors))
}
