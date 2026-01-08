/* eslint-disable import/no-unresolved */

import { TbFloatCenter, TbFloatLeft, TbFloatRight } from 'react-icons/tb'
import type { Rule, ValidationContext } from 'sanity'
import { InlineImageFullWidth } from '../../icons'
import { RadioIconSelector } from '../components'
import type { ImageWithAlt } from './imageWithAlt'

const imageAlignmentOptions = [
  { value: 'full', icon: InlineImageFullWidth },
  { value: 'left', icon: <TbFloatLeft size={33} /> },
  { value: 'right', icon: <TbFloatRight size={33} /> },
  { value: 'center', icon: <TbFloatCenter size={33} /> },
]

export type PositionedInlineImage = {
  _type: 'positionedInlineImage'
  image: ImageWithAlt
  caption?: string
  attribution?: string
  layout?: string
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
      title: 'Credit',
      type: 'string',
    },
    {
      title: 'image orientation',
      name: 'imageOrientation',
      type: 'string',
      options: {
        list: [
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' },
          { title: 'Square', value: 'square' },
        ],
        layout: 'radio',
      },
      initialValue: 'landscape',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context
          //@ts-ignore:todo
          return value !== 'landscape' && parent?.layout === 'full'
            ? 'Use landscape with layout full'
            : true
        }),
    },
    {
      name: 'enableImageZoom',
      title: 'Enable image zoom',
      type: 'boolean',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      components: {
        input: function ImagePosition({
          onChange,
          value,
        }: {
          onChange: any
          value: string
        }) {
          return (
            <RadioIconSelector
              name='imageAlignmentSelector'
              options={imageAlignmentOptions}
              defaultValue='full'
              currentValue={value}
              onChange={onChange}
            />
          )
        },
      },
    },
  ],

  preview: {
    select: {
      imageUrl: 'image.asset.url',
      alt: 'image.alt',
      caption: 'caption',
    },
    prepare({
      imageUrl,
      caption,
      alt,
    }: {
      imageUrl: string
      alt: string
      caption: string
    }) {
      return {
        title: alt,
        subtitle: caption,
        media: <img src={imageUrl} alt={alt} style={{ height: '100%' }} />,
      }
    },
  },
}
