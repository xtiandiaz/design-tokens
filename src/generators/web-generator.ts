import FS from 'fs'
import AssetGenerator from './asset-generator'
import { ColorToken, RawSvg, IconToken, TextStyleToken } from '../types.js'
import * as TEMPLATE from '../templates/web-templates'

export default class WebGenerator extends AssetGenerator {
  
  protected async generatePalette(tokens: ColorToken[]): Promise<void> {
    await FS.promises.writeFile(`${this.distPath}/_palette.scss`, TEMPLATE.paletteSCSS(tokens))
    await FS.promises.writeFile(`${this.distPath}/palette.ts`, TEMPLATE.paletteTS(tokens))
  }
  
  protected override async generateTypography(tokens: TextStyleToken[], sourcePath: string): Promise<void> {
    super.generateTypography(tokens, sourcePath)
  
    await FS.promises.writeFile(`${this.distPath}/_typography.scss`, TEMPLATE.typographySCSS(tokens, './fonts'))
  }
  
  protected override async generateIconography(tokens: IconToken[]): Promise<void> {
    await FS.promises.mkdir(`${this.distPath}/icons`, { recursive: true })
    
    const rawSvgs: RawSvg[] = []
    
    for await (const token of tokens) {
      const svgResponse = await fetch(token.url)
      const svgString = (await svgResponse.text())
        .replace(/(width|height)=\"\d+\"\ ?/g, '')
        .replace(/fill=\"\S+\"/g, 'fill="currentColor"')
      
      await FS.promises.writeFile(`${this.distPath}/icons/${token.key}.svg`, svgString)
      
      rawSvgs.push({ key: token.key, value: svgString })
    }
    
    await FS.promises.writeFile(`${this.distPath}/iconography.ts`, TEMPLATE.iconographyTS(rawSvgs))
  }
  
  protected override async generateUtilities(): Promise<void> {
    await FS.promises.writeFile(`${this.distPath}/_utils.scss`, TEMPLATE.utilitiesSCSS)
  }
}
