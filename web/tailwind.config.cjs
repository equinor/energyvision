module.exports = {
  content: [
    './components/**/*.{js,ts,tsx}',
    './pageComponents/**/*.{js,ts,tsx}',
    './core/**/*.{js,ts,tsx}',
    './sections/**/*.{js,ts,tsx}',
    './templates/**/*.{js,ts,tsx}',
    './icons/**/*.{js,ts,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './templates/**/*.{js,ts,tsx}',
  ],
  /*
  Now instead of dark:{class} classes being applied based on prefers-color-scheme, 
  they will be applied whenever the dark class is present earlier in the HTML tree.
  inverted -> dark
  NB: TwMerge configuration must be extended to properly merge custom theme utilities. 
  Less pain to use Tailwind eqvivalent. 
  */
  darkMode: 'selector',
  presets: [require('@equinor/energyvision-tailwind-preset')],
}
