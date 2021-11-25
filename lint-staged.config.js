module.exports = {
  // Run type-check on changes to TypeScript files
  '**/*.ts?(x)': () => 'pnpm web type-check',
  // '**/*.ts?(x)': () => 'tsc -p tsconfig.base.json --noEmit',
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': (filenames) => `pnpm lint . ${filenames.join(' ')}`,
}
