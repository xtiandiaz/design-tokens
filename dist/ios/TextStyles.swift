import SwiftUI
import UIKit

public enum TextStyle {
    
    /// SF Pro, 34 pt, Semibold
    case largeTitle

    /// SF Pro, 34 pt, Bold
    case largeTitleBolder

    /// SF Pro Rounded, 34 pt, Semibold
    case largeTitleRounded

    /// SF Pro Rounded, 34 pt, Bold
    case largeTitleRoundedBolder

    /// New York, 34 pt, Bold
    case largeTitleSerif

    /// SF Pro, 28 pt, Semibold
    case title1

    /// SF Pro, 28 pt, Bold
    case title1Bolder

    /// SF Pro Rounded, 28 pt, Semibold
    case title1Rounded

    /// SF Pro Rounded, 28 pt, Bold
    case title1RoundedBolder

    /// New York, 28 pt, Bold
    case title1Serif

    /// SF Pro, 22 pt, Semibold
    case title2

    /// SF Pro, 22 pt, Bold
    case title2Bolder

    /// SF Pro Rounded, 22 pt, Semibold
    case title2Rounded

    /// SF Pro Rounded, 22 pt, Bold
    case title2RoundedBolder

    /// New York, 22 pt, Bold
    case title2Serif

    /// SF Pro, 20 pt, Semibold
    case title3

    /// SF Pro, 20 pt, Bold
    case title3Bolder

    /// SF Pro Rounded, 20 pt, Semibold
    case title3Rounded

    /// SF Pro Rounded, 20 pt, Bold
    case title3RoundedBolder

    /// New York, 20 pt, Bold
    case title3Serif

    /// SF Pro, 17 pt, Semibold
    case headline

    /// SF Pro, 17 pt, Bold
    case headlineBolder

    /// SF Pro Rounded, 17 pt, Semibold
    case headlineRounded

    /// SF Pro Rounded, 17 pt, Bold
    case headlineRoundedBolder

    /// New York, 17 pt, Bold
    case headlineSerif

    /// SF Pro, 17 pt, Regular
    case body

    /// SF Pro, 16 pt, Regular
    case callout

    /// SF Pro, 15 pt, Semibold
    case subhead

    /// SF Pro, 15 pt, Bold
    case subheadBolder

    /// SF Pro Rounded, 15 pt, Semibold
    case subheadRounded

    /// SF Pro Rounded, 15 pt, Bold
    case subheadRoundedBolder

    /// New York, 15 pt, Bold
    case subheadSerif

    /// SF Pro, 13 pt, Regular
    case footnote

    /// SF Pro, 12 pt, Medium
    case caption1

    /// SF Pro, 12 pt, Bold
    case caption1Bolder

    /// SF Pro, 11 pt, Medium
    case caption2
    
    public var suiFontWeight: Font.Weight {
        switch self {
            
        case .largeTitle:
            return .semibold

        case .largeTitleBolder:
            return .bold

        case .largeTitleRounded:
            return .semibold

        case .largeTitleRoundedBolder:
            return .bold

        case .largeTitleSerif:
            return .bold

        case .title1:
            return .semibold

        case .title1Bolder:
            return .bold

        case .title1Rounded:
            return .semibold

        case .title1RoundedBolder:
            return .bold

        case .title1Serif:
            return .bold

        case .title2:
            return .semibold

        case .title2Bolder:
            return .bold

        case .title2Rounded:
            return .semibold

        case .title2RoundedBolder:
            return .bold

        case .title2Serif:
            return .bold

        case .title3:
            return .semibold

        case .title3Bolder:
            return .bold

        case .title3Rounded:
            return .semibold

        case .title3RoundedBolder:
            return .bold

        case .title3Serif:
            return .bold

        case .headline:
            return .semibold

        case .headlineBolder:
            return .bold

        case .headlineRounded:
            return .semibold

        case .headlineRoundedBolder:
            return .bold

        case .headlineSerif:
            return .bold

        case .body:
            return .regular

        case .callout:
            return .regular

        case .subhead:
            return .semibold

        case .subheadBolder:
            return .bold

        case .subheadRounded:
            return .semibold

        case .subheadRoundedBolder:
            return .bold

        case .subheadSerif:
            return .bold

        case .footnote:
            return .regular

        case .caption1:
            return .medium

        case .caption1Bolder:
            return .bold

        case .caption2:
            return .medium
        }
    }
    
    public var uiFontWeight: UIFont.Weight {
        switch self {
            
        case .largeTitle:
            return .semibold

        case .largeTitleBolder:
            return .bold

        case .largeTitleRounded:
            return .semibold

        case .largeTitleRoundedBolder:
            return .bold

        case .largeTitleSerif:
            return .bold

        case .title1:
            return .semibold

        case .title1Bolder:
            return .bold

        case .title1Rounded:
            return .semibold

        case .title1RoundedBolder:
            return .bold

        case .title1Serif:
            return .bold

        case .title2:
            return .semibold

        case .title2Bolder:
            return .bold

        case .title2Rounded:
            return .semibold

        case .title2RoundedBolder:
            return .bold

        case .title2Serif:
            return .bold

        case .title3:
            return .semibold

        case .title3Bolder:
            return .bold

        case .title3Rounded:
            return .semibold

        case .title3RoundedBolder:
            return .bold

        case .title3Serif:
            return .bold

        case .headline:
            return .semibold

        case .headlineBolder:
            return .bold

        case .headlineRounded:
            return .semibold

        case .headlineRoundedBolder:
            return .bold

        case .headlineSerif:
            return .bold

        case .body:
            return .regular

        case .callout:
            return .regular

        case .subhead:
            return .semibold

        case .subheadBolder:
            return .bold

        case .subheadRounded:
            return .semibold

        case .subheadRoundedBolder:
            return .bold

        case .subheadSerif:
            return .bold

        case .footnote:
            return .regular

        case .caption1:
            return .medium

        case .caption1Bolder:
            return .bold

        case .caption2:
            return .medium
        }
    }
    
    public var suiFontDesign: Font.Design {
        switch self {
            
        case .largeTitle:
            return .`default`

        case .largeTitleBolder:
            return .`default`

        case .largeTitleRounded:
            return .rounded

        case .largeTitleRoundedBolder:
            return .rounded

        case .largeTitleSerif:
            return .serif

        case .title1:
            return .`default`

        case .title1Bolder:
            return .`default`

        case .title1Rounded:
            return .rounded

        case .title1RoundedBolder:
            return .rounded

        case .title1Serif:
            return .serif

        case .title2:
            return .`default`

        case .title2Bolder:
            return .`default`

        case .title2Rounded:
            return .rounded

        case .title2RoundedBolder:
            return .rounded

        case .title2Serif:
            return .serif

        case .title3:
            return .`default`

        case .title3Bolder:
            return .`default`

        case .title3Rounded:
            return .rounded

        case .title3RoundedBolder:
            return .rounded

        case .title3Serif:
            return .serif

        case .headline:
            return .`default`

        case .headlineBolder:
            return .`default`

        case .headlineRounded:
            return .rounded

        case .headlineRoundedBolder:
            return .rounded

        case .headlineSerif:
            return .serif

        case .body:
            return .`default`

        case .callout:
            return .`default`

        case .subhead:
            return .`default`

        case .subheadBolder:
            return .`default`

        case .subheadRounded:
            return .rounded

        case .subheadRoundedBolder:
            return .rounded

        case .subheadSerif:
            return .serif

        case .footnote:
            return .`default`

        case .caption1:
            return .`default`

        case .caption1Bolder:
            return .`default`

        case .caption2:
            return .`default`
        }
    }
    
    public var uiFontDesign: UIFontDescriptor.SystemDesign {
        switch self {
            
        case .largeTitle:
            return .`default`

        case .largeTitleBolder:
            return .`default`

        case .largeTitleRounded:
            return .rounded

        case .largeTitleRoundedBolder:
            return .rounded

        case .largeTitleSerif:
            return .serif

        case .title1:
            return .`default`

        case .title1Bolder:
            return .`default`

        case .title1Rounded:
            return .rounded

        case .title1RoundedBolder:
            return .rounded

        case .title1Serif:
            return .serif

        case .title2:
            return .`default`

        case .title2Bolder:
            return .`default`

        case .title2Rounded:
            return .rounded

        case .title2RoundedBolder:
            return .rounded

        case .title2Serif:
            return .serif

        case .title3:
            return .`default`

        case .title3Bolder:
            return .`default`

        case .title3Rounded:
            return .rounded

        case .title3RoundedBolder:
            return .rounded

        case .title3Serif:
            return .serif

        case .headline:
            return .`default`

        case .headlineBolder:
            return .`default`

        case .headlineRounded:
            return .rounded

        case .headlineRoundedBolder:
            return .rounded

        case .headlineSerif:
            return .serif

        case .body:
            return .`default`

        case .callout:
            return .`default`

        case .subhead:
            return .`default`

        case .subheadBolder:
            return .`default`

        case .subheadRounded:
            return .rounded

        case .subheadRoundedBolder:
            return .rounded

        case .subheadSerif:
            return .serif

        case .footnote:
            return .`default`

        case .caption1:
            return .`default`

        case .caption1Bolder:
            return .`default`

        case .caption2:
            return .`default`
        }
    }
    
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

        case .caption1:
            return 12

        case .caption1Bolder:
            return 12

        case .caption2:
            return 11
        }
    }
    
    public var letterSpacing: CGFloat {
        switch self {
            
        case .largeTitle:
            return 0

        case .largeTitleBolder:
            return 0

        case .largeTitleRounded:
            return 0

        case .largeTitleRoundedBolder:
            return 0

        case .largeTitleSerif:
            return 0

        case .title1:
            return 0

        case .title1Bolder:
            return 0

        case .title1Rounded:
            return 0

        case .title1RoundedBolder:
            return 0

        case .title1Serif:
            return 0

        case .title2:
            return 0

        case .title2Bolder:
            return 0

        case .title2Rounded:
            return 0

        case .title2RoundedBolder:
            return 0

        case .title2Serif:
            return 0

        case .title3:
            return 0

        case .title3Bolder:
            return 0

        case .title3Rounded:
            return 0

        case .title3RoundedBolder:
            return 0

        case .title3Serif:
            return 0

        case .headline:
            return 0

        case .headlineBolder:
            return 0

        case .headlineRounded:
            return 0

        case .headlineRoundedBolder:
            return 0

        case .headlineSerif:
            return 0

        case .body:
            return 0

        case .callout:
            return 0

        case .subhead:
            return 0

        case .subheadBolder:
            return 0

        case .subheadRounded:
            return 0

        case .subheadRoundedBolder:
            return 0

        case .subheadSerif:
            return 0

        case .footnote:
            return 0

        case .caption1:
            return 0.96

        case .caption1Bolder:
            return 0.96

        case .caption2:
            return 0
        }
    }
}