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
  AccessoryAlt = 'accessory-alt',
  Accessory = 'accessory',
  TertiaryBodyAlt = 'tertiary-body-alt',
  TertiaryBody = 'tertiary-body',
  SecondaryBodyAlt = 'secondary-body-alt',
  SecondaryBody = 'secondary-body',
  BodyAlt = 'body-alt',
  Body = 'body',
  TertiaryBackgroundAlt = 'tertiary-background-alt',
  TertiaryBackground = 'tertiary-background',
  SecondaryBackgroundAlt = 'secondary-background-alt',
  SecondaryBackground = 'secondary-background',
  BackgroundAlt = 'background-alt',
  Background = 'background',
}

export const schemeColor = (scheme: ColorScheme, color: Color): number => {
  switch(scheme) {
    case ColorScheme.Dark:
      switch(color) {
        case Color.Sepia: return 0xA99170
        case Color.Gray: return 0xB6BCC9
        case Color.Blue: return 0x5781FF
        case Color.SkyBlue: return 0x2BADEE
        case Color.Mint: return 0x0AC2A3
        case Color.Green: return 0x66C653
        case Color.Yellow: return 0xEEBD2B
        case Color.Orange: return 0xEF8234
        case Color.Red: return 0xF1505E
        case Color.Pink: return 0xE963BC
        case Color.Purple: return 0xAB57FF
        case Color.Accessory: return 0x878E92
        case Color.AccessoryAlt: return 0xA39075
        case Color.TertiaryBody: return 0xA1A7AA
        case Color.TertiaryBodyAlt: return 0xB8A994
        case Color.SecondaryBody: return 0xC9CDCF
        case Color.SecondaryBodyAlt: return 0xD6CEC2
        case Color.Body: return 0xF2F2F3
        case Color.BodyAlt: return 0xF5F3F0
        case Color.TertiaryBackground: return 0x000000
        case Color.TertiaryBackgroundAlt: return 0x000000
        case Color.SecondaryBackground: return 0x0F1010
        case Color.SecondaryBackgroundAlt: return 0x12100C
        case Color.Background: return 0x1D1F20
        case Color.BackgroundAlt: return 0x252018 
      }
      break
      case ColorScheme.Light:
      switch(color) {
        case Color.Sepia: return 0x8F7856
        case Color.Gray: return 0x6C7993
        case Color.Blue: return 0x3661E2
        case Color.SkyBlue: return 0x189CDC
        case Color.Mint: return 0x13AE95
        case Color.Green: return 0x49B234
        case Color.Yellow: return 0xD1AF05
        case Color.Orange: return 0xE56E19
        case Color.Red: return 0xDD3C49
        case Color.Pink: return 0xE54DB2
        case Color.Purple: return 0x7F4DE5
        case Color.AccessoryAlt: return 0xAD9C85
        case Color.Accessory: return 0x949B9E
        case Color.TertiaryBodyAlt: return 0x998466
        case Color.TertiaryBody: return 0x798286
        case Color.SecondaryBodyAlt: return 0x6B5C47
        case Color.SecondaryBody: return 0x555B5E
        case Color.BodyAlt: return 0x3D3529
        case Color.Body: return 0x303436
        case Color.TertiaryBackgroundAlt: return 0xE7E1DA
        case Color.TertiaryBackground: return 0xDFE1E2
        case Color.SecondaryBackgroundAlt: return 0xF3F0ED
        case Color.SecondaryBackground: return 0xEFF0F0
        case Color.BackgroundAlt: return 0xFFFFFF
        case Color.Background: return 0xFFFFFF 
      }
      break
    
  }
}
