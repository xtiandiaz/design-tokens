import fs from 'fs'
import AssetsGenerator from './assets-generator'
import { DesignTokens } from '../types.js'
import * as TEMPLATE from '../templates/web-templates'

export default class WebGenerator extends AssetsGenerator {
  generateCode(tokens: DesignTokens, path: string): void {
    fs.writeFileSync(`${path}/_scheming.scss`, TEMPLATE.schemingSCSS)
    fs.writeFileSync(`${path}/_color.scss`, TEMPLATE.schemedColorsSCSS(tokens.colors))
    fs.writeFileSync(`${path}/color.ts`, TEMPLATE.schemedColorsTS(tokens.colors))

    fs.writeFileSync(
      `${path}/_typography.scss`, 
      TEMPLATE.typographySCSS(tokens.typography, './resources/fonts')
    )
  }
}
