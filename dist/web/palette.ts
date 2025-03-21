/* File automatically generated; DO NOT edit! */

export enum ColorScheme {
  Dark,
  Light,
}

export enum Color {
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

export const schemeColor = (scheme: ColorScheme, color: Color): number => {
  switch(scheme) {
    case ColorScheme.Dark:
      switch(color) {
        case Color.Yinyang: return 0xE0E4EB
        case Color.Indigo: return 0x667FFF
        case Color.Blue: return 0x2BBDEE
        case Color.Mint: return 0x0AC2A3
        case Color.Green: return 0x66CC52
        case Color.Yellow: return 0xEEBD2B
        case Color.Orange: return 0xFF8833
        case Color.Brown: return 0xD99A6C
        case Color.Red: return 0xFF4D5B
        case Color.Pink: return 0xF261C2
        case Color.Purple: return 0xAD73FF
        case Color.Accessory: return 0x9E9B94
        case Color.TertiaryBody: return 0xB6B4AF
        case Color.SecondaryBody: return 0xDBD9D7
        case Color.Body: return 0xFFFFFF
        case Color.TertiaryBackground: return 0x151513
        case Color.SecondaryBackground: return 0x252422
        case Color.Background: return 0x363430 
      }
      break
      case ColorScheme.Light:
      switch(color) {
        case Color.Yinyang: return 0x29303D
        case Color.Indigo: return 0x425FF0
        case Color.Blue: return 0x0B96DA
        case Color.Mint: return 0x09AA8F
        case Color.Green: return 0x4AB236
        case Color.Yellow: return 0xC7A705
        case Color.Orange: return 0xEB6D13
        case Color.Brown: return 0xA66C42
        case Color.Red: return 0xDD3C49
        case Color.Pink: return 0xE052B1
        case Color.Purple: return 0x7F4DE5
        case Color.Accessory: return 0xA39C8F
        case Color.TertiaryBody: return 0x8C8473
        case Color.SecondaryBody: return 0x625C50
        case Color.Body: return 0x38352E
        case Color.TertiaryBackground: return 0xE3E1DD
        case Color.SecondaryBackground: return 0xF1F0EE
        case Color.Background: return 0xFFFFFF 
      }
      break
    
  }
}
