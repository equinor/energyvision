const variants = {
  heading: {
    h1: 'text-3xl leading-earthy font-normal pb-8',
    h2: 'text-2xl leading-cloudy font-normal pb-8',
    h3: 'text-xl leading-inherit font-normal pb-8',
    h4: 'text-lg leading-inherit font-normal pb-6',
    h5: 'text-md leading-inherit font-normal pb-6',
    h6: 'text-base leading-inherit font-normal pb-4',
    h7: 'text-xs leading-earthy font-normal pb-4',
    xs: 'text-xs leading-earthy font-normal',
    sm: 'text-base leading-inherit font-normal',
    md: 'text-md leading-inherit font-normal',
    lg: 'text-lg leading-inherit font-normal',
    xl: 'text-xl leading-inherit font-normal',
    '2xl': 'text-2xl leading-cloudy font-normal',
    '3xl': 'text-3xl leading-earthy font-normal',
    '4xl': 'text-4xl leading-earthy font-normal',
    '5xl': 'text-5xl leading-earthy font-normal',
  },
  paragraph: {
    ingress: '',
    caption: '',
    body: 'text-base font-normal',
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
