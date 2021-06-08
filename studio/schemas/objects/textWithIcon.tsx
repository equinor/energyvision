import React from 'react'
import { configureBlockContent } from '../editors/blockContentType'
import blocksToText from '../../helpers/blocksToText'
import { puzzle_filled } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { SchemaType } from '../../types'

const blockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

const validateText = (value: string, context: SchemaType.ValidationContext): SchemaType.ValidationResult => {
  const icon = context.parent.icon

  if (!icon) return true

  const title = context.parent.title
  const text = context.parent.text

  if (!value && !title && !text) {
    return 'A title or text is required if an icon has been selected.'
  }

  return true
}

export default {
  title: 'Short text with icon',
  name: 'textWithIcon',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: string, context: SchemaType.ValidationContext) => validateText(value, context)),
    },
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [blockContentType],
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: string, context: SchemaType.ValidationContext) => validateText(value, context)),
    },
    {
      title: 'Icon',
      name: 'icon',
      type: 'imageWithAlt',
      options: {
        accept: '.svg',
      },
    },
  ],
  preview: {
    select: {
      title: `title`,
      text: `text`,
      icon: 'icon',
    },
    prepare({ title = '', text = null, icon }: { title: string; text: any; icon: any }) {
      return {
        title: text ? blocksToText(text) : title || 'Missing content',
        subtitle: 'Text with icon component',
        media: icon?.asset || <div>{EdsIcon(puzzle_filled)}</div>,
      }
    },
  },
}
