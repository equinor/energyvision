export default {
  '*.{ts,js,tsx,jsx}': (filenames) => `eslint ${filenames.join(' ')}`, // Need to explicitly pass staged files even with default non-function syntax, not sure why
  'web/**/*.{ts,tsx}': () => 'pnpm web type-check',
  'web/components/**/*.{ts,js,tsx,jsx}': () => 'pnpm web test',
  'search/**/*': () => 'pnpm search-indexers test',
}
