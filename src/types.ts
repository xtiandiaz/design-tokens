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

export interface TextStyle {
    name: string
    fontFamily: string
    fontPostScriptName: string
    fontWeight: number
    fontSize: number
    letterSpacing: number
}

export interface DesignTokens {
    // themed: ThemedTokens[]
    colors: Color[]
    textStyles: TextStyle[]
}

export interface CodeGenerator {    
    generateCode(path: string, tokens: DesignTokens): void
}
