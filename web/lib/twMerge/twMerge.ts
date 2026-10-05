import { extendTailwindMerge } from 'tailwind-merge';

export const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [
        'layout-lg',
        'layout-sm',
        'layout-md',
        'content',
        'fullwidth',
        'text',
      ],
    },
  },
});
