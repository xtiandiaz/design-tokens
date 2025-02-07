import FS from 'fs'
import AssetGenerator from './asset-generator'
import { ColorToken, TextStyleToken, IconToken } from '../types.js'
import * as TEMPLATE from '../templates/web-templates'

export default class WebGenerator extends AssetGenerator {
  
  protected generatePalette(tokens: ColorToken[], path: string): void {
    FS.writeFileSync(`${path}/_palette.scss`, TEMPLATE.paletteSCSS(tokens))
    FS.writeFileSync(`${path}/palette.ts`, TEMPLATE.paletteTS(tokens))
  }
  
  protected override generateTypography(tokens: TextStyleToken[], sourcePath: string, distPath: string): void {
    super.generateTypography(tokens, sourcePath, distPath)
  
    FS.writeFileSync(
      `${distPath}/_typography.scss`, 
      TEMPLATE.typographySCSS(tokens, './resources/fonts')
    )
  }
}
