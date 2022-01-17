import React from 'react'
import { code } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { Colors } from '../../helpers/ColorListValues'
import { configureTitleBlockContent, configureBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import CharCounterEditor from '../components/CharCounterEditor'
import blocksToText from '../../helpers/blocksToText'
import type { Rule, ValidationContext, Block } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'

const titleContentType = configureTitleBlockContent()

const descriptionContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export type IFrame = {
  _type: 'iframe'
  title?: Block[]
  frameTitle: string
  url: string
  aspectRatio: string
  height?: number
  background?: ColorListValue
  cookiePolicy: 'none' | 'marketing' | 'statistics'
}

type FilteredIFrameProps = {
  name?: string
  title?: string
  description?: string
  filters?: string[]
}

export const FilteredIFrame = ({
  name = 'iframe',
  title = 'IFrame',
  description = '',
  filters = [],
}: FilteredIFrameProps) => ({
  title: title,
  description: description,
  name: name,
  type: 'object',
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      description: 'Some options for design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'IFrame settings',
      name: 'iframe',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Call to action / link',
      name: 'link',
      description: 'If you need a separate link, you may add it here //Work in progress',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      description: 'The (optional) title/heading shown above the iframe.',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
    },
    {
      name: 'description',
      title: 'Description/caption',
      description: 'Work in progress: Name this field',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [descriptionContentType],
    },
    {
      name: 'action',
      type: 'linkSelector',
      title: 'Call to action',
      fieldset: 'link',
    },
    {
      name: 'frameTitle',
      type: 'string',
      title: 'Frame title',
      fieldset: 'iframe',

      description: 'The title of the iframe. This value is not visible on the page but is required for accessibility.',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as { parent: IFrame }
          return parent?.url && value === undefined ? 'Required' : true
        }),
    },
    {
      name: 'url',
      type: 'url',
      title: 'Frame URL',
      description: 'Link to the content to be loaded inside the iframe.',
      fieldset: 'iframe',
      validation: (Rule: Rule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: IFrame }
          return (parent?.title || parent?.frameTitle) && value === undefined ? 'Required' : true
        }),
    },
    {
      name: 'cookiePolicy',
      type: 'string',
      title: 'Cookie policy',
      description: 'Select which cookie policy applies to this iframe.',
      fieldset: 'iframe',

      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Statistics', value: 'statistics' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1', value: '1:1' },
        ],
        layout: 'dropdown',
      },
      fieldset: 'design',
      initialValue: '16:9',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'height',
      type: 'number',
      title: 'Height',
      description: 'Set a fixed height in pixels for the iframe. Note: this will override the aspect ratio setting.',
      fieldset: 'design',
      validation: (Rule: Rule) => Rule.positive().greaterThan(0).precision(0),
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: true,
        list: Colors,
      },
      fieldset: 'design',
      initialValue: Colors[0],
      hidden: () => filters.includes('background'),
    },
  ],
  preview: {
    select: {
      title: 'title',
      frameTitle: 'frameTitle',
    },
    prepare({ title, frameTitle }: { title: Block[]; frameTitle: string }) {
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title: plainTitle || frameTitle,
        subtitle: `IFrame component`,
        media: EdsIcon(code),
      }
    },
  },
})

const defaultIFrame = FilteredIFrame({})

export default defaultIFrame
