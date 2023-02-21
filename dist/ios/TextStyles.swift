public enum TextStyle {
    
    /// SF Pro, 34, 590
    case largeTitle

    /// SF Pro, 34, 700
    case largeTitleBolder

    /// SF Pro Rounded, 34, 600
    case largeTitleRounded

    /// SF Pro Rounded, 34, 700
    case largeTitleRoundedBolder

    /// New York, 34, 674
    case largeTitleSerif

    /// SF Pro, 28, 590
    case title1

    /// SF Pro, 28, 700
    case title1Bolder

    /// SF Pro Rounded, 28, 600
    case title1Rounded

    /// SF Pro Rounded, 28, 700
    case title1RoundedBolder

    /// New York, 28, 674
    case title1Serif

    /// SF Pro, 22, 590
    case title2

    /// SF Pro, 22, 700
    case title2Bolder

    /// SF Pro Rounded, 22, 600
    case title2Rounded

    /// SF Pro Rounded, 22, 700
    case title2RoundedBolder

    /// New York, 22, 674
    case title2Serif

    /// SF Pro, 20, 590
    case title3

    /// SF Pro, 20, 700
    case title3Bolder

    /// SF Pro Rounded, 20, 600
    case title3Rounded

    /// SF Pro Rounded, 20, 700
    case title3RoundedBolder

    /// New York, 20, 674
    case title3Serif

    /// SF Pro, 17, 590
    case headline

    /// SF Pro, 17, 700
    case headlineBolder

    /// SF Pro Rounded, 17, 600
    case headlineRounded

    /// SF Pro Rounded, 17, 700
    case headlineRoundedBolder

    /// New York, 17, 674
    case headlineSerif

    /// SF Pro, 17, 400
    case body

    /// SF Pro, 16, 400
    case callout

    /// SF Pro, 15, 590
    case subhead

    /// SF Pro, 15, 700
    case subheadBolder

    /// SF Pro Rounded, 15, 600
    case subheadRounded

    /// SF Pro Rounded, 15, 700
    case subheadRoundedBolder

    /// New York, 15, 674
    case subheadSerif

    /// SF Pro, 13, 400
    case footnote

    /// SF Pro, 13, 700
    case accessory

    /// SF Pro, 12, 510
    case caption1

    /// SF Pro, 12, 700
    case caption1Bolder

    /// SF Pro, 11, 510
    case caption2
    
    public var fontSize: CGFloat {
        switch self {
            
        case .largeTitle:
            return 34

        case .largeTitleBolder:
            return 34

        case .largeTitleRounded:
            return 34

        case .largeTitleRoundedBolder:
            return 34

        case .largeTitleSerif:
            return 34

        case .title1:
            return 28

        case .title1Bolder:
            return 28

        case .title1Rounded:
            return 28

        case .title1RoundedBolder:
            return 28

        case .title1Serif:
            return 28

        case .title2:
            return 22

        case .title2Bolder:
            return 22

        case .title2Rounded:
            return 22

        case .title2RoundedBolder:
            return 22

        case .title2Serif:
            return 22

        case .title3:
            return 20

        case .title3Bolder:
            return 20

        case .title3Rounded:
            return 20

        case .title3RoundedBolder:
            return 20

        case .title3Serif:
            return 20

        case .headline:
            return 17

        case .headlineBolder:
            return 17

        case .headlineRounded:
            return 17

        case .headlineRoundedBolder:
            return 17

        case .headlineSerif:
            return 17

        case .body:
            return 17

        case .callout:
            return 16

        case .subhead:
            return 15

        case .subheadBolder:
            return 15

        case .subheadRounded:
            return 15

        case .subheadRoundedBolder:
            return 15

        case .subheadSerif:
            return 15

        case .footnote:
            return 13

        case .accessory:
            return 13

        case .caption1:
            return 12

        case .caption1Bolder:
            return 12

        case .caption2:
            return 11
        }
    }
    
    public var fontName: String {
        switch self {
            
        case .largeTitle:
            return "SFPro-Semibold"

        case .largeTitleBolder:
            return "SFPro-Bold"

        case .largeTitleRounded:
            return "SFProRounded-Semibold"

        case .largeTitleRoundedBolder:
            return "SFProRounded-Bold"

        case .largeTitleSerif:
            return "NewYork-Bold"

        case .title1:
            return "SFPro-Semibold"

        case .title1Bolder:
            return "SFPro-Bold"

        case .title1Rounded:
            return "SFProRounded-Semibold"

        case .title1RoundedBolder:
            return "SFProRounded-Bold"

        case .title1Serif:
            return "NewYork-Bold"

        case .title2:
            return "SFPro-Semibold"

        case .title2Bolder:
            return "SFPro-Bold"

        case .title2Rounded:
            return "SFProRounded-Semibold"

        case .title2RoundedBolder:
            return "SFProRounded-Bold"

        case .title2Serif:
            return "NewYork-Bold"

        case .title3:
            return "SFPro-Semibold"

        case .title3Bolder:
            return "SFPro-Bold"

        case .title3Rounded:
            return "SFProRounded-Semibold"

        case .title3RoundedBolder:
            return "SFProRounded-Bold"

        case .title3Serif:
            return "NewYork-Bold"

        case .headline:
            return "SFPro-Semibold"

        case .headlineBolder:
            return "SFPro-Bold"

        case .headlineRounded:
            return "SFProRounded-Semibold"

        case .headlineRoundedBolder:
            return "SFProRounded-Bold"

        case .headlineSerif:
            return "NewYork-Bold"

        case .body:
            return "SFPro-Regular"

        case .callout:
            return "SFPro-Regular"

        case .subhead:
            return "SFPro-Semibold"

        case .subheadBolder:
            return "SFPro-Bold"

        case .subheadRounded:
            return "SFProRounded-Semibold"

        case .subheadRoundedBolder:
            return "SFProRounded-Bold"

        case .subheadSerif:
            return "NewYork-Bold"

        case .footnote:
            return "SFPro-Regular"

        case .accessory:
            return "SFPro-Bold"

        case .caption1:
            return "SFPro-Medium"

        case .caption1Bolder:
            return "SFPro-Bold"

        case .caption2:
            return "SFPro-Medium"
        }
    }
}