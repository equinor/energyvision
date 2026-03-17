const variants = {
  heading: {
    h1: ' text-3xl leading-earthy font-normal pb-11 my-0',
    h2: ' text-2xl leading-cloudy font-normal pb-8 my-0',
    h3: ' text-xl leading-inherit font-normal pb-0 my-0',
    h4: ' text-lg leading-inherit font-normal pb-0',
    h5: ' text-md leading-inherit font-normal pb-0',
    h6: ' text-base leading-inherit font-normal pb-0',
    h7: ' text-xs leading-earthy font-normal pb-0',
    xs: ' text-xs leading-earthy font-normal',
    sm: ' text-sm leading-inherit font-normal',
    base: ' text-base leading-inherit font-normal',
    md: ' text-md leading-inherit font-normal',
    lg: ' text-lg leading-inherit font-normal',
    xl: ' text-xl leading-inherit font-normal',
    '2xl': ' text-2xl leading-cloudy font-normal',
    '3xl': ' text-3xl leading-earthy font-normal',
    '4xl': ' text-4xl leading-cloudy font-normal',
    '5xl': ' text-5xl leading-cloudy font-normal',
    '8xl': ' text-5xl lg:text-6xl 2xl:text-8xl leading-cloudy lg:leading-cloudy 2xl:leading-cloudy font-normal',
  },
  display: {
    h1_base: 'text-4xl leading-tight tracking-[var(--tracking-display)] pb-6 lg:pb-12',
    h1_lg: 'text-5xl leading-tight tracking-[var(--tracking-display)] pb-6 lg:pb-12',
    h1_xl: 'text-6xl leading-tight tracking-[var(--tracking-display)] pb-6 lg:pb-12',
    h2_base: 'text-3xl leading-tight tracking-[var(--tracking-display)] pb-4 lg:pb-10',
    h2_lg: 'text-4xl leading-tight tracking-[var(--tracking-display)] pb-4 lg:pb-10',
    h2_xl: 'text-5xl leading-tight tracking-[var(--tracking-display)] pb-4 lg:pb-10',
  },
  paragraph: {
    ingress: '',
    caption: '',
    overline: 'text-md ',
    body: 'text-base font-normal ',
  },
  plain: {
    div: '',
  },
}
export type TypographyTokens = {
  [P1 in keyof typeof variants]: {
    [P2 in keyof typeof variants[P1]]: string
  }
}

const { heading, paragraph } = variants

export type QuickTypographyVariants = TypographyTokens['heading'] | TypographyTokens['paragraph']

const quickVariants: QuickTypographyVariants = {
  ...heading,
  ...paragraph,
}
type TypographyVariants =
  | keyof TypographyTokens['heading']
  | keyof TypographyTokens['paragraph']
  | keyof TypographyTokens['plain']
  | keyof TypographyTokens['display']

type TypographyGroups = keyof typeof variants

export { variants, quickVariants }
export type { TypographyVariants, TypographyGroups }
