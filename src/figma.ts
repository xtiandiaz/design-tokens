import * as Figma from 'figma-js'
import dotenv from 'dotenv'
import { Color, Scheme, DesignTokens, TextStyle } from './types'
import * as utils from './utils/web-utils'

dotenv.config()

const figma = Figma.Client({
    personalAccessToken: process.env.FIGMA_ACCESS_TOKEN
})

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
        const hexCode = utils.hexColorCode(color.r, color.g, color.b)
        
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

function getTypography(page: Figma.Canvas): TextStyle[] {
    const textNodes: Figma.Text[] = page.children as Figma.Text[]
    
    return textNodes.map((n) => {
        const figmaFontFamily = n.style.fontFamily
        const fontWeight = n.style.fontWeight
        const isItalic = n.style.italic ?? false
        
        return {
            key: n.name.toLowerCase(),
            fontFamily: utils.fontFamily(figmaFontFamily, fontWeight, isItalic),
            fontPostScriptName: utils.fontPostScriptName(figmaFontFamily, fontWeight, isItalic),
            fontWeight,
            fontSize: n.style.fontSize,
            letterSpacing: n.style.letterSpacing,
            lineHeight: n.style.lineHeightPercent,
            textCase: n.style.textCase,
            isItalic: isItalic
        }
    })
}

export async function exportDesignTokens(): Promise<DesignTokens> {
    const file = await figma.file('WUrutabd5gfdgcTm0OOghB')
    const pages = file.data.document.children as Figma.Canvas[]
    
    const colors = getColors(getPage('Colors', pages)!)
    const textStyles = getTypography(getPage('Typography', pages)!)
    
    return {
        colors: colors,
        typography: textStyles
    }
}
