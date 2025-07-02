import { type Config } from "prettier";

export default {
  arrowParens: 'always',
  printWidth: 120,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  semi: false,
  endOfLine: 'lf',
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./app/globals.css"
} as const satisfies Config;