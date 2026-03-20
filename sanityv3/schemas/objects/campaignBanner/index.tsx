/* eslint-disable react/display-name */

import type { Image, PortableTextBlock, Reference, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import type { ColorSelectorValue } from '../../components/ColorSelector'
import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import { validateCharCounterEditor } from '../../validations/validateCharCounterEditor'

const titleContentType = configureTitleBlockContent({
  largeText: true,
  extraLargeText: true,
})

export type CampaignBanner = {
  _type: 'campaignBanner'
  overline?: string
  title?: PortableTextBlock[]
  text?: PortableTextBlock[]
  image: Image
  imagePosition?: string
  imageSize?: string
  background?: ColorSelectorValue
}

export default {
  name: 'campaignBanner',
  title: 'Campaign Banner',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      title: 'Background image',
      name: 'backgroundImage',
      description: 'Settings for the background image',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [titleContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 600)
        }).warning(),
    },
    {
      title: 'Image',
      name: 'backgroundImage',
      type: 'image',
      options: {
        hotspot: true,
        collapsed: false,
      },
      fieldset: 'backgroundImage',
    },
    {
      title: 'Background Color',
      description: 'Fallback if no background image. Default is white.',
      name: 'backgroundColor',
      type: 'colorlist',
      fieldset: 'backgroundImage',
    },
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text',
      image: 'backgroundImage.asset',
    },
    prepare({ title, text, image }: { title: PortableTextBlock[]; text: PortableTextBlock[]; image: Reference }) {
      const plainTitle = blocksToText(title || text)

      return {
        title: plainTitle || 'Missing title/content',
        subtitle: 'Campaign banner component',
        media: image,
      }
    },
  },
}
