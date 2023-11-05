import * as Figma from 'figma-js'
import dotenv from 'dotenv'
import { Color, Scheme, DesignTokens, TextStyle } from './types.js'
import { hexColorCode } from './utils.js'

dotenv.config()

const figma = Figma.Client({
    personalAccessToken: process.env.FIGMA_ACCESS_TOKEN
})

const commonSource = 'WUrutabd5gfdgcTm0OOghB'

function getPage(name: string, pages: Figma.Canvas[]): Figma.Canvas | undefined {
    return pages.find((page) => page.name === name)
}

function getColors(page: Figma.Canvas): Color[] {
    const colorNodes: Figma.Rectangle[] = page.children.filter((node) => 
        node.type == 'RECTANGLE' && node.fills[0].color !== undefined
    ) as Figma.Rectangle[]
    
    return colorNodes.map((node) => {
        const namingRegExp = new RegExp(/\[([Ll]ight|[Dd]ark)\] ?([\w ]+)/g)
        const nameParts = [...namingRegExp.exec(node.name)!]
        const scheme = <Scheme> nameParts[1].toLowerCase()
        const colorName = nameParts[2].toLowerCase()
        const color = node.fills[0].color!
        const hexCode = hexColorCode(color.r, color.g, color.b)
        
        return {
            scheme: scheme,
            name: colorName,
            hexCode: hexCode,
            r: color.r,
            g: color.g,
            b: color.b,
            a: color.a
        }
    })
    .filter((color) => color != null) as Color[]
}

function getTextStyles(page: Figma.Canvas): TextStyle[] {
    const container = page.children[0] as Figma.Frame
    const textNodes: Figma.Text[] = container.children as Figma.Text[]
    
    return textNodes.map((n) => {
        return {
            name: n.name,
            fontFamily: n.style.fontFamily,
            fontPostScriptName: n.style.fontPostScriptName,
            fontWeight: n.style.fontWeight,
            fontSize: n.style.fontSize,
            letterSpacing: n.style.letterSpacing
        }
    })
}

export async function exportDesignTokens(): Promise<DesignTokens> {
    // let themedTokensMap = new Map<Theme, ThemedTokens>()
    const file = await figma.file(commonSource)
    const pages = file.data.document.children as Figma.Canvas[]
    const colors = getColors(getPage('Colors', pages)!)
    
    // const commons = (await figma.file(commonSource)).data.document.children as Figma.Canvas[]
    // const textStyles = getTextStyles(getPage('Typography', commons)!)
    
    return {
        colors: colors,
        // themed: Array.from(themedTokensMap.values()),
        textStyles: []
    }
}
