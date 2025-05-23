# Design Tokens 🎨

A utility to read and export colors, text styles, and more, from a Figma file.

For now, it is only aimed at the Web platform. Feel free to fork and extend to your needs.

## Setup

1. Install the NPM project as usual.
1. Create an `.env` file containing your `FIGMA_ACCESS_TOKEN`.
1. At `figma.ts`, update the `fileId` with the ID of the Figma file containing your own tokens. For reference, check the [source file](https://www.figma.com/design/bINVy3ZxKbDUh4Hs1PijwI/Design-Tokens) alongside the code at `figma.ts` to grasp how the Figma file is assembled and read in code using their API. Then, proceed to adapt your own file and code to your preferences.
1. Excecute `npm run build` to read the Figma file and build the tokens, by extracting data and generating them in the form of assets.

## Web Design Tokens

These are my only focus nowadays, and will keep on refining them and adding more as I progress in parallel with apps built on Vue. These Web Design Tokens include:
1. A `_palette.scss` partial sheet with colors categorized and ready to use on both color schemes (light and dark).
1. A `_typography.scss` partial sheet with text styles; all of their attributes declared either within element or class selectors. Moreover, their font faces declared and their corresponding files copied and stored as assets.
1. A `_iconography.scss` partial sheet including SCSS functions, mixins and a few style rules to color and include SVG icons easily via CSS.

## Licenses

As of the custom design tokens and their generators, use at your own wish and risk under the [MIT License](LICENSE).

### Resources

* [Inter Font](https://github.com/rsms/inter/?tab=OFL-1.1-1-ov-file)
* [Crimson Pro Font](https://github.com/Fonthausen/CrimsonPro?tab=OFL-1.1-1-ov-file)
