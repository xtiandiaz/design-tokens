import FS from 'fs'
import AssetGenerator from './asset-generator'
import { ColorToken, EncodedSvgTemplate, IconToken, TextStyleToken } from '../types.js'
import * as TEMPLATE from '../templates/web-templates'

export default class WebGenerator extends AssetGenerator {
  
  protected async generatePalette(tokens: ColorToken[], path: string): Promise<void> {
    await FS.promises.writeFile(`${path}/_palette.scss`, TEMPLATE.paletteSCSS(tokens))
    await FS.promises.writeFile(`${path}/palette.ts`, TEMPLATE.paletteTS(tokens))
  }
  
  protected override async generateTypography(tokens: TextStyleToken[], sourcePath: string, distPath: string): Promise<void> {
    super.generateTypography(tokens, sourcePath, distPath)
  
    await FS.promises.writeFile(`${distPath}/_typography.scss`, TEMPLATE.typographySCSS(tokens, './fonts'))
  }
  
  protected override async generateIconography(tokens: IconToken[], distPath: string): Promise<void> {
    await FS.promises.mkdir(`${distPath}/icons`, { recursive: true })
    
    const encodedSvgTemplates: EncodedSvgTemplate[] = []
    
    for await (const token of tokens) {
      const svgResponse = await fetch(token.url)
      const svgString = (await svgResponse.text())
        .replace(/(width|height)=\"\d+\"\ ?/g, '')
        .replace(/fill=\"\S+\"/g, 'fill="currentColor"')
      
      await FS.promises.writeFile(`${distPath}/icons/${token.key}.svg`, svgString)
      
      encodedSvgTemplates.push({
        key: token.key,
        template: encodeURI(svgString)
      })
    }
    
    await FS.promises.writeFile(
      `${distPath}/_iconography.scss`,
      TEMPLATE.iconographySCSS(encodedSvgTemplates)
    )
    
    await FS.promises.writeFile(`${distPath}/iconography.ts`, TEMPLATE.iconographyTS(tokens))
  }
}
