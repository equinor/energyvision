const variants = {
  heading: {
    unstyled: '',
    h1: 'text-3xl leading-earthy lg:leading-misty mb-6 lg:mb-12',
    //many places has gap-6 + mb-2 so pb-8
    //Teaser isBigText was set to 2xl...
    //TextBlock isBigText set to 3xl
    // isBigText set to common pattern 2xl now with classname mb-2 leading-cloudy
    h2: `text-xl leading-earthy lg:leading-misty mb-4 lg:mb-8 `,
    h3: `text-lg leading-lofty mt-4 mb-8`, //needs pt and pb?
    h4: 'text-md',
    h5: 'text-md',
    h6: 'text-base',
    h7: 'text-xs leading-earthy',
    xs: 'text-xs leading-earthy',
    sm: 'text-sm',
    base: 'text-base',
    md: 'text-md leading-lofty mb-2',
    lg: 'text-lg leading-lofty mb-4',
    //why is xl for most sections/blocks? is h2 really text-xl and not 2xl?
    xl: 'text-xl leading-earthy mb-6',
    '2xl': 'text-2xl leading-earthy mb-6',
    '3xl': 'text-3xl leading-cloudy',
    '4xl': 'text-4xl leading-cloudy',
    '5xl': 'text-5xl leading-cloudy',
    '8xl':
      'text-5xl lg:text-6xl 2xl:text-8xl leading-cloudy lg:leading-cloudy 2xl:leading-cloudy ',
  },
  display: {
    h1_base: 'text-4xl leading-earthy tracking-display mb-6 lg:mb-12',
    h1_lg: 'text-5xl leading-cloudy tracking-display mb-6 lg:mb-12',
    h1_xl: 'text-6xl leading-cloudy tracking-display mb-6 lg:mb-12',
    h2_base: 'text-3xl leading-earthy tracking-display mb-4 lg:mb-10',
    h2_lg: 'text-4xl leading-cloudy tracking-display mb-4 lg:mb-10',
    h2_xl: 'text-5xl leading-cloudy tracking-display mb-4 lg:mb-10',
  },
  paragraph: {
    caption: '',
    overline: 'text-md pb-2',
    ingress: 'text-md mt-5 mb-5 first:mt-0 last:mb-10',
    eyebrow: 'text-xs font-medium uppercase',
    body: 'my-5 first:mt-0 last:mb-0 [:where(h2+*,h3+*)]:mt-0 text-base',
    small: 'text-sm',
    simple: 'text-base',
  },
  card: {
    eyebrow: 'text-xs font-medium uppercase',
    h2: 'text-lg leading-misty pb-4',
    h3: 'text-md leading-misty pb-4',
    //on cards ingress is hidden and needs webkit-box with line-clamp
    ingress: 'hidden lg:[display:-webkit-box] text-base leading-cloudy',
  },
  article: {
    ingress: `text-md 
    my-6
    :not-only-child:first:mt-0 
    :not-only-child:last:mb-0
    me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg`,
    body: `
    my-5 
     :not-only-child:first:mt-0 
     :not-only-child:last:mb-0 
    me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg
    [:where(h2+*,h3+*)]:mt-0
    text-base`,
    sm: `
    my-5 
     :not-only-child:first:mt-0 
     :not-only-child:last:mb-0 
    me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg
    [:where(h2+*,h3+*)]:mt-0
    text-sm`,
    h2: `me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg mt-2 mb-2 text-lg`,
    h3: `me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg mt-2 text-md `,
    h4: `me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg mt-2 text-base font-medium`,
  },
  marks: {
    highlight: 'text-energy-red-100 dark:text-spruce-wood-100',
  },
  plain: {
    div: '',
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

const { heading, paragraph, marks, plain } = variants

export type QuickTypographyVariants =
  | TypographyTokens['heading']
  | TypographyTokens['paragraph']
  | TypographyTokens['marks']
  | TypographyTokens['plain']

export type DisplayTypographyVariants = TypographyTokens['display']

const quickVariants: QuickTypographyVariants = {
  ...heading,
  ...paragraph,
  ...marks,
  ...plain,
}
type TypographyVariants =
  | keyof TypographyTokens['heading']
  | keyof TypographyTokens['paragraph']
  | keyof TypographyTokens['marks']
  | keyof TypographyTokens['plain']
  | keyof TypographyTokens['card']
  | keyof TypographyTokens['display']

type TypographyGroups = keyof typeof variants

export { variants, quickVariants }
export type { TypographyVariants, TypographyGroups }
