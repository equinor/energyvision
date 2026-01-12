import type {
  ConditionalPropertyCallbackContext,
  CurrentUser,
  FieldProps,
  PortableTextBlock,
  Rule,
  ValidationContext,
} from 'sanity'
import { isAllowed } from '@/helpers/isAllowed'
import blocksToText from '../../../helpers/blocksToText'
import { CompactBlockEditor } from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'
import type { ImageWithAltAndCaption } from '../../objects/imageWithAltAndCaption'
import singleItemArray from '../../objects/singleItemArray'
import HeroTypeInput from './HeroTypeInput'

const bigTitleRoles = ['administrator', 'developer', 'editor'] // allow editor until designer role is created.

export enum HeroTypes {
  DEFAULT = 'default',
  FIFTY_FIFTY = 'fiftyFifty',
  FULL_WIDTH_IMAGE = 'fullWidthImage',
  LOOPING_VIDEO = 'loopingVideo',
  NO_HERO = 'noHero',
  //MagazineIndexPage
  BACKGROUND_IMAGE = 'backgroundImage',
}

type DocumentType = { parent: Hero; currentUser: CurrentUser }
type Hero = {
  heroType?: HeroTypes
  isBigTitle?: boolean
  heroLoopingVideoRatio?: 'tall' | 'narrow' | '0.5'
}

const isBigTitle = {
  title: 'Show the title as big text',
  name: 'isBigTitle',
  type: 'boolean',
  fieldset: 'hero',
  hidden: ({ parent }: DocumentType) => {
    return !(
      parent?.heroType === HeroTypes.FIFTY_FIFTY ||
      parent?.heroType === HeroTypes.DEFAULT
    )
  },
  readOnly: ({ currentUser }: DocumentType) => {
    return !currentUser.roles.find(({ name }) => bigTitleRoles.includes(name))
  },
}

const heroBigTitleDefault = {
  name: 'heroBigTitleDefault',
  title: 'Hero Title',
  type: 'array',
  of: [
    configureBlockContent({
      variant: 'withXLTitle',
      highlight: true,
    }),
  ],
  hidden: ({ parent }: DocumentType) =>
    !parent.isBigTitle || parent.heroType !== HeroTypes.DEFAULT,
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
  of: [configureBlockContent({ variant: 'withLargerTitle' })],
  hidden: ({ parent }: DocumentType) =>
    !parent.isBigTitle || parent.heroType !== HeroTypes.FIFTY_FIFTY,
  validation: (Rule: Rule) =>
    Rule.custom((value: PortableTextBlock[], ctx: ValidationContext) =>
      !value &&
      (ctx.parent as Hero)?.isBigTitle &&
      (ctx.parent as Hero)?.heroType === HeroTypes.FIFTY_FIFTY
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
  of: [configureBlockContent({ variant: 'title' })],
  validation: (Rule: Rule) => Rule.required(),
}

const heroType = {
  title: 'Type of hero',
  name: 'heroType',
  type: 'string',
  options: {
    list: [
      {
        title: 'Centered Image (default)',
        value: HeroTypes.DEFAULT,
      },
      {
        title: 'Fullwidth image',
        value: HeroTypes.FULL_WIDTH_IMAGE,
      },
      {
        title: 'Fullwidth 50/50 text and image',
        value: HeroTypes.FIFTY_FIFTY,
      },
      {
        title: 'Fullwidth looping video',
        value: HeroTypes.LOOPING_VIDEO,
      },
      {
        title: 'No hero (title+image hidden, first section content as hero)',
        value: HeroTypes.NO_HERO,
      },
      {
        title: 'Title and/or ingress on background image',
        value: HeroTypes.BACKGROUND_IMAGE,
      }
    ].filter(e => e),
  },
  components: {
    input: HeroTypeInput,
  },
  initialValue: 'default',
}

const heroRatio = {
  title: 'Hero image ratio',
  name: 'heroRatio',
  type: 'string',
  fieldset: 'hero',
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
      if (parent?.heroType === HeroTypes.FULL_WIDTH_IMAGE && !value)
        return 'Field is required'
      return true
    }),
  initialValue: 'narrow',
}

const heroTitle = {
  name: 'heroTitle',
  type: 'array',
  title: 'Hero title',
  fieldset: 'hero',
  components: {
    field: (props: FieldProps) => {
      console.log('field props', props)
      return props.renderDefault({ ...props })
    },
    input: CompactBlockEditor,
  },
  of: [
    configureBlockContent({
      variant: 'title',
    }),
  ],
  hidden: ({ parent }: DocumentType) => {
    return (
      parent?.heroType !== HeroTypes.FIFTY_FIFTY ||
      (parent?.heroType === HeroTypes.FIFTY_FIFTY && parent.isBigTitle)
    )
  },
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as unknown as DocumentType
      if (
        parent?.heroType === HeroTypes.FIFTY_FIFTY &&
        !value &&
        !parent.isBigTitle
      )
        return 'Field is required'
      return true
    }),
}

const heroIngress = {
  title: 'Hero ingress',
  name: 'heroIngress',
  type: 'array',
  fieldset: 'hero',
  of: [configureBlockContent({ variant: 'ingress' })],
  hidden: ({ parent }: DocumentType) => {
    return (
      parent?.heroType !== HeroTypes.FIFTY_FIFTY ||
      (parent?.heroType === HeroTypes.FIFTY_FIFTY && parent.isBigTitle)
    )
  },
}

const backgroundGradient = {
  title: 'Background Gradient',
  name: 'backgroundGradient',
  type: 'string',
  description: 'Controls the gradient over semi-transparent background image.',
  initialValue: 'none', // default
  options: {
    list: [
      { title: 'None', value: 'none' },
      { title: 'Dark', value: 'dark' },
      { title: 'Light', value: 'light' },
    ],
  },
  validation: (Rule: Rule) => Rule.required(),
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.BACKGROUND_IMAGE
  }
}

const heroLink = singleItemArray({
  name: 'heroLink',
  title: 'Hero link',
  description: 'Select link to display in hero text',
  type: 'array',
  of: [{ type: 'linkSelector', title: 'Link' }],
  hidden: ({ value, parent }: ConditionalPropertyCallbackContext) => {
    return (
      parent?.heroType !== HeroTypes.FIFTY_FIFTY ||
      (parent?.heroType === HeroTypes.FIFTY_FIFTY && parent.isBigTitle) ||
      (parent?.heroType === HeroTypes.FIFTY_FIFTY && !value)
    )
  },
})
const heroLinkV2 = {
  name: 'heroLinkV2',
  title: 'Hero link',
  description: 'Select link to display in hero text',
  type: 'linkSelector',
  fieldset: 'hero',
  hidden: ({ parent }: ConditionalPropertyCallbackContext) => {
    return (
      parent?.heroType !== HeroTypes.FIFTY_FIFTY ||
      (parent?.heroType === HeroTypes.FIFTY_FIFTY && parent.isBigTitle)
    )
  },
}

const background = {
  title: 'Hero background',
  description: 'Pick a colour for the background. Default is white.',
  name: 'heroBackground',
  type: 'colorlist',
  fieldset: 'hero',
  hidden: ({ parent, currentUser }: DocumentType) => {
    return !(
      (parent?.heroType === HeroTypes.DEFAULT &&
        isAllowed(currentUser.roles)) ||
      parent?.heroType === HeroTypes.FIFTY_FIFTY
    )
  },
}

const heroImage = {
  title: 'Hero image',
  name: 'heroFigure',
  type: 'imageWithAltAndCaption',
  fieldset: 'hero',
  description:
    'Only used for SEO if hero type is No hero. Caption and credit is not shown for 50/50 Text and image.',
  validation: (Rule: Rule) =>
    Rule.custom((value: ImageWithAltAndCaption, context: ValidationContext) => {
      const { parent } = context as unknown as DocumentType
      //@ts-ignore:add _type?
      if (
        (parent?.heroType === HeroTypes.FIFTY_FIFTY ||
          //@ts-ignore:add _type?
          (parent?._type !== 'homePage' &&
            parent?.heroType === HeroTypes.FULL_WIDTH_IMAGE)) &&
        !value.image.asset
      )
        return 'Field is required'
      return true
    }),
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType === HeroTypes.LOOPING_VIDEO
  },
}

const heroLoopingVideo = {
  title: 'Video',
  name: 'heroLoopingVideo',
  type: 'reference',
  fieldset: 'hero',
  to: [{ type: 'videoFile' }],
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as unknown as DocumentType
      if (parent?.heroType === HeroTypes.LOOPING_VIDEO && !value)
        return 'Field is required'
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
  fieldset: 'hero',
  options: {
    list: [
      { title: '2:1', value: '1:2' }, // should look if this value is in use to change it to 2:1
      { title: 'Tall', value: 'tall' },
      { title: 'Narrow', value: 'narrow' },
    ],
    initialValue: 'narrow',
  },
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.LOOPING_VIDEO
  },
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as unknown as DocumentType
      if (parent?.heroType === HeroTypes.LOOPING_VIDEO && !value)
        return 'Field is required'
      return true
    }),
}
const containVideo = {
  name: 'containVideo',
  title: 'Contain video',
  fieldset: 'hero',
  description:
    'Aspect ratios Tall and Narrow applies object cover, which might clip video content. This can problematic if the video has text.Set this to not clip content but black bars in the video might appear.',
  type: 'boolean',
  initialValue: false,
  hidden: ({ parent }: DocumentType) => {
    return (
      parent?.heroType !== HeroTypes.LOOPING_VIDEO ||
      parent?.heroLoopingVideoRatio === '0.5'
    )
  },
}

export default [
  title,
  heroType,
  heroRatio,
  heroTitle,
  isBigTitle,
  heroBigTitleDefault,
  heroBigTitleFiftyFifty,
  heroIngress,
  heroLink,
  heroLinkV2,
  background,
  heroImage,
  heroLoopingVideo,
  heroLoopingVideoRatio,
  containVideo,
  backgroundGradient
]
