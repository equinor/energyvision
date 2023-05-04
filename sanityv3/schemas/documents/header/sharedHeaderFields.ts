import { Rule, ValidationContext } from 'sanity'
import { defaultColors } from '../../components/ColorSelector'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import { HeroTypes } from '../../HeroTypes'

type DocumentType = { parent: { heroType?: string } }

const titleContentType = configureTitleBlockContent()
const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

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
    ].filter((e) => e),
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
      { title: '2:1', value: '0.5' },
      { title: 'Narrow', value: 'narrow' },
      { title: 'Full screen', value: 'fullScreen' },
    ],
  },
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.FULL_WIDTH_IMAGE
  },
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as DocumentType
      if (parent?.heroType === HeroTypes.FULL_WIDTH_IMAGE && !value) return 'Field is required'
      return true
    }),
  initialValue: '0.5',
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
    return parent?.heroType !== HeroTypes.FIFTY_FIFTY
  },
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as DocumentType
      if (parent?.heroType === HeroTypes.FIFTY_FIFTY && !value) return 'Field is required'
      return true
    }),
}

const heroIngress = {
  title: 'Hero Ingress',
  name: 'heroIngress',
  type: 'array',
  of: [ingressContentType],
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.FIFTY_FIFTY
  },
  fieldset: 'header',
}

const heroLink = {
  name: 'heroLink',
  title: 'Link',
  description: 'Select link to display',
  type: 'array',
  of: [{ type: 'linkSelector', title: 'Link' }],
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.FIFTY_FIFTY
  },
  fieldset: 'header',
  validation: (Rule: Rule) => Rule.max(1).error('Only one action is permitted'),
}

const background = {
  title: 'Hero Background',
  description: 'Pick a colour for the background. Default is white.',
  name: 'heroBackground',
  type: 'colorlist',
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.FIFTY_FIFTY
  },
  fieldset: 'header',
  initialValue: defaultColors[0],
}

const heroImage = {
  title: 'Hero image',
  name: 'heroFigure',
  type: 'imageWithAltAndCaption',
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as DocumentType
      if (parent?.heroType === HeroTypes.LOOPING_VIDEO && !value) return 'Field is required'
      return true
    }),
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType === HeroTypes.LOOPING_VIDEO
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
      const { parent } = context as DocumentType
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
      { title: 'Original', value: 'original' },
      { title: 'Narrow', value: 'narrow' },
    ],
  },
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.LOOPING_VIDEO
  },
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as DocumentType
      if (parent?.heroType === HeroTypes.LOOPING_VIDEO && !value) return 'Field is required'
      return true
    }),
  fieldset: 'header',
}

export default [
  title,
  heroType,
  heroRatio,
  heroTitle,
  heroIngress,
  heroLink,
  background,
  heroImage,
  heroLoopingVideo,
  heroLoopingVideoRatio,
]
