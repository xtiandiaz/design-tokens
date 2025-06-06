import FS from 'fs'
import ORA from 'ora'
import { DesignTokens } from './types'
import AssetGenerator from './generators/asset-generator'
import WebGenerator from './generators/web-generator'
import { exportDesignTokens } from './figma'

const distPath = './dist'
const resourcePath = './resources'

interface IPlatform {
  key: string
  generator: AssetGenerator
}

const platforms: [IPlatform] = [{
  key: "web",
  generator: new WebGenerator(`${distPath}/web`)
}]

async function main() {
  const spinner = ORA().start()
  
  spinner.text = "Exporting Design Tokens..."
  
  const tokensPath = `${distPath}/tokens.json`
  const tokens = await exportDesignTokens()
  await FS.promises.writeFile(tokensPath, JSON.stringify(tokens, null, 2))
  // const tokensString = (await FS.promises.readFile(tokensPath)).toString()
  // const tokens = JSON.parse(tokensString) as DesignTokens
  
  for await (const platform of platforms) {
    const platformDistPath = platform.generator.distPath
    if (FS.existsSync(platformDistPath)) {
      FS.rmSync(platformDistPath, { recursive: true })
    }
    FS.mkdirSync(platformDistPath, { recursive: true })
    
    await platform.generator.generateAssets(tokens, resourcePath)
  }
  
  spinner.stop()
  
  console.log('Done!')
}

main()
