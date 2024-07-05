import { extendTailwindMerge } from 'tailwind-merge'

const envisTwMerge = extendTailwindMerge({
  extend: {
    // ↓ Add values to existing theme scale or create a new one
    theme: {
      padding: ['page-content', 'layout-sm', 'layout-md', 'layout-lg'],
      margin: ['page-content', 'layout-sm', 'layout-md', 'layout-lg'],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      maxWidth: ['viewport'],
      minWidth: ['viewport'],
      size: ['arrow-right'],
      lineHeight: ['text', 'earthy', 'misty', 'cloudy', 'planetary', 'inherit'],
    },
  },
})

export default envisTwMerge
