/**
 * DEVELOPMENT:
 * For y-axis spacing use margin
 *
 * because CSS Margin Collapsing; where the top/bottom margins of a child element "leak" out
 * of the parent container if there is no border or padding separating them. As a result,
 * the parent does not include that margin space in its total height.
 *
 * With text blocks it works nicely when there are previous with margin bottom and
 * the next with margin top, these two will then be collapsed and not doubled.
 *
 * If you need the parent to take the margin into consideration e.g. for color background,
 *  use overflow-hidden. Adding overflow: hidden (or auto) to the parent container forces it to create
 * a new Block Formatting Context (BFC). This forces the parent to contain its children's margins.
 *
 *
 * text-balance: Best for headings. It balances the number of characters on each line to avoid "widows" (single words on a line).
 * text-wrap: pretty: Best for body paragraphs. It uses a slower algorithm to ensure a more visually pleasing layout and prevent orphans.
 */
const variants = {
  heading: {
    unstyled: '',
    h1: 'text-3xl leading-earthy lg:leading-misty pt-4 mb-6 lg:mb-12 text-balance',
    h2: `text-xl leading-earthy lg:leading-misty mb-4 lg:mb-8 text-balance`,
    h3: `text-lg leading-lofty mt-4 text-balance`,
    h4: 'text-md mt-2 mb-4 text-balance',
    h5: 'text-md text-balance',
    h6: 'text-base text-balance',
    h7: 'text-xs leading-earthy text-balance',
    xs: 'text-xs leading-earthy text-balance',
    sm: 'text-sm text-balance',
    base: 'text-base text-balance',
    md: 'text-md leading-lofty mb-2 text-balance',
    lg: 'text-lg leading-lofty mb-4 text-balance',
    xl: 'text-xl leading-earthy mb-6 text-balance',
    '2xl': 'text-2xl leading-earthy mb-6 text-balance',
    '3xl': 'text-3xl leading-cloudy text-balance',
    '4xl': 'text-4xl leading-cloudy text-balance',
    '5xl': 'text-5xl leading-cloudy text-balance',
    '8xl':
      'text-5xl lg:text-6xl 2xl:text-8xl leading-cloudy lg:leading-cloudy 2xl:leading-cloudy text-balance',
  },
  display: {
    h1_base:
      'text-4xl leading-earthy tracking-display mb-6 lg:mb-12 text-balance',
    h1_lg:
      'text-5xl leading-cloudy tracking-display mb-6 lg:mb-12 text-balance',
    h1_xl:
      'text-6xl leading-cloudy tracking-display mb-6 lg:mb-12 text-balance',
    h2_base:
      'text-3xl leading-earthy tracking-display mb-4 lg:mb-10 text-balance',
    h2_lg:
      'text-4xl leading-cloudy tracking-display mb-4 lg:mb-10 text-balance',
    h2_xl:
      'text-5xl leading-cloudy tracking-display mb-4 lg:mb-10 text-balance',
  },
  paragraph: {
    caption: '',
    overline: 'text-md mb-2 text-pretty',
    ingress: 'text-md mt-5 mb-5 first:mt-0 last:mb-6 text-pretty', //last:mb-10
    eyebrow: 'text-xs font-medium uppercase text-pretty',
    body: 'my-5 first:mt-0 last:mb-0 [:where(h2+*,h3+*)]:mt-0 text-base text-pretty',
    small:
      'text-sm my-5 first:mt-0 last:mb-0 [:where(h2+*,h3+*)]:mt-0 text-pretty',
    simple: 'text-base text-pretty',
  },
  card: {
    eyebrow: 'text-xs font-medium uppercase text-balance',
    h2: 'text-lg leading-misty mb-4 text-balance',
    h3: 'text-md leading-misty mb-4 text-balance',
    //on cards ingress is hidden for mobile and needs webkit-box with line-clamp
    ingress:
      'hidden lg:[display:-webkit-box] text-sm leading-cloudy mt-4 text-pretty',
  },
  article: {
    ingress: `text-pretty text-md 
    my-6
    :not-only-child:first:mt-0 
    :not-only-child:last:mb-0
    me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg`,
    body: `
    text-pretty
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
    text-pretty
    my-5 
     :not-only-child:first:mt-0 
     :not-only-child:last:mb-0 
    me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg
    [:where(h2+*,h3+*)]:mt-0
    text-sm`,
    small: `
    text-pretty
    my-5 
     :not-only-child:first:mt-0 
     :not-only-child:last:mb-0 
    me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg
    [:where(h2+*,h3+*)]:mt-0
    text-sm`,
    h2: `
    text-balance me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg mt-2 mb-2 text-lg`,
    h3: `text-balance me-layout-sm
    lg:me-layout-lg
    ms-layout-sm
    lg:ms-layout-lg mt-2 text-md `,
    h4: `text-balance me-layout-sm
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
