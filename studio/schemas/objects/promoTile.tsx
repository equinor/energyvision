import React from 'react'
import { Colors } from '../../helpers/ColorListValues'
import { label } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Rule } from '@sanity/types'
import type { ImageWithAlt } from './imageWithAlt'
import type { LinkSelector } from './linkSelector'
import type { ColorListValue } from 'sanity-plugin-color-list'
import CompactBlockEditor from '../components/CompactBlockEditor'
import blocksToText from '../../helpers/blocksToText'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureTitleBlockContent } from '../editors'
import { Flags } from '../../src/lib/datasetHelpers'

const titleContentType = configureTitleBlockContent()

export type PromoTile = {
  _type: 'promoTile'
  richTitle: any[] | string
  title: string
  image?: ImageWithAlt
  link?: LinkSelector
  background?: ColorListValue
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
    {
      name: 'title',
      type: 'array',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    },
    {
      name: 'link',
      type: 'linkSelector',
      validation: (Rule: Rule) => Rule.required(),
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
    prepare({ title, imageUrl }: { title: any[] | string; imageUrl: string }) {
      return {
        title: Flags.IS_DEV ? blocksToText(title as any[]) : title,
        subtitle: `Promo tile component`,
        media: imageUrl ? <img src={imageUrl} alt="" style={{ height: '100%' }} /> : EdsIcon(label),
      }
    },
  },
}
