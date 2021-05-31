/* eslint-disable import/no-unresolved */
import React from 'react'
import { SchemaType } from '../../types'
import { InlineImageFullWidth, InlineImageLeftAlign, InlineImageRightAlign } from '../../icons'
import { RadioIconSelector } from '../components'

const imageAlignmentOptions = [
  { value: 'full', icon: InlineImageFullWidth },
  { value: 'left', icon: InlineImageLeftAlign },
  { value: 'right', icon: InlineImageRightAlign },
]

type PreviewProps = {
  imageUrl: string
  alt: string
  caption: string
}

export default {
  name: 'positionedInlineImage',
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
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      inputComponent: function ImagePosition({ type, onChange, value }: { type: any; onChange: any; value: string }) {
        return (
          <RadioIconSelector
            name="imageAlignmentSelector"
            options={imageAlignmentOptions}
            defaultValue="full"
            currentValue={value}
            type={type}
            onChange={onChange}
          />
        )
      },
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
