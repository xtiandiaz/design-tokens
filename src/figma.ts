import * as Figma from 'figma-js'
import dotenv from 'dotenv'
import { ColorToken, Scheme, DesignTokens, TextStyleToken, IconToken } from './types'
import * as utils from './utils/web-utils'
import { kebabCase } from 'change-case'

dotenv.config()

const fileId = 'bINVy3ZxKbDUh4Hs1PijwI'

const figma = Figma.Client({
  personalAccessToken: process.env.FIGMA_ACCESS_TOKEN
})

function getPage(name: string, pages: Figma.Canvas[]): Figma.Canvas | undefined {
  return pages.find((page) => page.name === name)
}

function getColors(page: Figma.Canvas): ColorToken[] {
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
  .filter((color) => color != null) as ColorToken[]
}

function getTypography(page: Figma.Canvas): TextStyleToken[] {
  const textNodes = (page.children[0] as Figma.Frame).children as Figma.Text[]
  
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

async function getIcons(page: Figma.Canvas): Promise<IconToken[]> {
  const iconIndex = Object.fromEntries(
    (page.children as Figma.Frame[]).map(frame => [frame.id, kebabCase(frame.name)])
  )
  const svgImages = (await figma.fileImages(
    fileId, 
    {
      ids: Object.keys(iconIndex),
      format: 'svg',
      use_absolute_bounds: true
    }
  )).data.images
  
  return Object.keys(svgImages)
    .map(id => { return { key: iconIndex[id], url: svgImages[id]} })
    .sort((a, b) => a.key.localeCompare(b.key))
}

export async function exportDesignTokens(): Promise<DesignTokens> {
  const file = await figma.file(fileId)
  const pages = file.data.document.children as Figma.Canvas[]
  
  const colors = getColors(getPage('Colors', pages)!)
  const textStyles = getTypography(getPage('Typography', pages)!)
  const icons = await getIcons(getPage('Icons', pages)!)
  
  return {
    palette: colors,
    typography: textStyles,
    iconography: icons
  }
}
