import { camelCase } from 'change-case'

import * as Utils from './utils.js'
import { Color, AdaptiveColor } from './types.js'

export const uiColorTemplate = (color: Color) => `UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})!`
export const colorTemplate = (propName: string) => `
    public static let ${propName} = Color(uiColor: .${propName})`

export const simpleUIColorTemplate = (color: Color) => `
    /// ${Utils.rgbToHex(color)}
    public static let ${camelCase(color.name)} = UIColor(red: ${color.r}, green: ${color.g}, blue: ${color.b}, alpha: ${color.a})!`

export const simpleColorTemplate = (propName: string) => `
    public static let ${propName} = ${colorTemplate(propName)}`
  
export const adaptiveUIColorTemplate = (color: AdaptiveColor) => `
    /// Light-mode: ${Utils.rgbToHex(color.lightMode)}, dark-mode: ${Utils.rgbToHex(color.darkMode)}
    public static let ${camelCase(color.lightMode.name)} = UIColor(lightMode: ${uiColorTemplate(color.lightMode)}, darkMode: ${uiColorTemplate(color.darkMode)})!`

export const colorsTemplate = (simpleColors: Color[], adaptiveColors: AdaptiveColor[]) => `import SwiftUI
import UIKit

extension Color {
    ${adaptiveColors.map(c => colorTemplate(camelCase(c.lightMode.name))).join('\n')}
}

extension UIColor {
    ${adaptiveColors.map(c => adaptiveUIColorTemplate(c)).join('\n')}
    ${simpleColors.map(c => simpleUIColorTemplate(c)).join('\n')}
    
    convenience init(
        lightMode lightModeColor: @escaping @autoclosure () -> UIColor,
        darkMode darkModeColor: @escaping @autoclosure () -> UIColor
    ) {
        self.init { traitCollection in
            switch traitCollection.userInterfaceStyle {
            case .light, .unspecified:
                return lightModeColor()
            case .dark:
                return darkModeColor()
            @unknown default:
                return lightModeColor()
            }
        }
    }
}`
