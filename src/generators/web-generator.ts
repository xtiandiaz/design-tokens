import FS from 'fs'
import AssetGenerator from './asset-generator'
import { ColorToken, EncodedSvgTemplate, IconToken, TextStyleToken } from '../types.js'
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
  
  protected override async generateIconography(tokens: IconToken[], distPath: string): Promise<void> {
    const writePath = `${distPath}/resources`
    await FS.promises.mkdir(`${writePath}/icons`, { recursive: true })
    
    const encodedSvgTemplates: EncodedSvgTemplate[] = []
    
    for await (const token of tokens) {
      const svgResponse = await fetch(token.url)
      const svgString = (await svgResponse.text())
        .replace(/(width|height)=\"\d+\"\ ?/g, '')
        .replace(/fill=\"\S+\"/g, 'fill="currentColor"')
      
      await FS.promises.writeFile(`${writePath}/icons/${token.key}.svg`, svgString)
      
      encodedSvgTemplates.push({
        key: token.key,
        template: encodeURI(svgString)
      })
    }
    
    await FS.promises.writeFile(
      `${distPath}/_iconography.scss`,
      TEMPLATE.iconographySCSS(encodedSvgTemplates)
    )
  }
}
