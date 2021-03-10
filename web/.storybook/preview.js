import { GlobalStyle } from '../styles/globalStyles'

// Global decorator to apply the styles to all stories
export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  viewport: {
    viewports: {
      fullHD: {
        name: 'Full HD',
        styles: {
          width: '1920px',
          height: '1080px',
        },
        type: 'desktop',
      },
      1536864: {
        name: '1536 x 864',
        styles: {
          width: '1536px',
          height: '864px',
        },
        type: 'desktop',
      },
      1400900: {
        name: '1400 x 900',
        styles: {
          width: '1400px',
          height: '900px',
        },
        type: 'desktop',
      },
      1366768: {
        name: '1366 x 768',
        styles: {
          width: '1366px',
          height: '768px',
        },
        type: 'desktop',
      },
      1280720: {
        name: '1280 x 720',
        styles: {
          width: '1280px',
          height: '720px',
        },
        type: 'desktop',
      },
      1280800: {
        name: '1280 x 800',
        styles: {
          width: '1280px',
          height: '800px',
        },
        type: 'desktop',
      },
      800600: {
        name: '800 x 600',
        styles: {
          width: '800px',
          height: '600px',
        },
        type: 'desktop',
      },
      414896: {
        name: '414 x 896',
        styles: {
          width: '414px',
          height: '896px',
        },
        type: 'mobile',
      },
      375812: {
        name: '375 x 812',
        styles: {
          width: '375px',
          height: '812px',
        },
        type: 'mobile',
      },
      375667: {
        name: '375 x 667',
        styles: {
          width: '375px',
          height: '667px',
        },
        type: 'mobile',
      },
    },
  },
}
