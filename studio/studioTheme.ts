import type { BuildThemeOptions } from '@sanity/themer';

export const studioThemeOptions = {
  light: {
    accent: '#007079',
    text: '#51606c',
    background: '#ffffff',
    contrast: 85,
  },
  dark: {
    accent: '#007079',
    text: '#51606c',
    background: '#182630',
    contrast: 85,
  },
} satisfies BuildThemeOptions;
