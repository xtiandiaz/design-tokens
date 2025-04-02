/* File automatically generated; DO NOT edit! */

export enum ColorScheme {
  Dark,
  Light,
}

export enum Color {
  Sepia = 'sepia',
  Gray = 'gray',
  Indigo = 'indigo',
  Blue = 'blue',
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
        case Color.Gray: return 0x8592AD
        case Color.Indigo: return 0x5781FF
        case Color.Blue: return 0x2BADEE
        case Color.Mint: return 0x0AC2A3
        case Color.Green: return 0x62CB4D
        case Color.Yellow: return 0xEEBD2B
        case Color.Orange: return 0xF47B25
        case Color.Red: return 0xF04251
        case Color.Pink: return 0xF25ABF
        case Color.Purple: return 0x9D57FF
        case Color.Accessory: return 0x9E9B94
        case Color.TertiaryBody: return 0xB6B4AF
        case Color.SecondaryBody: return 0xDBD9D7
        case Color.Body: return 0xFFFFFF
        case Color.TertiaryBackground: return 0x10100F
        case Color.SecondaryBackground: return 0x23221F
        case Color.Background: return 0x363430 
      }
      break
      case ColorScheme.Light:
      switch(color) {
        case Color.Sepia: return 0x957350
        case Color.Gray: return 0x525F7A
        case Color.Indigo: return 0x4D66E5
        case Color.Blue: return 0x189CDC
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
