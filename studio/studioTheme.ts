import type { BuildThemeOptions } from '@sanity/themer';

// Sanity's default accent, text, and background colors are used; only contrast is customised
export const studioThemeOptions = {
  light: {
    contrast: 85,
  },
  dark: {
    contrast: 85,
  },
} satisfies BuildThemeOptions;
