import fs from 'fs'
import ora from 'ora'
import { DesignTokens } from './types'
import { CodeGenerator, WebGenerator } from './assets-generators/index'
import { exportDesignTokens } from './figma'

const distPath = './dist'
const resourcesPath = './resources'

interface Platform {
    key: string
    generator: CodeGenerator
}

const platforms: [Platform] = [
    {
        key: "web",
        generator: new WebGenerator()
    }
]

async function main() {
    const spinner = ora().start()
    
    spinner.text = "Exporting Design Tokens..."
    
    // const tokens = await exportDesignTokens()
    // fs.writeFileSync(`${distPath}/tokens.json`, JSON.stringify(tokens, null, 4))
    const tokens = JSON.parse(fs.readFileSync(`${distPath}/tokens.json`).toString()) as DesignTokens
    
    for await (const p of platforms) {
        const pPath = `${distPath}/${p.key}`
        
        if (fs.existsSync(pPath)) {
            fs.rmSync(pPath, { recursive: true })
        }
        fs.mkdirSync(pPath, { recursive: true })
        
        p.generator.generateCode(tokens, pPath)
        const resources = p.generator.prepareResources(tokens, resourcesPath)
        p.generator.generateResources(resources, `${pPath}/resources`)
    }
    
    spinner.stop()
    
    console.log('Done!')
}

main()
