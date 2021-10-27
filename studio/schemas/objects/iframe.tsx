import React from 'react'
import { code } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { SchemaType } from '../../types'
import { Colors } from '../../helpers/ColorListValues'
import { configureTitleBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import blocksToText from '../../helpers/blocksToText'

const titleContentType = configureTitleBlockContent()

export default {
  title: 'IFrame',
  name: 'iframe',
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
      name: 'frameTitle',
      type: 'string',
      title: 'Frame title',
      description: 'The title of the iframe. This value is not visible on the page but is required for accessibility.',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return context.parent?.url && value === undefined ? 'Required' : true
        }),
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Link to the content to be loaded inside the iframe.',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return (context.parent?.title || context.parent?.frameTitle) && value === undefined ? 'Required' : true
        }),
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
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      name: 'height',
      type: 'number',
      title: 'Height',
      description: 'Set a fixed height in pixels for the iframe. Note: this will override the aspect ratio setting.',
      fieldset: 'design',
      validation: (Rule: SchemaType.ValidationRule) => Rule.positive().greaterThan(0).precision(0),
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
    },
  ],
  preview: {
    select: {
      title: 'title',
      frameTitle: 'frameTitle',
    },
    prepare({ title, frameTitle }: { title: any; frameTitle: string }): SchemaType.Preview {
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title: plainTitle || frameTitle,
        subtitle: `IFrame component`,
        media: EdsIcon(code),
      }
    },
  },
}
