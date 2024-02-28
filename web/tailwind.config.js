/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

export default {
  content: ['./components/**/*.{js,ts,tsx}', './pageComponents/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'moss-green': {
          100: 'hsl(184, 100%, 17%)',
        },
        black: {
          100: 'hsl(0, 0%, 0%)',
          80: 'hsl(0, 0%, 20%)',
        },
      },
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
            '--tw-prose-body': theme('colors.moss-green.100'),
            '--tw-prose-bullets': theme('colors.black.80'),
            '--tw-prose-counters': theme('colors.black.80'),
            //inverted
            //'--tw-prose-invert-headings': colors.white,
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
