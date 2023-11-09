import fs from 'fs'
import AssetsGenerator from './assets-generator'
import { DesignTokens, Font } from '../types.js'
import * as TEMPLATE from '../templates/web-templates'

export default class WebGenerator extends AssetsGenerator {
    generateCode(tokens: DesignTokens, path: string): void {
        fs.writeFileSync(`${path}/_scheming.scss`, TEMPLATE.schemingSCSS)
        fs.writeFileSync(`${path}/_colors.scss`, TEMPLATE.schemedColorsSCSS(tokens.colors))
        fs.writeFileSync(`${path}/colors.ts`, TEMPLATE.schemedColorsTS(tokens.colors))

        fs.writeFileSync(
            `${path}/_typography.scss`, 
            TEMPLATE.typographySCSS(tokens.typography, './resources/fonts')
        )
    }
    
    generateFonts(fonts: Font[], path: string): void {
        super.generateFonts(fonts, path)
        
        //...
    }
}
