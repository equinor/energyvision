import React from 'react'
import { Rule, ValidationContext } from '@sanity/types/dist/dts'
import CharCounterEditor from '../../components/CharCounterEditor'
import { configureTitleBlockContent, configureBlockContent } from '../../editors'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { Flags } from '../../../src/lib/datasetHelpers'
import { Colors } from '../../../helpers/ColorListValues'
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
  inputComponent: CompactBlockEditor,
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
      Flags.IS_DEV && { title: 'Full Video', value: HeroTypes.VIDEO_HERO },
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
  inputComponent: CompactBlockEditor,
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
  inputComponent: CharCounterEditor,
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
  options: {
    borderradius: {
      outer: '100%',
      inner: '100%',
    },
    tooltip: true,
    list: Colors,
  },
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.FIFTY_FIFTY
  },
  fieldset: 'header',
  initialValue: Colors[0],
}

const heroImage = {
  title: 'Hero image',
  name: 'heroFigure',
  type: 'imageWithAltAndCaption',
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as DocumentType
      if (parent?.heroType !== HeroTypes.VIDEO_HERO && !value) return 'Field is required'
      return true
    }),
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType === HeroTypes.VIDEO_HERO
  },
  fieldset: 'header',
}

const heroVideo = {
  title: 'Hero video',
  name: 'heroVideo',
  type: 'mux.video',
  fieldset: 'header',
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as DocumentType
      if (parent?.heroType === HeroTypes.VIDEO_HERO && !value) return 'Field is required'
      return true
    }),
  hidden: ({ parent }: DocumentType) => {
    return parent?.heroType !== HeroTypes.VIDEO_HERO
  },
}

export default [title, heroType, heroRatio, heroTitle, heroIngress, heroLink, background, heroImage, heroVideo]
