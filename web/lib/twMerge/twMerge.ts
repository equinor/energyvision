/* import { clsx, type ClassValue } from 'clsx';
import { createTailwindMerge, getDefaultConfig } from 'tailwind-merge';

const customTwMerge = createTailwindMerge(() => {
  const config = getDefaultConfig();
  config.classGroups['font-size'] = [
    {
      text: ['font-primary', 'font-lg'],
    },
  ];
  return config;
});
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
} */

import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ['layout-lg', 'layout-sm', 'layout-md'],
    },
  },
})
