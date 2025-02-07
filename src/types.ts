export enum Scheme {
  Light = 'light',
  Dark = 'dark'
}

export interface FontFace {
  family: string
  fileName: string
}

export interface ColorToken {
  name: string
  scheme: Scheme
  hexCode: string
  r: number
  g: number
  b: number
  a: number
}

export interface TextStyleToken {
  key: string
  fontFamily: string
  fontPostScriptName: string
  fontWeight: number
  fontSize: number
  letterSpacing: number
  lineHeight: number
  textCase?: string
  isItalic: boolean
}

export interface IconToken {
  key: string
  url: string
}

export interface DesignTokens {
  palette: ColorToken[]
  typography: TextStyleToken[]
  iconography: IconToken[]
}

export interface EncodedSvgTemplate {
  key: string
  template: string
}
