/* File automatically generated; DO NOT edit! */

export enum ColorScheme {
  Dark,
  Light,
}

export enum ColorKey {
  Yinyang,
  Indigo,
  Blue,
  Mint,
  Green,
  Yellow,
  Orange,
  Brown,
  Red,
  Pink,
  Purple,
  Accessory,
  TertiaryBody,
  SecondaryBody,
  Body,
  TertiaryBackground,
  SecondaryBackground,
  Background,
}

export const schemeColor = (scheme: ColorScheme, colorKey: ColorKey): number => {
  switch(scheme) {
    case ColorScheme.Dark:
      switch(colorKey) {
        case ColorKey.Yinyang: return 0xE0E4EB
        case ColorKey.Indigo: return 0x667FFF
        case ColorKey.Blue: return 0x42C4F0
        case ColorKey.Mint: return 0x06E0BB
        case ColorKey.Green: return 0x66CC52
        case ColorKey.Yellow: return 0xE8BA30
        case ColorKey.Orange: return 0xFF8833
        case ColorKey.Brown: return 0xD99A6C
        case ColorKey.Red: return 0xFF4D5B
        case ColorKey.Pink: return 0xF261C2
        case ColorKey.Purple: return 0xAD73FF
        case ColorKey.Accessory: return 0x5C6B8A
        case ColorKey.TertiaryBody: return 0x7585A3
        case ColorKey.SecondaryBody: return 0xA3ADC2
        case ColorKey.Body: return 0xF0F1F5
        case ColorKey.TertiaryBackground: return 0x000000
        case ColorKey.SecondaryBackground: return 0x0A0C0F
        case ColorKey.Background: return 0x1F242E 
      }
      break
      case ColorScheme.Light:
      switch(colorKey) {
        case ColorKey.Yinyang: return 0x29303D
        case ColorKey.Indigo: return 0x3D5CF5
        case ColorKey.Blue: return 0x0B96DA
        case ColorKey.Mint: return 0x00B295
        case ColorKey.Green: return 0x4AB236
        case ColorKey.Yellow: return 0xCC9900
        case ColorKey.Orange: return 0xF26C0C
        case ColorKey.Brown: return 0xA66C42
        case ColorKey.Red: return 0xE53948
        case ColorKey.Pink: return 0xE550B4
        case ColorKey.Purple: return 0x7E47EB
        case ColorKey.Accessory: return 0xC2C9D6
        case ColorKey.TertiaryBody: return 0xA3ADC2
        case ColorKey.SecondaryBody: return 0x667799
        case ColorKey.Body: return 0x29303D
        case ColorKey.TertiaryBackground: return 0xE0E4EB
        case ColorKey.SecondaryBackground: return 0xF0F1F5
        case ColorKey.Background: return 0xFFFFFF 
      }
      break
    
  }
}
