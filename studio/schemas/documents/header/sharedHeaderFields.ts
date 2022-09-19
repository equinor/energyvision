import React from 'react'
import { Rule, ValidationContext } from '@sanity/types/dist/dts'
import { configureTitleBlockContent } from '../../editors'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { Flags } from '../../../src/lib/datasetHelpers'

type DocumentType = { parent: { heroType?: string } }

const titleContentType = configureTitleBlockContent()

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
      { title: 'Default', value: 'default' },
      { title: 'Full Image', value: 'fullWidthImage' },
    ],
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
    return parent?.heroType !== 'fullWidthImage'
  },
  validation: (Rule: Rule) =>
    Rule.custom((value: string, context: ValidationContext) => {
      const { parent } = context as DocumentType
      if (parent?.heroType === 'fullWidthImage' && !value) return 'Field is required'
      return true
    }),
  initialValue: '0.5',
  fieldset: 'header',
}

const heroImage = {
  title: 'Hero image',
  name: 'heroFigure',
  type: 'imageWithAltAndCaption',
  validation: (Rule: Rule) => Rule.required(),
  fieldset: 'header',
}

export default Flags.IS_DEV ? [title, heroType, heroRatio, heroImage] : [title, heroImage]
