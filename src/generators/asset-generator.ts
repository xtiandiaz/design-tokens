import FS from 'fs'
import { ColorToken, TextStyleToken, IconToken, DesignTokens } from '../types'
import { exit } from 'process'

export default abstract class AssetGenerator {
  
  public async generateAssets(tokens: DesignTokens, sourcePath: string, distPath: string): Promise<void> {
    await this.generatePalette(tokens.palette, distPath)
    await this.generateTypography(tokens.typography, sourcePath, distPath)
    await this.generateIconography(tokens.iconography, distPath)
  }
  
  protected abstract generatePalette(tokens: ColorToken[], path: string): Promise<void>
  protected abstract generateIconography(tokens: IconToken[], distPath: string): Promise<void>
  
  protected async generateTypography(tokens: TextStyleToken[], sourcePath: string, distPath: string): Promise<void> {
    await this._generateFonts(tokens, sourcePath, distPath)
  }
  
  private async _generateFonts(tokens: TextStyleToken[], sourcePath: string, distPath: string): Promise<void> {
    const fontNames = [...new Set(tokens.map(t => t.fontPostScriptName))]
    const fontResourcePath = `${sourcePath}/fonts`
    const fontFiles = FS.readdirSync(fontResourcePath)
    
    const writePath = `${distPath}/fonts`
    await FS.promises.mkdir(writePath, { recursive: true })
    
    for await (const name of fontNames) {
      const fileName = fontFiles.find(fileName => fileName.startsWith(`${name}.`))
      if (!fileName) {
        console.error("Font file not found", name)
        exit(-1)
      }
      const buffer = FS.readFileSync(`${fontResourcePath}/${fileName}`)
      const extension = fileName.split('.')[1]
      
      await FS.promises.writeFile(`${writePath}/${name}.${extension}`, buffer)
    }
  }
}
