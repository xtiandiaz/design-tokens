export interface Color {
    name: string
    r: number
    g: number
    b: number
    a: number
}

export interface TextStyle {
    name: string
    fontFamily: string
    fontWeight: number
    fontSize: number
}

export enum ThemeKey {
    Light = 'light',
    Dark = 'dark'
}

export interface Theme {
    key: ThemeKey
    colors: Color[]
}

export interface ThemedDesignTokens {
    colors: Color[]
}

export interface DesignTokens {
    light: ThemedDesignTokens
    dark: ThemedDesignTokens
    textStyles: TextStyle[]
}
