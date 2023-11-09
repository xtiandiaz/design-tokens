export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

export enum Scheme {
    Light = 'light',
    Dark = 'dark'
}

export interface Color {
    name: string
    scheme: Scheme
    hexCode: string
    r: number
    g: number
    b: number
    a: number
}

export interface Font {
    fileName: string
    data: Buffer
}

export interface FontFace {
    family: string
    fileName: string
}

export interface TextStyle {
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

export interface DesignTokens {
    // themed: ThemedTokens[]
    colors: Color[]
    typography: TextStyle[]
}

export interface Resources {
    fonts: Font[]
}
