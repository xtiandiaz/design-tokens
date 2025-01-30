import fs from 'fs'
import ora from 'ora'
import { DesignTokens } from './types'
import AssetsGenerator from '@generators/assets-generator'
import WebGenerator from '@generators/web-generator'
import { exportDesignTokens } from './figma'

const distPath = './dist'
const resourcesPath = './resources'

interface Platform {
  key: string
  generator: AssetsGenerator
}

const platforms: [Platform] = [{
  key: "web",
  generator: new WebGenerator()
}]

async function main() {
  const spinner = ora().start()
  
  spinner.text = "Exporting Design Tokens..."
  
  const tokensPath = `${distPath}/tokens.json`
  const tokens = await exportDesignTokens()
  fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2))
  // const tokens = JSON.parse(fs.readFileSync(tokensPath).toString()) as DesignTokens
  
  for await (const p of platforms) {
    const pPath = `${distPath}/${p.key}`
    
    if (fs.existsSync(pPath)) {
      fs.rmSync(pPath, { recursive: true })
    }
    fs.mkdirSync(pPath, { recursive: true })
    
    p.generator.generateCode(tokens, pPath)
    const resources = p.generator.prepareAssets(tokens, resourcesPath)
    p.generator.generateAssets(resources, `${pPath}/assets`)
  }
  
  spinner.stop()
  
  console.log('Done!')
}

main()
