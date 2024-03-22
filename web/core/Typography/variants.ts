const variants = {
  heading: {
    h1: 'text-3xl text-slate-80 dark:text-white-100 leading-earthy font-normal pb-8',
    h2: 'text-2xl text-slate-80 dark:text-white-100  leading-cloudy font-normal pb-8',
    h3: 'text-xl text-slate-80 dark:text-white-100  leading-inherit font-normal pb-8',
    h4: 'text-lg text-slate-80 dark:text-white-100  leading-inherit font-normal pb-6',
    h5: 'text-md text-slate-80 dark:text-white-100  leading-inherit font-normal pb-6',
    h6: 'text-base text-slate-80 dark:text-white-100  leading-inherit font-normal pb-4',
    h7: 'text-xs text-slate-80 dark:text-white-100 leading-earthy font-normal pb-4',
    xs: 'text-xs text-slate-80 dark:text-white-100 leading-earthy font-normal',
    sm: 'text-base leading-inherit font-normal text-slate-80 dark:text-white-100',
    md: 'text-md leading-inherit font-normal text-slate-80 dark:text-white-100',
    lg: 'text-lg leading-inherit font-normal text-slate-80 dark:text-white-100',
    xl: 'text-xl leading-inherit font-normal text-slate-80 dark:text-white-100',
    '2xl': 'text-2xl leading-cloudy font-normal text-slate-80 dark:text-white-100',
    '3xl': 'text-3xl leading-earthy font-normal text-slate-80 dark:text-white-100',
    '4xl': 'text-4xl leading-earthy font-normal text-slate-80 dark:text-white-100',
    '5xl': 'text-5xl leading-earthy font-normal text-slate-80 dark:text-white-100',
  },
  paragraph: {
    ingress: '',
    caption: '',
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
