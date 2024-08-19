const props = {
  '--studio-white': '#fff',
  '--studio-black': '#1a1a1a',
  '--studio-blue': '#4285f4',
  '--studio-red': '#db4437',
  '--studio-yellow': '#f4b400',
  '--studio-green': '#0f9d58',
}

export const partialStudioTheme = {
  /* Base theme colors */
  '--black': props['--studio-black'],
  '--white': props['--studio-white'],

  '--gray': '#666',
  '--gray-base': '#666',

  '--component-bg': props['--studio-white'],
  '--component-text-color': props['--studio-black'],

  /* Brand */
  '--brand-primary': props['--studio-blue'],

  // Default button
  '--default-button-color': props['--studio-blue'],
  '--default-button-primary-color': props['--studio-blue'],
  '--default-button-success-color': props['--studio-green'],
  '--default-button-warning-color': props['--studio-yellow'],
  '--default-button-danger-color': props['--studio-red'],

  /* State */
  '--state-info-color': props['--studio-blue'],
  '--state-success-color': props['--studio-green'],
  '--state-warning-color': props['--studio-yellow'],
  '--state-danger-color': props['--studio-red'],

  /* Navbar */
  '--main-navigation-color': props['--studio-black'],
  '--main-navigation-color--inverted': props['--studio-white'],

  '--focus-color': props['--studio-blue'],
}
