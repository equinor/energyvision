import React from 'react'
import { SchemaType } from '../../types'
import { Colors } from '../../helpers/ColorListValues'
import { label } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

const validateLink = (value: any, connectedField: any): SchemaType.ValidationResult => {
  if (value && connectedField) {
    return 'Can only have a single link. Choose either an internal or external link.'
  }

  if (!connectedField && !value) {
    return 'An internal or external link is required.'
  }

  if (connectedField && !value) {
    return true
  }

  return true
}

export default {
  title: 'Promo tile',
  name: 'promoTile',
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
      name: 'link',
      title: 'Link',
      description: 'Select either an internal link or external URL.',
    },
  ],
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    },
    {
      name: 'buttonLabel',
      title: 'Button label',
      type: 'string',
      fieldset: 'link',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      name: 'reference',
      title: 'Internal link',
      type: 'reference',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(value, context.parent.url)
        }),
      to: [
        {
          type: 'news',
        },
        { type: 'page' },
      ],
      fieldset: 'link',
    },
    {
      name: 'url',
      title: 'External URL',
      type: 'url',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(value, context.parent.reference)
        }),
      fieldset: 'link',
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
      imageUrl: 'image.asset.url',
    },
    prepare(selection: any) {
      const { title, imageUrl } = selection
      return {
        title: title,
        subtitle: `Promo tile component`,
        media: imageUrl ? <img src={imageUrl} alt="" style={{ height: '100%' }} /> : EdsIcon(label),
      }
    },
  },
}
