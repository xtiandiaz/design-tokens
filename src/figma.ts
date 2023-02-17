import * as Figma from 'figma-js'
import dotenv from 'dotenv'

import { Color, Theme, ThemedTokens, DesignTokens } from './types.js'
import sortBy from 'lodash'

dotenv.config()

const figma = Figma.Client({
    personalAccessToken: process.env.FIGMA_ACCESS_TOKEN
})

const themeSources: Record<Theme, string> = {
    light: '2ngEslhcEbOrKpywQNH1PU',
    dark: 'U6Z4zJzenb99Y0GWXOUcJS'
}

function getColors(page: Figma.Canvas): Color[] {
    const colorNodes: Figma.Rectangle[] = page.children.filter((node) => 
        node.type == 'RECTANGLE' && node.fills[0].color !== undefined
    ) as Figma.Rectangle[]
    
    return colorNodes.map((node) => {
        const name = node.name
        const color = node.fills[0].color!
        
        return {
            name: name,
            r: color.r,
            g: color.g,
            b: color.b,
            a: color.a
        }
    })
    .filter((color) => color != null) as Color[]
}

export async function exportDesignTokens(): Promise<DesignTokens> {
    let themedTokensMap = new Map<Theme, ThemedTokens>()
    
    for(const theme of Object.values(Theme)) {
        const file = await figma.file(themeSources[theme])
        const pages = file.data.document.children as Figma.Canvas[]
        
        function getPage(name: string): Figma.Canvas | undefined {
            return pages.find((page) => page.name === name)
        }
        
        const colors = getColors(getPage('Colors')!)
        
        themedTokensMap.set(theme, {
            theme,
            colors: colors
        })
    }
    
    return {
        themed: Array.from(themedTokensMap.values()),
        textStyles: []
    }
}
