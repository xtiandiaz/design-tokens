import fs from 'fs'
import ora from 'ora'

import { exportDesignTokens } from './figma.js'

const distPath = './dist'

async function main() {
    const spinner = ora().start()
    
    spinner.text = "Exporting Design Tokens..."
    
    const tokens = await exportDesignTokens()
    fs.writeFileSync(`${distPath}/Tokens.json`, JSON.stringify(tokens, null, 2))
    
    spinner.stop()
    
    console.log('Done.')
}

main()
