import type {
  ConditionalPropertyCallbackContext,
  CurrentUser,
  PortableTextBlock,
  Rule,
  ValidationContext,
} from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import { HeroTypes } from '../../HeroTypes'
import type { ImageWithAltAndCaption } from '../../objects/imageWithAltAndCaption'
import singleItemArray from '../../objects/singleItemArray'
import { defaultBannerBigTitletStyle, fiftyFiftyBigTitleStyle } from './bigTitleStyles'
import HeroTypeInput from './HeroTypeInput'

const bigTitleRoles = ['administrator', 'developer', 'editor'] // allow editor until designer role is created.

type DocumentType = { parent: Hero; currentUser: CurrentUser }
type Hero = {
  heroType?: HeroTypes
  isBigTitle?: boolean
}

const titleContentType = configureTitleBlockContent()

const ingressContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

const isBigTitle = {
  title: 'Big title',
  name: 'isBigTitle',
  type: 'boolean',
  fieldset: 'header',
  hidden: ({ parent }: DocumentType) => {
    return !(parent?.heroType === HeroTypes.FIFTY_FIFTY || parent?.heroType === HeroTypes.DEFAULT)
  },
  readOnly: ({ currentUser }: DocumentType) => {
    return !currentUser.roles.find(({ name }) => bigTitleRoles.includes(name))
  },
}

const heroBigTitleDefault = {
  name: 'heroBigTitleDefault',
  title: 'Hero Title',
  type: 'array',
  fieldset: 'header',
  of: [
    configureTitleBlockContent({
      highlight: true,
      extendedStyles: defaultBannerBigTitletStyle,
    }),
  ],
  hidden: ({ parent }: DocumentType) => !parent.isBigTitle || parent.heroType !== HeroTypes.DEFAULT,
  validation: (Rule: Rule) =>
    Rule.custom((value: PortableTextBlock[], ctx: ValidationContext) =>
      (!value || blocksToText(value)?.length === 0) &&
      (ctx.parent as Hero)?.isBigTitle &&
      (ctx.parent as Hero)?.heroType === HeroTypes.DEFAULT
        ? 'Title is required'
        : true,
    ),
  readOnly: ({ currentUser }: DocumentType) => {
    return !currentUser.roles.find(({ name }) => bigTitleRoles.includes(name))
  },
}

const heroBigTitleFiftyFifty = {
  name: 'heroBigTitleFiftyFifty',
  title: 'Hero Title',
  type: 'array',
  fieldset: 'header',
  of: [configureTitleBlockContent({ extendedStyles: fiftyFiftyBigTitleStyle })],
  hidden: ({ parent }: DocumentType) => !parent.isBigTitle || parent.heroType !== HeroTypes.FIFTY_FIFTY,
  validation: (Rule: Rule) =>
    Rule.custom((value: PortableTextBlock[], ctx: ValidationContext) =>
      !value && (ctx.parent as Hero)?.isBigTitle && (ctx.parent as Hero)?.heroType === HeroTypes.FIFTY_FIFTY
        ? 'Title is required'
        : true,
    ),
  readOnly: ({ currentUser }: DocumentType) => {
    return !currentUser.roles.find(({ name }) => bigTitleRoles.includes(name))
  },
}

const title = {
  name: 'title',
  type: 'array',
  title: 'Title',
  components: {
    input: CompactBlockEditor,
  },
  of: [titleContentType],
  fieldset: 'header',
  validation: (Rule: Rule) => Rule.required(),
}

const heroType = {
  title: 'Type',
  name: 'heroType',
  type: 'string',
  options: {
    list: [
      { title: 'Default', value: HeroTypes.DEFAULT },
      { title: 'Full Image', value: HeroTypes.FULL_WIDTH_IMAGE },
      { title: '50-50 Banner', value: HeroTypes.FIFTY_FIFTY },
      { title: 'Looping Video', value: HeroTypes.LOOPING_VIDEO },
      {
        title: 'Background image/white with title',
        value: HeroTypes.BACKGROUND_IMAGE,
      },
    ].filter((e) => e),
  },
  components: {
    input: HeroTypeInput,
  },
  initialValue: 'default',
  fieldset: 'header',
}

const heroRatio = {
  title: 'Hero image ratio',
  name: 'heroRatio',
  type: 'string',
  options: {
    list: [
      { title: 'Tall', value: 'tall' },
      { title: '2:1(deprecated)', value: '0.5' },
      { title: 'Narrow', value: 'narrow' },
    ],
  },
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.FULL_WIDTH_IMAGE
  },
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as unknown as DocumentType
      if (parent?.heroType === HeroTypes.FULL_WIDTH_IMAGE && !value) return 'Field is required'
      return true
    }),
  initialValue: 'narrow',
  fieldset: 'header',
}

const heroTitle = {
  name: 'heroTitle',
  type: 'array',
  title: 'Hero Title',
  components: {
    input: CompactBlockEditor,
  },
  of: [titleContentType],
  fieldset: 'header',
  hidden: ({ parent }: DocumentType) => {
    return (
      parent?.heroType !== HeroTypes.FIFTY_FIFTY || (parent?.heroType === HeroTypes.FIFTY_FIFTY && parent.isBigTitle)
    )
  },
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as unknown as DocumentType
      if (parent?.heroType === HeroTypes.FIFTY_FIFTY && !value && !parent.isBigTitle) return 'Field is required'
      return true
    }),
}

const heroIngress = {
  title: 'Hero Ingress',
  name: 'heroIngress',
  type: 'array',
  of: [ingressContentType],
  hidden: ({ parent }: DocumentType) => {
    return (
      parent?.heroType !== HeroTypes.FIFTY_FIFTY || (parent?.heroType === HeroTypes.FIFTY_FIFTY && parent.isBigTitle)
    )
  },
  fieldset: 'header',
}

const heroLink = singleItemArray({
  name: 'heroLink',
  title: 'Link',
  description: 'Select link to display',
  type: 'array',
  of: [{ type: 'linkSelector', title: 'Link' }],
  hidden: ({ parent }: ConditionalPropertyCallbackContext) => {
    return (
      parent?.heroType !== HeroTypes.FIFTY_FIFTY || (parent?.heroType === HeroTypes.FIFTY_FIFTY && parent.isBigTitle)
    )
  },
})

const background = {
  title: 'Hero Background',
  description: 'Pick a colour for the background. Default is white.',
  name: 'heroBackground',
  type: 'colorlist',
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.FIFTY_FIFTY
  },
  fieldset: 'header',
}

const heroImage = {
  title: 'Hero image',
  name: 'heroFigure',
  type: 'imageWithAltAndCaption',
  description: 'Caption and credit is not shown for 50-50 banner.',
  validation: (Rule: Rule) =>
    Rule.custom((value: ImageWithAltAndCaption, context: ValidationContext) => {
      const { parent } = context as unknown as DocumentType
      //@ts-ignore:add _type?
      if (
        (parent?.heroType === HeroTypes.FIFTY_FIFTY || parent?.heroType === HeroTypes.FULL_WIDTH_IMAGE) &&
        !value.image.asset
      )
        return 'Field is required'
      return true
    }),
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType === HeroTypes.LOOPING_VIDEO
  },
  fieldset: 'header',
}
const heroMobileImage = {
  title: 'Hero mobile image',
  name: 'heroMobileImage',
  type: 'imageWithAlt',
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.BACKGROUND_IMAGE
  },
  fieldset: 'header',
}

const heroLoopingVideo = {
  title: 'Video',
  name: 'heroLoopingVideo',
  type: 'reference',
  to: [{ type: 'videoFile' }],
  fieldset: 'header',
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as unknown as DocumentType
      if (parent?.heroType === HeroTypes.LOOPING_VIDEO && !value) return 'Field is required'
      return true
    }),
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.LOOPING_VIDEO
  },
}

const heroLoopingVideoRatio = {
  title: 'Video ratio',
  name: 'heroLoopingVideoRatio',
  type: 'string',
  options: {
    list: [
      { title: '1:2', value: '1:2' },
      { title: 'Narrow', value: 'narrow' },
    ],
    initialValue: '1:2',
  },
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.LOOPING_VIDEO
  },
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as unknown as DocumentType
      if (parent?.heroType === HeroTypes.LOOPING_VIDEO && !value) return 'Field is required'
      return true
    }),
  fieldset: 'header',
}

const backgroundGradient = {
  title: 'Background Gradient',
  name: 'heroBackgroundGradient',
  type: 'string',
  fieldset: 'header',
  description: 'Optional dark or light semi-transparent gradient over background image.',
  initialValue: 'none', // default
  options: {
    list: [
      { title: 'None', value: 'none' },
      { title: 'Dark', value: 'dark' },
      { title: 'Light', value: 'light' },
    ],
  },
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.BACKGROUND_IMAGE
  },
}
const useCenterBlur = {
  title: 'Blur center',
  name: 'useBlurCenter',
  type: 'boolean',
  fieldset: 'header',
  description: 'Will blur center background behind text',
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.BACKGROUND_IMAGE
  },
}

const applyDisplayText = {
  title: 'Apply display text variant',
  name: 'displayTextVariant',
  type: 'string',
  fieldset: 'header',
  description: 'Sets a display variant on title',
  initialValue: 'none', // default
  options: {
    list: [
      { title: 'None', value: 'none' },
      { title: 'Base', value: 'base' },
      { title: 'Large', value: 'lg' },
      { title: 'Extra large', value: 'xl' },
    ],
  },
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.BACKGROUND_IMAGE
  },
}
const layoutGrid = {
  title: 'Layout grid',
  name: 'layoutGrid',
  type: 'string',
  description: 'Select content grid column',
  options: {
    list: [
      { title: 'Third outer', value: 'sm' },
      { title: 'Second outer', value: 'md' },
      { title: 'Innermost', value: 'lg' },
    ],
  },
  initialValue: 'lg',
  fieldset: 'header',
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.BACKGROUND_IMAGE
  },
}

const alignContentY = {
  title: 'Vertical content alignment',
  name: 'alignContentY',
  type: 'string',
  fieldset: 'header',
  description: 'Align content vertical',
  initialValue: 'center', // default
  options: {
    list: [
      { title: 'Top', value: 'top' },
      { title: 'Center', value: 'center' },
      { title: 'Bottom', value: 'bottom' },
    ],
  },
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.BACKGROUND_IMAGE
  },
}

const useBrandTheme = {
  title: 'Apply red brand text color',
  name: 'heroUseBrandTheme',
  type: 'boolean',
  fieldset: 'header',
  description: 'Ensure enough contrast between text and image.If no hero image set,background will be white',
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.BACKGROUND_IMAGE
  },
}

export default [
  title,
  isBigTitle,
  heroType,
  applyDisplayText,
  useBrandTheme,
  layoutGrid,
  heroRatio,
  heroTitle,
  heroBigTitleDefault,
  heroBigTitleFiftyFifty,
  heroIngress,
  heroLink,
  alignContentY,
  background,
  heroImage,
  heroMobileImage,
  heroLoopingVideo,
  heroLoopingVideoRatio,
  backgroundGradient,
  useCenterBlur,
]
