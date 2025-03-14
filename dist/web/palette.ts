/* File automatically generated; DO NOT edit! */

export enum ColorScheme {
  Dark,
  Light,
}

export enum ColorKey {
  Yinyang = 'yinyang',
  Indigo = 'indigo',
  Blue = 'blue',
  Mint = 'mint',
  Green = 'green',
  Yellow = 'yellow',
  Orange = 'orange',
  Brown = 'brown',
  Red = 'red',
  Pink = 'pink',
  Purple = 'purple',
  Accessory = 'accessory',
  TertiaryBody = 'tertiary-body',
  SecondaryBody = 'secondary-body',
  Body = 'body',
  TertiaryBackground = 'tertiary-background',
  SecondaryBackground = 'secondary-background',
  Background = 'background',
}

export const schemeColor = (scheme: ColorScheme, colorKey: ColorKey): number => {
  switch(scheme) {
    case ColorScheme.Dark:
      switch(colorKey) {
        case ColorKey.Yinyang: return 0xE0E4EB
        case ColorKey.Indigo: return 0x667FFF
        case ColorKey.Blue: return 0x42C4F0
        case ColorKey.Mint: return 0x11D4B4
        case ColorKey.Green: return 0x66CC52
        case ColorKey.Yellow: return 0xEEBD2B
        case ColorKey.Orange: return 0xFF8833
        case ColorKey.Brown: return 0xD99A6C
        case ColorKey.Red: return 0xFF4D5B
        case ColorKey.Pink: return 0xF261C2
        case ColorKey.Purple: return 0xAD73FF
        case ColorKey.Accessory: return 0x676F7E
        case ColorKey.TertiaryBody: return 0x818898
        case ColorKey.SecondaryBody: return 0xB9BDC6
        case ColorKey.Body: return 0xFFFFFF
        case ColorKey.TertiaryBackground: return 0x000000
        case ColorKey.SecondaryBackground: return 0x0E0F11
        case ColorKey.Background: return 0x1C1E22 
      }
      break
      case ColorScheme.Light:
      switch(colorKey) {
        case ColorKey.Yinyang: return 0x29303D
        case ColorKey.Indigo: return 0x3D5CF5
        case ColorKey.Blue: return 0x0B96DA
        case ColorKey.Mint: return 0x00B295
        case ColorKey.Green: return 0x4AB236
        case ColorKey.Yellow: return 0xC7A705
        case ColorKey.Orange: return 0xF26C0C
        case ColorKey.Brown: return 0xA66C42
        case ColorKey.Red: return 0xE53948
        case ColorKey.Pink: return 0xE550B4
        case ColorKey.Purple: return 0x7E47EB
        case ColorKey.Accessory: return 0xA7AFBE
        case ColorKey.TertiaryBody: return 0x8A94A8
        case ColorKey.SecondaryBody: return 0x576175
        case ColorKey.Body: return 0x21242C
        case ColorKey.TertiaryBackground: return 0xDCDFE5
        case ColorKey.SecondaryBackground: return 0xEDEFF2
        case ColorKey.Background: return 0xFFFFFF 
      }
      break
    
  }
}
