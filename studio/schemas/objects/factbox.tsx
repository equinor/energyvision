import React from 'react'
import { SchemaType } from '../../types'
import { info_circle } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

type PreviewProps = {
  imageUrl: string
  title: string
}

export default {
  name: 'factbox',
  type: 'object',
  fields: [
    { name: 'backgroundColour', type: 'backgroundColourPicker' },
    { name: 'title', type: 'string', title: 'Title' },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Numbered', value: 'number' },
            { title: 'Unordered', value: 'bullet' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    },
  ],
  preview: {
    select: {
      title: 'title',
      imageUrl: 'image.asset.url',
    },
    prepare({ title, imageUrl }: PreviewProps): SchemaType.Preview {
      return {
        title: title,
        subtitle: 'Factbox',
        media: imageUrl ? <img src={imageUrl} alt="" style={{ height: '100%' }} /> : EdsIcon(info_circle),
      }
    },
  },
}
