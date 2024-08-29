const variants = {
  heading: {
    h1: 'text-slate-80 dark:text-white-100 text-3xl leading-earthy font-normal pb-11 my-0',
    h2: 'text-slate-80 dark:text-white-100 text-2xl leading-cloudy font-normal pb-8 my-0',
    h3: 'text-slate-80 dark:text-white-100 text-xl leading-inherit font-normal pb-0 my-0',
    h4: 'text-slate-80 dark:text-white-100 text-lg leading-inherit font-normal pb-0',
    h5: 'text-slate-80 dark:text-white-100 text-md leading-inherit font-normal pb-0',
    h6: 'text-slate-80 dark:text-white-100 text-base leading-inherit font-normal pb-0',
    h7: 'text-slate-80 dark:text-white-100 text-xs leading-earthy font-normal pb-0',
    xs: 'text-slate-80 dark:text-white-100 text-xs leading-earthy font-normal',
    sm: 'text-slate-80 dark:text-white-100 text-sm leading-inherit font-normal',
    base: 'text-slate-80 dark:text-white-100 text-base leading-inherit font-normal',
    md: 'text-slate-80 dark:text-white-100 text-md leading-inherit font-normal',
    lg: 'text-slate-80 dark:text-white-100 text-lg leading-inherit font-normal',
    xl: 'text-slate-80 dark:text-white-100 text-xl leading-inherit font-normal',
    '2xl': 'text-slate-80 dark:text-white-100 text-2xl leading-cloudy font-normal',
    '3xl': 'text-slate-80 dark:text-white-100 text-3xl leading-earthy font-normal',
    '4xl': 'text-slate-80 dark:text-white-100 text-4xl leading-cloudy font-normal',
    '5xl': 'text-slate-80 dark:text-white-100 text-5xl leading-cloudy font-normal',
    '8xl':
      'text-slate-80 dark:text-white-100 text-5xl lg:text-6xl 2xl:text-8xl leading-cloudy lg:leading-cloudy 2xl:leading-cloudy font-normal',
  },
  paragraph: {
    ingress: '',
    caption: '',
    overline: 'text-md text-slate-80 dark:text-white-100',
    body: 'text-base font-normal text-slate-80 dark:text-white-100',
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
type TypographyVariants = keyof TypographyTokens['heading'] | keyof TypographyTokens['paragraph']

type TypographyGroups = keyof typeof variants

export { variants, quickVariants }
export type { TypographyVariants, TypographyGroups }
