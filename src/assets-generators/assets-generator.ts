import fs from 'fs'
import { DesignTokens, Assets, Font, TextStyle } from '../types'
import { exit } from 'process'

export default abstract class AssetsGenerator {
  abstract generateCode(tokens: DesignTokens, path: string): void
  
  generateAssets(tokens: DesignTokens, resourcesPath: string, destinationPath: string): void {
    const fonts = this.prepareFonts(tokens.typography, resourcesPath)
    const assets: Assets = {
      fonts
    }
    this.generateFonts(assets.fonts, `${destinationPath}/fonts`)
  }
  
  private prepareFonts(textStyles: TextStyle[], path: string): Font[] {
    const fontNames = [...new Set(textStyles.map(ts => ts.fontPostScriptName))]
    const fontFiles = fs.readdirSync(`${path}/fonts`)
    
    return fontNames.map((fontName) => {
      const fileName = fontFiles.find(fileName => fileName.startsWith(`${fontName}.`))
      if (!fileName) {
        console.error("Font file not found", fontName)
        exit(-1)
      }
      return {
        fileName,
        data: fs.readFileSync(`${path}/fonts/${fileName}`)
      }
    })
  }
  
  private generateFonts(fonts: Font[], path: string): void {
    fs.mkdirSync(path, { recursive: true })
    
    fonts.forEach((font) => {
      fs.writeFileSync(`${path}/${font.fileName}`, font.data)
    })
  }
}
