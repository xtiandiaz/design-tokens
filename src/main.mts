import fs from 'fs'
import ora from 'ora'
import generateCode from './code-generator.js'

import { exportDesignTokens } from './figma.js'

const distPath = './dist'
const codePath = `${distPath}/ios`

async function main() {
    const spinner = ora().start()
    
    spinner.text = "Exporting Design Tokens..."
    
    const tokens = await exportDesignTokens()
    
    fs.writeFileSync(`${distPath}/Tokens.json`, JSON.stringify(tokens, null, 2))
    
    fs.rmdirSync(codePath, { recursive: true })
    fs.mkdirSync(codePath, { recursive: true })
    generateCode(codePath, tokens)
    
    spinner.stop()
    
    console.log('Done.')
}

main()
