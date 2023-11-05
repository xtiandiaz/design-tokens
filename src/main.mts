import fs from 'fs'
import ora from 'ora'
import { CodeGenerator, DesignTokens } from './types'
import { WebGenerator } from '@generators/index'
import { exportDesignTokens } from './figma'

const distPath = './dist'

interface Platform {
    key: string
    codeGenerator: CodeGenerator
}

const platforms: [Platform] = [
    {
        key: "web",
        codeGenerator: new WebGenerator()
    }
]

async function main() {
    const spinner = ora().start()
    
    spinner.text = "Exporting Design Tokens..."
    
    const tokens = await exportDesignTokens()
    fs.writeFileSync(`${distPath}/Tokens.json`, JSON.stringify(tokens, null, 4))
    // const tokens = JSON.parse(fs.readFileSync(`${distPath}/Tokens.json`).toString()) as DesignTokens
    
    platforms.forEach((p) => {
        const codePath = `${distPath}/${p.key}`
        if (fs.existsSync(codePath)) {
            fs.rmSync(codePath, { recursive: true })
        }
        fs.mkdirSync(codePath, { recursive: true })
        p.codeGenerator.generateCode(codePath, tokens)
    })
    
    spinner.stop()
    
    console.log('Done!')
}

main()
