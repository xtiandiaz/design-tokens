import * as Figma from 'figma-js'
import dotenv from 'dotenv'

import { Color, Theme, ThemedTokens, DesignTokens, TextStyle } from './types.js'
// import { sortBy } from 'lodash'

dotenv.config()

const figma = Figma.Client({
    personalAccessToken: process.env.FIGMA_ACCESS_TOKEN
})

const commonSource = '2djm4eAbMYvfLqQnO8lq6E'
const themeSources: Record<Theme, string> = {
    light: '2ngEslhcEbOrKpywQNH1PU',
    dark: 'U6Z4zJzenb99Y0GWXOUcJS'
}

function getPage(name: string, pages: Figma.Canvas[]): Figma.Canvas | undefined {
    return pages.find((page) => page.name === name)
}

function getColors(page: Figma.Canvas): Color[] {
    const colorNodes: Figma.Rectangle[] = page.children.filter((node) => 
        node.type == 'RECTANGLE' && node.fills[0].color !== undefined
    ) as Figma.Rectangle[]
    
    // return sortBy(
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
    //     'name'
    // )
}

function getTextStyles(page: Figma.Canvas): TextStyle[] {
    const container = page.children[0] as Figma.Frame
    const textNodes: Figma.Text[] = container.children as Figma.Text[]
    
    // return sortBy(
    return textNodes.map((n) => {
            return {
                name: n.name,
                fontFamily: n.style.fontFamily,
                fontWeight: n.style.fontWeight,
                fontSize: n.style.fontSize
            }
        })
    //     'name'
    // )
}

export async function exportDesignTokens(): Promise<DesignTokens> {
    
    let themedTokensMap = new Map<Theme, ThemedTokens>()
    
    for (const theme of Object.values(Theme)) {
        const file = await figma.file(themeSources[theme])
        const pages = file.data.document.children as Figma.Canvas[]
        const colors = getColors(getPage('Colors', pages)!)
        
        themedTokensMap.set(theme, {
            theme,
            colors: colors
        })
    }
    
    const commons = (await figma.file(commonSource)).data.document.children as Figma.Canvas[]
    const textStyles = getTextStyles(getPage('Typography', commons)!)
    
    return {
        themed: Array.from(themedTokensMap.values()),
        textStyles: textStyles
    }
}
