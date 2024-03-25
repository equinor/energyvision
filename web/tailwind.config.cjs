/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('./colorConfig')

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

module.exports = {
  content: [
    './components/**/*.{js,ts,tsx}',
    './pageComponents/**/*.{js,ts,tsx}',
    './core/**/*.{js,ts,tsx}',
    './sections/**/*.{js,ts,tsx}',
  ],
  /*
  Now instead of dark:{class} classes being applied based on prefers-color-scheme, 
  they will be applied whenever the dark class is present earlier in the HTML tree.
  inverted -> dark
  NB: TwMerge configuration must be extended to properly merge custom theme utilities. 
  Less pain to use Tailwind eqvivalent. 
  */
  darkMode: 'selector',
  theme: {
    extend: {
      colors: ({ theme }) => ({
        'moss-green': {
          100: 'hsl(184, 100%, 17%)',
          95: 'hsl(184, 100%, 24%)',
          90: 'hsl(184, 31%, 58%)',
          80: 'hsl(184, 31%, 74%)',
          70: 'hsl(184, 30%, 84%)',
          60: 'hsl(184, 31%, 89%)',
          50: colors['moss-green'][50],
        },
        'energy-red': {
          100: colors['energy-red'][100],
          90: 'hsl(348, 100%, 67%)',
          80: 'hsl(347, 100%, 77%)',
          70: 'hsl(347, 100%, 86%)',
          60: 'hsl(349, 100%, 91%)',
          50: 'hsl(347, 100%, 96%)',
        },
        black: {
          100: 'hsl(0, 0%, 0%)',
          80: 'hsl(0, 0%, 20%)',
        },
        white: {
          100: colors.white[100],
        },
        'slate-blue': {
          //--bg-slate-blue
          100: 'hsl(206, 34%, 14%)',
          //--bg-slate-blue-95
          95: 'hsl(206, 32%, 21%)',
          90: 'hsl(207, 14%, 37%)',
          80: 'hsl(207, 8%, 53%)',
          70: 'hsl(206, 9%, 68%)',
          60: 'hsl(206, 9%, 84%)',
          50: 'hsl(210, 8%, 90%)',
        },
        'mist-blue': {
          100: colors['mist-blue'][100],
          60: 'hsl(200, 56%, 94%)',
        },
        'lichen-green': {
          100: 'hsl(138, 67%, 94%)',
        },
        'spruce-wood': {
          100: 'hsl(25, 100%, 92%)',
          90: colors['spruce-wood'][90],
        },
        'heritage-red': {
          100: 'hsl(343, 100%, 25%)',
          90: 'hsl(343, 42%, 43%)',
          80: 'hsl(344, 32%, 62%)',
          70: 'hsl(344, 32%, 77%)',
          60: 'hsl(340, 32%, 91%)',
        },
        'clear-red': {
          100: 'hsl(0, 100%, 46%)',
          90: 'hsl(0, 85%, 68%)',
          80: 'hsl(0, 85%, 78%)',
          70: 'hsl(0, 86%, 86%)',
          60: 'hsl(0, 88%, 94%)',
        },
        slate: {
          //--default-text
          80: 'rgba(61, 61, 61, 1)',
        },
        green: {
          100: 'hsl(118, 44%, 35%)',
          90: 'hsl(118, 44%, 50%)',
          //--mid-green
          //--bg-moss-green
          //--bg-mid-green
          50: colors.green[50],
        },
        yellow: {
          //--mid-yellow
          //--bg-mid-yellow
          50: colors.yellow[50],
        },
        blue: {
          //--mid-blue
          //--bg-mid-blue
          50: colors.blue[50],
        },
        orange: {
          100: 'hsl(34, 100%, 34%)',
          90: 'hsl(34, 100%, 50%)',
          //--mid-orange
          //--bg-mid-orange
          50: colors.orange[50],
        },
        grey: {
          100: 'hsl(0, 0%, 9%)',
          90: 'hsl(0, 0%, 24%)',
          80: 'hsl(0, 0%, 34%)',
          70: 'hsl(0, 0%, 40%)',
          60: 'hsl(0, 0%, 44%)',
          50: 'hsl(0, 0%, 55%)',
          40: 'hsl(0, 0%, 75%)',
          30: 'hsl(0, 0%, 86%)',
          20: 'hsl(0, 0%, 92%)',
          10: 'hsl(0, 0%, 97%)',
        },
        'transparent-black': 'theme(colors.black.100)/20',
        'transparent-white': 'theme(colors.white.100)/20',
      }),
      spacing: ({ theme }) => ({
        //--space-xSmall -> spacing.1
        //--space-small -> spacing.2
        //--space-medium -> spacing.4
        //--space-large -> spacing.6
        //--space-xLarge -> spacing.8
        //--space-xxLarge -> spacing.10
        //--space-3xLarge -> spacing.14
        //--space-4xLarge -> spacing.24
        xs: 'calc((4 / 16) * theme(fontSize.base))',
        sm: 'calc((8 / 16) * theme(fontSize.base))',
        md: 'calc((16 / 16) * theme(fontSize.base))',
        lg: 'calc((24 / 16) * theme(fontSize.base))',
        xl: 'calc((32 / 16) * theme(fontSize.base))',
        '2xl': 'calc((40 / 16) * theme(fontSize.base))',
        '3xl': 'calc((56 / 16) * theme(fontSize.base))',
        '4xl': 'calc((96 / 16) * theme(fontSize.base))',
      }),
      fontSize: {
        //--typeScale-00
        xs: ['clamp(calc(11.11 / 16 * 1rem), 0.19vw + 0.65rem, calc(14.08 / 16 * 1rem))'],
        //--typeScale-05
        sm: ['clamp(calc(14.61 / 16 * 1rem), 0.33vw + 0.84rem, calc(19.68 / 16 * 1rem))'],
        //--typeScale-1
        base: ['clamp(calc(16.00 / 16 * 1rem), 0.39vw + 0.91rem, calc(22.00 / 16 * 1rem))'],
        //--typeScale-2
        md: ['clamp(calc(19.20 / 16 * 1rem), 0.54vw + 1.07rem, calc(27.50 / 16 * 1rem))'],
        //--typeScale-3
        lg: ['clamp(calc(23.04 / 16 * 1rem), 0.73vw + 1.27rem, calc(34.38 / 16 * 1rem))'],
        //--typeScale-4
        xl: ['clamp(calc(27.65 / 16 * 1rem), 0.99vw + 1.5rem, calc(42.97 / 16 * 1rem))'],
        //--typeScale-4_5
        '2xl': ['clamp(calc(33.73 / 16 * 1rem), 1.38vw + 1.785rem, calc(55.055 / 16 * 1rem))'],
        //--typeScale-5
        '3xl': ['clamp(calc(39.81 / 16 * 1rem), 1.77vw + 2.07rem, calc(67.14 / 16 * 1rem))'],
        //--typeScale-6
        '4xl': ['clamp(calc(45.89 / 16 * 1rem), 2.16vw + 2.355rem, calc(79.225 / 16 * 1rem))'],
        //--typeScale-7
        '5xl': ['clamp(calc(51.97 / 16 * 1rem), 2.55vw + 2.64rem, calc(91.31 / 16 * 1rem))'],
      },
      fontWeight: {
        semibolder: 650,
        //--fontWeight-bold: tw -> semibold
        //--fontWeight-medium: tw -> medium
        //--fontWeight-regular: tw -> normal
      },
      lineHeight: {
        //--lineHeight-1
        inherit: 'inherit',
        //--lineHeight-2
        earthy: 1.2,
        //--lineHeight-2_5
        cloudy: 1.35,
        //-lineHeight-3
        planetary: 1.5,
      },
      maxWidth: {
        viewport: '1920px',
      },
      minWidth: {
        viewport: '375',
      },
      padding: {
        'layout-sm': 'clamp(16px, calc(-38.3689px + 14.4984vw), 250px)',
        'layout-md': 'clamp(16px, calc(-69.4369px + 22.7832vw), 368px)',
        'layout-lg': 'clamp(16px, calc(-101.4757px + 31.3269vw), 500px)',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(0.2)' },
        },
        fade: {
          '0%, 100%': { opacity: '0' },
          '20%, 80%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-out': 'linear fade both',
        'fade-out': 'auto linear fade-out both',
        'zoom-in': 'auto linear zoom-in both',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              fontSize: theme('fontSize.base'),
              lineHeight: theme('lineHeight.planetary'),
              h2: {
                fontSize: theme('fontSize.2xl'),
                lineHeight: theme('lineHeight.inherit'),
                fontWeight: theme('fontWeight.normal'),
                marginBottom: theme('spacing.8'),
              },
              h3: {
                fontSize: theme('fontSize.xl'),
                lineHeight: theme('lineHeight.inherit'),
                fontWeight: theme('fontWeight.normal'),
                marginBottom: theme('spacing.8'),
              },
            },
            {
              '--tw-prose-body': theme('colors.slate.80'),
              '--tw-prose-bullets': theme('colors.slate.80'),
              '--tw-prose-counters': theme('colors.slate.80'),
              //inverted
              '--tw-prose-invert-headings': theme('colors.white.100'),
              '--tw-prose-invert-body': theme('colors.white.100'),
              '--tw-prose-invert-bullets': theme('colors.white.100'),
              '--tw-prose-invert-counters': theme('colors.white.100'),
            },
          ],
        },
        article: {
          css: {
            h2: {
              fontSize: theme('fontSize.md'),
              lineHeight: theme('lineHeight.inherit'),
              fontWeight: theme('fontWeight.medium'),
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.2'),
              paddingLeft: theme('padding.layout-lg'),
              paddingRight: theme('padding.layout-lg'),
            },
            h3: {
              fontSize: theme('fontSize.base'),
              lineHeight: theme('lineHeight.inherit'),
              fontWeight: theme('fontWeight.medium'),
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.0'),
              paddingLeft: theme('padding.layout-lg'),
              paddingRight: theme('padding.layout-lg'),
            },
            ol: {
              marginLeft: theme('padding.layout-lg'),
              marginRight: theme('padding.layout-lg'),
            },
            ul: {
              marginLeft: theme('padding.layout-lg'),
              marginRight: theme('padding.layout-lg'),
            },
            'ul ul, ul ol, ol ul, ol ol': {
              paddingLeft: em(38, 24),
              marginLeft: '0px',
              marginRight: '0px',
            },
            'ol > li': {
              marginLeft: em(8, 14),
            },
            'ul > li': {
              marginLeft: em(8, 14),
            },
            p: {
              paddingLeft: theme('padding.layout-lg'),
              paddingRight: theme('padding.layout-lg'),
            },
          },
        },
        md: {
          css: {
            fontSize: theme('fontSize.md'),
            h2: {
              fontSize: theme('fontSize.xl'),
              lineHeight: theme('lineHeight.inherit'),
              fontWeight: theme('fontWeight.normal'),
              marginBottom: theme('spacing.6'),
            },
            h3: {
              fontSize: theme('fontSize.lg'),
              lineHeight: theme('lineHeight.inherit'),
              fontWeight: theme('fontWeight.normal'),
              marginBottom: theme('spacing.6'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ matchVariant }) {
      matchVariant(
        'nth',
        (value) => {
          return `&:nth-child(${value})`
        },
        {
          values: {
            1: '1',
            2: '2',
            3: '3',
          },
        },
      )
    }),
  ],
}
