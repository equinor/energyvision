import type { BuildThemeOptions } from '@sanity/themer';

// Accent is left at the Sanity default (blue/500); only text and backgrounds are customised
export const studioThemeOptions = {
  light: {
    contrast: 85,
  },
  dark: {
    contrast: 85,
  },
} satisfies BuildThemeOptions;
