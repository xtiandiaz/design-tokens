import FS from 'fs'
import ORA from 'ora'
import { DesignTokens } from './types'
import AssetGenerator from './asset-generators/asset-generator'
import WebGenerator from './asset-generators/web-generator'
import { exportDesignTokens } from './figma'

const distPath = './dist'
const resourcePath = './resources'

interface IPlatform {
  key: string
  generator: AssetGenerator
}

const platforms: [IPlatform] = [{
  key: "web",
  generator: new WebGenerator()
}]

async function main() {
  const spinner = ORA().start()
  
  spinner.text = "Exporting Design Tokens..."
  
  const tokensPath = `${distPath}/tokens.json`
  const tokens = await exportDesignTokens()
  FS.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2))
  // const tokens = JSON.parse(fs.readFileSync(tokensPath).toString()) as DesignTokens
  
  for await (const platform of platforms) {
    const platformPath = `${distPath}/${platform.key}`
    
    if (FS.existsSync(platformPath)) {
      FS.rmSync(platformPath, { recursive: true })
    }
    FS.mkdirSync(platformPath, { recursive: true })
    
    await platform.generator.generateAssets(tokens, resourcePath, platformPath)
  }
  
  spinner.stop()
  
  console.log('Done!')
}

main()
