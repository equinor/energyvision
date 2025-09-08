const variants = {
  heading: {
    unstyled: '',
    h1: 'text-3xl leading-earthy pb-11 my-0',
    //many places has gap-6 + mb-2 so pb-8
    //Teaser isBigText was set to 2xl...
    //TextBlock isBigText set to 3xl
    // isBigText set to common pattern 2xl now with classname mb-2 leading-cloudy
    h2: `text-2xl leading-cloudy pb-8 my-0`,
    h3: `text-xl pb-0 my-0`, //needs pt and pb?
    h4: 'text-lg pb-0',
    h5: 'text-md pb-0',
    h6: 'text-base pb-0',
    h7: 'text-xs leading-earthy pb-0',
    xs: 'text-xs leading-earthy',
    sm: 'text-sm',
    base: 'text-base',
    md: 'text-md',
    lg: 'text-lg',
    //why is xl for most sections/blocks? is h2 really text-xl and not 2xl?
    xl: 'text-xl',
    '2xl': 'text-2xl leading-cloudy',
    '3xl': 'text-3xl leading-earthy',
    '4xl': 'text-4xl leading-cloudy',
    '5xl': 'text-5xl leading-cloudy',
    '8xl': 'text-5xl lg:text-6xl 2xl:text-8xl leading-cloudy lg:leading-cloudy 2xl:leading-cloudy ',
  },
  paragraph: {
    caption: '',
    overline: 'text-md pb-2',
    ingress: 'text-md mt-10 mb-16',
    eyebrow: 'text-xs font-medium uppercase',
    body: 'text-base',
    small: 'text-sm',
  },
  article: {
    body: 'text-base',
    h2: `mt-2 mb-2 text-lg`,
    h3: `mt-2 text-md `,
    h4: `mt-2 text-base font-medium`,
  },
}
/*   ingress: {
    //mt-10 mb-16 in news
    default: 'text-md mt-10 mb-16',
    short: 'text-md mt-10 mb-16',
  }, */
export type TypographyTokens = {
  [P1 in keyof typeof variants]: {
    [P2 in keyof (typeof variants)[P1]]: string
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
