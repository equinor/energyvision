/* eslint-disable react/display-name */
import React from 'react'
import { format_quote } from '@equinor/eds-icons'
import { EdsIcon, LeftAlignedImage, RightAlignedImage } from '../../icons'
import { RadioIconSelector } from '../components'
import type { Rule } from '@sanity/types'
import type { ImageWithAlt } from './imageWithAlt'

export type PullQuote = {
  _type: 'pullQuote'
  quote: string
  author: string
  authorTitle?: string
  image?: ImageWithAlt
  imagePosition?: string
}

const imageAlignmentOptions = [
  { value: 'left', icon: LeftAlignedImage },
  { value: 'right', icon: RightAlignedImage },
]

export default {
  name: 'pullQuote',
  title: 'Quote',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      title: 'Quote',
      name: 'pullQuote',
    },
    {
      title: 'Design options',
      name: 'design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'Highlighted quote from the article.',
      rows: 5,
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'author',
      type: 'string',
      title: 'Name',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'authorTitle',
      type: 'string',
      title: 'Title',
      description: 'Optional title for the author.',
    },
    {
      name: 'image',
      type: 'imageWithAlt',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'imagePosition',
      title: 'Image position',
      description: 'Select which side of the quote the image should be displayed at on larger screens.',
      type: 'string',
      fieldset: 'design',
      inputComponent: function ({ type, onChange, value }: { type: any; onChange: any; value: string }) {
        return (
          <RadioIconSelector
            name="imageAlignmentSelector"
            options={imageAlignmentOptions}
            defaultValue="right"
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
      title: 'quote',
      author: 'author',
    },
    prepare({ title, author }: { title: string; author: string }) {
      return {
        title: title,
        subtitle: `By: ${author}`,
        media: <div>{EdsIcon(format_quote)}</div>,
      }
    },
  },
}
