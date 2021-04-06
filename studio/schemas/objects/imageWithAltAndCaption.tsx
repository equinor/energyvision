import React from 'react'
import { SchemaType } from '../../types'

type PreviewProps = {
  imageUrl: string
  alt: string
  caption: string
}

export default {
  name: 'imageWithAltAndCaption',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image with alt',
      type: 'imageWithAlt',
    },
    {
      name: 'caption',
      title: 'Image caption',
      type: 'string',
    },
    {
      name: 'attribution',
      type: 'string',
      title: 'Attribution',
    },
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      alt: 'image.alt',
      caption: 'caption',
    },
    prepare({ imageUrl, caption, alt }: PreviewProps): SchemaType.Preview {
      return {
        title: alt,
        subtitle: caption,
        media: <img src={imageUrl} alt={alt} style={{ height: '100%' }} />,
      }
    },
  },
}
