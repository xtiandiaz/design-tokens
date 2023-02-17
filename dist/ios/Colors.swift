import SwiftUI
import UIKit

extension Color {
    
    public static let systemRed = Color(uiColor: .systemRed)

    public static let systemForeground = Color(uiColor: .systemForeground)

    public static let systemBackground = Color(uiColor: .systemBackground)

    public static let white = Color(uiColor: .white)

    public static let black = Color(uiColor: .black)

    public static let jinjang = Color(uiColor: .jinjang)

    public static let dawn = Color(uiColor: .dawn)

    public static let rey = Color(uiColor: .rey)

    public static let cielo = Color(uiColor: .cielo)

    public static let minttu = Color(uiColor: .minttu)

    public static let zoness = Color(uiColor: .zoness)

    public static let limoncello = Color(uiColor: .limoncello)

    public static let tangelo = Color(uiColor: .tangelo)

    public static let lipstick = Color(uiColor: .lipstick)

    public static let kirbo = Color(uiColor: .kirbo)

    public static let purpolo = Color(uiColor: .purpolo)

    public static let accessory = Color(uiColor: .accessory)

    public static let tertiaryBody = Color(uiColor: .tertiaryBody)

    public static let secondaryBody = Color(uiColor: .secondaryBody)

    public static let body = Color(uiColor: .body)

    public static let secondaryBackground = Color(uiColor: .secondaryBackground)

    public static let background = Color(uiColor: .background)
}

extension UIColor {
    
    /// Light-mode: #ff3b30, dark-mode: #ff453a
    public static let systemRed = UIColor(lightMode: UIColor(red: 1, green: 0.23137255012989044, blue: 0.1882352977991104, alpha: 1), darkMode: UIColor(red: 1, green: 0.2705882489681244, blue: 0.22745098173618317, alpha: 1))

    /// Light-mode: #000000, dark-mode: #ffffff
    public static let systemForeground = UIColor(lightMode: UIColor(red: 0, green: 0, blue: 0, alpha: 1), darkMode: UIColor(red: 1, green: 1, blue: 1, alpha: 1))

    /// Light-mode: #ffffff, dark-mode: #000000
    public static let systemBackground = UIColor(lightMode: UIColor(red: 1, green: 1, blue: 1, alpha: 1), darkMode: UIColor(red: 0, green: 0, blue: 0, alpha: 1))

    /// Light-mode: #ffffff, dark-mode: #ffffff
    public static let white = UIColor(lightMode: UIColor(red: 1, green: 1, blue: 1, alpha: 1), darkMode: UIColor(red: 1, green: 1, blue: 1, alpha: 1))

    /// Light-mode: #000000, dark-mode: #000000
    public static let black = UIColor(lightMode: UIColor(red: 0, green: 0, blue: 0, alpha: 1), darkMode: UIColor(red: 0, green: 0, blue: 0, alpha: 1))

    /// Light-mode: #262f40, dark-mode: #cfd6e5
    public static let jinjang = UIColor(lightMode: UIColor(red: 0.14999999105930328, green: 0.18333333730697632, blue: 0.25, alpha: 1), darkMode: UIColor(red: 0.8100000023841858, green: 0.8400000333786011, blue: 0.8999999761581421, alpha: 1))

    /// Light-mode: #5c7099, dark-mode: #8aa8e5
    public static let dawn = UIColor(lightMode: UIColor(red: 0.36000001430511475, green: 0.440000057220459, blue: 0.6000000238418579, alpha: 1), darkMode: UIColor(red: 0.5399999618530273, green: 0.6600000262260437, blue: 0.8999999761581421, alpha: 1))

    /// Light-mode: #2469f2, dark-mode: #33aaff
    public static let rey = UIColor(lightMode: UIColor(red: 0.14249998331069946, green: 0.41166678071022034, blue: 0.949999988079071, alpha: 1), darkMode: UIColor(red: 0.19999998807907104, green: 0.6666667461395264, blue: 1, alpha: 1))

    /// Light-mode: #0b9de5, dark-mode: #18cef2
    public static let cielo = UIColor(lightMode: UIColor(red: 0.04500001668930054, green: 0.6149998307228088, blue: 0.8999999761581421, alpha: 1), darkMode: UIColor(red: 0.09500002861022949, green: 0.8074999451637268, blue: 0.949999988079071, alpha: 1))

    /// Light-mode: #00a68a, dark-mode: #16d9b8
    public static let minttu = UIColor(lightMode: UIColor(red: 0, green: 0.6499999761581421, blue: 0.541666567325592, alpha: 1), darkMode: UIColor(red: 0.08500003814697266, green: 0.8500000238418579, blue: 0.7224999666213989, alpha: 1))

    /// Light-mode: #4ab236, dark-mode: #66cc52
    public static let zoness = UIColor(lightMode: UIColor(red: 0.291666716337204, green: 0.699999988079071, blue: 0.21000000834465027, alpha: 1), darkMode: UIColor(red: 0.40000003576278687, green: 0.800000011920929, blue: 0.3199999928474426, alpha: 1))

    /// Light-mode: #cc9900, dark-mode: #e5b82e
    public static let limoncello = UIColor(lightMode: UIColor(red: 0.800000011920929, green: 0.6000000238418579, blue: 0, alpha: 1), darkMode: UIColor(red: 0.8999999761581421, green: 0.7199999690055847, blue: 0.18000000715255737, alpha: 1))

    /// Light-mode: #f26c0c, dark-mode: #ff8126
    public static let tangelo = UIColor(lightMode: UIColor(red: 0.949999988079071, green: 0.42354151606559753, blue: 0.047500014305114746, alpha: 1), darkMode: UIColor(red: 1, green: 0.5041664838790894, blue: 0.1499999761581421, alpha: 1))

    /// Light-mode: #e53956, dark-mode: #f24965
    public static let lipstick = UIColor(lightMode: UIColor(red: 0.8999999761581421, green: 0.2250000238418579, blue: 0.3375002145767212, alpha: 1), darkMode: UIColor(red: 0.949999988079071, green: 0.2850000262260437, blue: 0.3958335518836975, alpha: 1))

    /// Light-mode: #e550b4, dark-mode: #f261aa
    public static let kirbo = UIColor(lightMode: UIColor(red: 0.8999999761581421, green: 0.3149999976158142, blue: 0.7049999237060547, alpha: 1), darkMode: UIColor(red: 0.949999988079071, green: 0.3799999952316284, blue: 0.6649999618530273, alpha: 1))

    /// Light-mode: #7a45e5, dark-mode: #cc66ff
    public static let purpolo = UIColor(lightMode: UIColor(red: 0.4799997806549072, green: 0.26999998092651367, blue: 0.8999999761581421, alpha: 1), darkMode: UIColor(red: 0.8000001907348633, green: 0.3999999761581421, blue: 1, alpha: 1))

    /// Light-mode: #c3cad9, dark-mode: #505c73
    public static let accessory = UIColor(lightMode: UIColor(red: 0.7647058963775635, green: 0.7921568751335144, blue: 0.8509804010391235, alpha: 1), darkMode: UIColor(red: 0.3137255012989044, green: 0.3607843220233917, blue: 0.45098039507865906, alpha: 1))

    /// Light-mode: #8590a6, dark-mode: #8590a6
    public static let tertiaryBody = UIColor(lightMode: UIColor(red: 0.5215686559677124, green: 0.5647059082984924, blue: 0.6509804129600525, alpha: 1), darkMode: UIColor(red: 0.5199999809265137, green: 0.5633333325386047, blue: 0.6499999761581421, alpha: 1))

    /// Light-mode: #69758c, dark-mode: #a3acbf
    public static let secondaryBody = UIColor(lightMode: UIColor(red: 0.4125000238418579, green: 0.4583333730697632, blue: 0.550000011920929, alpha: 1), darkMode: UIColor(red: 0.637499988079071, green: 0.675000011920929, blue: 0.75, alpha: 1))

    /// Light-mode: #1b1f26, dark-mode: #edf0f5
    public static let body = UIColor(lightMode: UIColor(red: 0.10500000417232513, green: 0.12000001221895218, blue: 0.15000000596046448, alpha: 1), darkMode: UIColor(red: 0.9311999678611755, green: 0.9408000707626343, blue: 0.9599999785423279, alpha: 1))

    /// Light-mode: #ffffff, dark-mode: #1b1f26
    public static let secondaryBackground = UIColor(lightMode: UIColor(red: 1, green: 1, blue: 1, alpha: 1), darkMode: UIColor(red: 0.10500000417232513, green: 0.12000001221895218, blue: 0.15000000596046448, alpha: 1))

    /// Light-mode: #f0f2f5, dark-mode: #0c0e12
    public static let background = UIColor(lightMode: UIColor(red: 0.9407999515533447, green: 0.9479999542236328, blue: 0.9599999785423279, alpha: 1), darkMode: UIColor(red: 0.045500002801418304, green: 0.053666673600673676, blue: 0.07000000029802322, alpha: 1))
    
    
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
}