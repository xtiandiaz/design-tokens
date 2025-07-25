import FS from 'fs'
import { ColorToken, TextStyleToken, IconToken, DesignTokens } from '../types'
import { exit } from 'process'

export default abstract class AssetGenerator {
  readonly distPath: string
  
  constructor(distPath: string) {
    this.distPath = distPath
  }
  
  public async generateAssets(tokens: DesignTokens, sourcePath: string): Promise<void> {
    await this.generatePalette(tokens.palette)
    await this.generateTypography(tokens.typography, sourcePath)
    await this.generateIconography(tokens.iconography)
  }
  
  protected abstract generatePalette(tokens: ColorToken[]): Promise<void>
  protected abstract generateIconography(tokens: IconToken[]): Promise<void>
  
  protected async generateTypography(tokens: TextStyleToken[], sourcePath: string): Promise<void> {
    await this._generateFonts(tokens, sourcePath)
  }
  
  private async _generateFonts(tokens: TextStyleToken[], sourcePath: string): Promise<void> {
    const fontNames = [...new Set(tokens.map(t => t.fontPostScriptName))]
    const fontResourcePath = `${sourcePath}/fonts`
    const fontFiles = FS.readdirSync(fontResourcePath)
    
    const writePath = `${this.distPath}/fonts`
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
