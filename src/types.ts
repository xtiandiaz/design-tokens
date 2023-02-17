export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

export interface Color {
    name: string
    r: number
    g: number
    b: number
    a: number
}

export interface AdaptiveColor {
    lightMode: Color
    darkMode: Color
}

export interface TextStyle {
    name: string
    fontFamily: string
    fontWeight: number
    fontSize: number
}

export interface ThemedTokens {
    theme: Theme
    colors: Color[]
}

export interface DesignTokens {
    themed: ThemedTokens[]
    textStyles: TextStyle[]
}
