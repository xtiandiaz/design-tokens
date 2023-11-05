import { writeFileSync } from 'fs'
import { DesignTokens, CodeGenerator } from '../types.js'
import * as TEMPLATE from '../templates/web-templates'

export default class WebGenerator implements CodeGenerator {
    generateCode(path: string, tokens: DesignTokens): void {
        writeFileSync(`${path}/_scheming.scss`, TEMPLATE.schemingSCSS)
        writeFileSync(`${path}/_colors.scss`, TEMPLATE.schemedColorsSCSS(tokens.colors))
        writeFileSync(`${path}/colors.ts`, TEMPLATE.schemedColorsTS(tokens.colors))
    }
}
