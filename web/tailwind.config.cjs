/** @type {import('tailwindcss').Config} */

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const em = (px, base) => `${round(px / base)}em`

module.exports = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: [
            {
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-planetary)',
              h2: {
                fontSize: 'var(--text-xl)',
                lineHeight: 'var(--leading-inherit)',
                marginTop: 'var(--spacing-2)',
                marginBottom: 'var(--spacing-8)',
              },
              h3: {
                fontSize: 'var(--text-md)',
                lineHeight: 'var(--leading-inherit)',
                marginTop: 'var(--spacing-2)',
                marginBottom: 'var(--spacing-0)',
              },
              'ul ul, ul ol, ol ul, ol ol': {
                paddingLeft: em(38, 24),
              },
              'ol ol': {
                listStyleType: 'lower-alpha',
              },
              'ol ol ol': {
                listStyleType: 'lower-roman',
              },
              'ol > li': {
                marginLeft: em(8, 14),
              },
              'ul > li': {
                marginLeft: em(8, 14),
              },
              '> ul > li > *:first-child': {
                marginTop: '0px',
              },
              '> ul > li > *:last-child': {
                marginBottom: '0px',
              },
              '> ol > li > *:first-child': {
                marginTop: '0px',
              },
              '> ol > li > *:last-child': {
                marginBottom: '0px',
              },
            },
            {
              '--tw-prose-body': 'var(--color-slate-80)',
              '--tw-prose-bullets': 'var(--color-slate-80',
              '--tw-prose-counters': 'var(--color-slate-80',
              //inverted
              '--tw-prose-invert-headings': 'var(--color-white-100',
              '--tw-prose-invert-body': 'var(--color-white-100',
              '--tw-prose-invert-bullets': 'var(--color-white-100',
              '--tw-prose-invert-counters': 'var(--color-white-100',
            },
          ],
        },
        article: {
          css: {
            h2: {
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-inherit)',
              marginTop: 'var(--spacing-2)',
              marginBottom: 'var(--spacing-2)',
              paddingLeft: 'var(--spacing-layout-lg)',
              paddingRight: 'var(--spacing-layout-lg)',
            },
            h3: {
              paddingLeft: 'var(--spacing-layout-lg)',
              paddingRight: 'var(--spacing-layout-lg)',
            },
            ol: {
              paddingLeft: 'var(--spacing-layout-lg)',
              paddingRight: 'var(--spacing-layout-lg)',
            },
            ul: {
              paddingLeft: 'var(--spacing-layout-lg)',
              paddingRight: 'var(--spacing-layout-lg)',
            },
            'ul ul, ul ol, ol ul, ol ol': {
              marginLeft: '0px',
              marginRight: '0px',
            },
            p: {
              paddingLeft: 'var(--spacing-layout-lg)',
              paddingRight: 'var(--spacing-layout-lg)',
            },
          },
        },
        md: {
          css: {
            fontSize: 'var(--text-md)',
            h2: {
              fontSize: 'var(--text-xl)',
              lineHeight: 'var(--leading-inherit)',
              marginBottom: 'var(--spacing-6)',
            },
            h3: {
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-inherit)',
              marginBottom: 'var(--spacing-6)',
            },
          },
        },
        campaign: {
          css: {
            color: 'var(--color-current)',
            p: {
              textWrap: 'balance',
              marginTop: '0',
              marginBottom: '0',
            },
          },
        },
      }),
    },
  },
}
