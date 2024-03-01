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
  content: ['./components/**/*.{js,ts,tsx}', './pageComponents/**/*.{js,ts,tsx}'],
  /*
  Now instead of dark:{class} classes being applied based on prefers-color-scheme, 
  they will be applied whenever the dark class is present earlier in the HTML tree.
  inverted -> dark
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
        //--typeScale-05
        sm: ['clamp(calc(14.61 / 16 * 1rem), 0.33vw + 0.84rem, calc(19.68 / 16 * 1rem))'],
        //--typeScale-1
        base: ['clamp(calc(16.00 / 16 * 1rem), 0.39vw + 0.91rem, calc(22.00 / 16 * 1rem))'],
        //--typeScale-2
        md: ['clamp(calc(19.20 / 16 * 1rem), 0.54vw + 1.07rem, calc(27.50 / 16 * 1rem))'],
        //--typeScale-3
        lg: ['clamp(calc(23.04 / 16 * 1rem), 0.73vw + 1.27rem, calc(34.38 / 16 * 1rem))'],
      },
      fontWeight: {
        semibolder: 650,
        //--fontWeight-bold: tw -> semibold
        //--fontWeight-medium: tw -> medium
        //--fontWeight-regular: tw -> normal
      },
      lineHeight: {
        inherit: 'inherit',
        earthy: 1.2,
        cloudy: 1.35,
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: theme('fontSize.base'),
            h2: {
              fontSize: theme('fontSize.md'),
              lineHeight: round(32 / 24),
              fontWeight: theme('fontWeight.semibold'),
            },
            'ul > li': {
              paddingLeft: em(8, 14),
            },
            p: {
              textAlign: 'justify',
            },
          },
        },
        envis: {
          css: {
            '--tw-prose-body': theme('colors.black.100'),
            '--tw-prose-bullets': theme('colors.black.80'),
            '--tw-prose-counters': theme('colors.black.80'),
            //inverted
            '--tw-prose-invert-headings': theme('colors.white.100'),
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
