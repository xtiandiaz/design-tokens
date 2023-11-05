// import { writeFileSync } from 'fs'
// import { colorsTemplate, textStylesTemplate } from '../templates/ios-templates'
// import { Theme, Color, AdaptiveColor, DesignTokens } from '../types'
// import CodeGenerator from './code-generator'

// export default class IOSGenerator implements CodeGenerator {
    
//     generateCode(path: string, tokens: DesignTokens): void {
//         const themedColors = Object.fromEntries(tokens.themed.map(t => {
//             const colorDict = Object.fromEntries(t.colors.map(c => [c.name, c]))
//             return [t.theme, colorDict]
//         }))
        
//         const simpleColors: Color[] = []
        
//         const adaptiveColors: AdaptiveColor[] = Object.values(themedColors[Theme.Light]).map(tc => {
//             return {
//                 lightMode: tc,
//                 darkMode: themedColors[Theme.Dark][tc.name]
//             }
//         })
        
//         writeFileSync(`${path}/Colors.swift`, colorsTemplate(simpleColors, adaptiveColors))
//         writeFileSync(`${path}/TextStyles.swift`, textStylesTemplate(tokens.textStyles))
//     }
// }
