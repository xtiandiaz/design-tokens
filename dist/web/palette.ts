/* File automatically generated; DO NOT edit! */

export enum ColorScheme {
  Dark,
  Light,
}

export enum Color {
  Sepia = 'sepia',
  Gray = 'gray',
  Blue = 'blue',
  SkyBlue = 'sky-blue',
  Mint = 'mint',
  Green = 'green',
  Yellow = 'yellow',
  Orange = 'orange',
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
        case Color.Sepia: return 0xAF8C6A
        case Color.Gray: return 0xB2BBCC
        case Color.Blue: return 0x5781FF
        case Color.SkyBlue: return 0x2BADEE
        case Color.Mint: return 0x0AC2A3
        case Color.Green: return 0x66C653
        case Color.Yellow: return 0xEEBD2B
        case Color.Orange: return 0xEF8234
        case Color.Red: return 0xF1505E
        case Color.Pink: return 0xE963BC
        case Color.Purple: return 0xAB57FF
        case Color.Accessory: return 0x928E87
        case Color.TertiaryBody: return 0xAAA7A1
        case Color.SecondaryBody: return 0xCFCDC9
        case Color.Body: return 0xF3F2F2
        case Color.TertiaryBackground: return 0x0B0A0A
        case Color.SecondaryBackground: return 0x201F1D
        case Color.Background: return 0x363430 
      }
      break
      case ColorScheme.Light:
      switch(color) {
        case Color.Sepia: return 0x957350
        case Color.Gray: return 0x667799
        case Color.Blue: return 0x3661E2
        case Color.SkyBlue: return 0x189CDC
        case Color.Mint: return 0x13AE95
        case Color.Green: return 0x49B234
        case Color.Yellow: return 0xC7A705
        case Color.Orange: return 0xE56E19
        case Color.Red: return 0xDD3C49
        case Color.Pink: return 0xE54DB2
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
