import FS from 'fs'
import { ColorToken, TextStyleToken, IconToken, DesignTokens } from '../types'
import { exit } from 'process'

export default abstract class AssetGenerator {
  
  async generateAssets(tokens: DesignTokens, sourcePath: string, distPath: string): Promise<void> {
    this.generatePalette(tokens.palette, distPath)
    this.generateTypography(tokens.typography, sourcePath, distPath)
    await this.generateIconography(tokens.iconography, distPath)
  }
  
  protected abstract generatePalette(tokens: ColorToken[], path: string): void
  protected abstract generateIconography(tokens: IconToken[], distPath: string): Promise<void>
  
  protected generateTypography(tokens: TextStyleToken[], sourcePath: string, distPath: string): void {
    this._generateFonts(tokens, sourcePath, `${distPath}/resources`)
  }
  
  private _generateFonts(tokens: TextStyleToken[], sourcePath: string, distPath: string): void {
    const fontNames = [...new Set(tokens.map(t => t.fontPostScriptName))]
    const fontResourcePath = `${sourcePath}/fonts`
    const fontFiles = FS.readdirSync(fontResourcePath)
    
    const writePath = `${distPath}/fonts`
    FS.mkdirSync(writePath, { recursive: true })
    
    for (const name of fontNames) {
      const fileName = fontFiles.find(fileName => fileName.startsWith(`${name}.`))
      if (!fileName) {
        console.error("Font file not found", name)
        exit(-1)
      }
      const buffer = FS.readFileSync(`${fontResourcePath}/${fileName}`)
      FS.writeFileSync(`${writePath}/${name}`, buffer)
    }
  }
}
