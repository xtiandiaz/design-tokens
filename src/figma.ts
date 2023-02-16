import * as Figma from 'figma-js'
import dotenv from 'dotenv'

import { Color, ThemeKey, Theme, ThemedDesignTokens, DesignTokens } from './types.js'
import sortBy from 'lodash'

dotenv.config()

const figma = Figma.Client({
    personalAccessToken: process.env.FIGMA_ACCESS_TOKEN
})

interface Source {
    fileId: string
    themeKey?: ThemeKey
}

const sources: Source[] = [
    {
        fileId: '2ngEslhcEbOrKpywQNH1PU',
        themeKey: ThemeKey.Light
    },
    {
        fileId: 'U6Z4zJzenb99Y0GWXOUcJS',
        themeKey: ThemeKey.Dark
    }
]

function getColors(page: Figma.Canvas): Color[] {
    const colorNodes: Figma.Rectangle[] = page.children.filter((node) => 
        node.type == 'RECTANGLE'
    ) as Figma.Rectangle[]
    
    return colorNodes.map((node) => {
        const name = node.name
        const fill = node.fills[0]
        
        if (fill.color === undefined) {
            return null
        }
        
        const color = fill.color
        
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
    let themedTokensMap = new Map<ThemeKey, ThemedDesignTokens>()
    
    for(const source of sources) {
        const file = await figma.file(source.fileId)    
        const pages = file.data.document.children as Figma.Canvas[]
        
        function getPage(name: string): Figma.Canvas | undefined {
            return pages.find((page) => page.name === name)
        }
        
        const colors = getColors(getPage('Colors')!)
        
        if (source.themeKey === undefined) {
            continue
        }
        
        themedTokensMap.set(source.themeKey!, {
            colors: colors
        })
    }
    
    return {
        light: themedTokensMap.get(ThemeKey.Light)!,
        dark: themedTokensMap.get(ThemeKey.Dark)!,
        textStyles: []
    }
}
