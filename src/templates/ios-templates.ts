// import * as Utils from './utils.js'
// import { Color, AdaptiveColor, TextStyle } from './types.js'
// import { capitalCase } from 'change-case'

// const uiColorTemplate = (color: Color) => `UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})`
// const colorTemplate = (propName: string) => `
//     public static let ${propName} = Color(uiColor: .${propName})`

// const simpleUIColorTemplate = (color: Color) => `
//     /// ${Utils.htmlColorCode(color)}
//     public static let ${Utils.propCase(color.name)} = UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})`
  
// const adaptiveUIColorTemplate = (color: AdaptiveColor) => `
//     /// Light-mode: ${Utils.htmlColorCode(color.lightMode)}, dark-mode: ${Utils.htmlColorCode(color.darkMode)}
//     public static let ${Utils.propCase(color.lightMode.name)} = UIColor(lightMode: ${uiColorTemplate(color.lightMode)}, darkMode: ${uiColorTemplate(color.darkMode)})`

// export const colorsTemplate = (simpleColors: Color[], adaptiveColors: AdaptiveColor[]) => `import SwiftUI
// import UIKit

// extension Color {
//     ${adaptiveColors.map(c => colorTemplate(Utils.propCase(c.lightMode.name))).join('\n')}
// }

// extension UIColor {
//     ${adaptiveColors.map(c => adaptiveUIColorTemplate(c)).join('\n')}
//     ${simpleColors.map(c => simpleUIColorTemplate(c)).join('\n')}
    
//     convenience init(
//         lightMode lightModeColor: @escaping @autoclosure () -> UIColor,
//         darkMode darkModeColor: @escaping @autoclosure () -> UIColor
//     ) {
//         self.init { traitCollection in
//             switch traitCollection.userInterfaceStyle {
//             case .light, .unspecified:
//                 return lightModeColor()
//             case .dark:
//                 return darkModeColor()
//             @unknown default:
//                 return lightModeColor()
//             }
//         }
//     }
// }`

// const textStyleTemplate = (style: TextStyle) => `
//     /// ${style.fontFamily}, ${style.fontSize} pt, ${capitalCase(Utils.semanticWeight(style.fontWeight))}
//     case ${Utils.propCase(style.name)}`
    
// const caseReturnTemplate = (_case: string, _return: string): string => `
//         case .${Utils.propCase(_case)}:
//             return ${_return}`
    
// export const textStylesTemplate = (styles: TextStyle[]) => `import SwiftUI
// import UIKit

// public enum TextStyle {
//     ${styles.map(s => textStyleTemplate(s)).join('\n')}
    
//     public var suiFontWeight: Font.Weight {
//         switch self {
//             ${styles.map(s => caseReturnTemplate(s.name, `.${Utils.semanticWeight(s.fontWeight)}`)).join('\n')}
//         }
//     }
    
//     public var uiFontWeight: UIFont.Weight {
//         switch self {
//             ${styles.map(s => caseReturnTemplate(s.name, `.${Utils.semanticWeight(s.fontWeight)}`)).join('\n')}
//         }
//     }
    
//     public var suiFontDesign: Font.Design {
//         switch self {
//             ${styles.map(s => caseReturnTemplate(s.name, `.${Utils.fontDesign(s.name)}`)).join('\n')}
//         }
//     }
    
//     public var uiFontDesign: UIFontDescriptor.SystemDesign {
//         switch self {
//             ${styles.map(s => caseReturnTemplate(s.name, `.${Utils.fontDesign(s.name)}`)).join('\n')}
//         }
//     }
    
//     public var fontSize: CGFloat {
//         switch self {
//             ${styles.map(s => caseReturnTemplate(s.name, `${s.fontSize}`)).join('\n')}
//         }
//     }
    
//     public var letterSpacing: CGFloat {
//         switch self {
//             ${styles.map(s => caseReturnTemplate(s.name, `${s.letterSpacing}`)).join('\n')}
//         }
//     }
// }`
