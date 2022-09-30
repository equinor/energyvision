import React from 'react'
import { i18n } from '../documentTranslation'
import { configureBlockContent } from '../editors/blockContentType'
import { configureTitleBlockContent } from '../editors'
import CharCounterEditor from '../components/CharCounterEditor'
import CompactBlockEditor from '../components/CompactBlockEditor'
import blocksToText from '../../helpers/blocksToText'
import MagazineFooterComponent from '../objects/magazineFooterComponent'

import type { Rule, Block } from '@sanity/types'

const titleContentType = configureTitleBlockContent()
const textContentType = configureBlockContent({
  h1: false,
  h2: true,
  h3: false,
  h4: false,
  externalLink: false,
  internalLink: false,
  lists: false,
  attachment: false,
})

export default {
  type: 'document',
  title: 'Magazine Index Page',
  name: 'magazineIndex',
  i18n,
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
      description: 'This part is used for meta information when this content is used on the web',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      title: 'Meta information',
      name: 'seo',
      type: 'titleAndMeta',
      fieldset: 'metadata',
    },
    {
      title: 'Open Graph Image',
      name: 'openGraphImage',
      type: 'imageWithAlt',
      description: 'You can override the hero image as the SoMe image by uploading another image here.',
      fieldset: 'metadata',
    },
    {
      name: 'title',
      type: 'array',
      title: 'Title',

      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Text',
      name: 'ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [textContentType],
    },
    {
      title: 'Promoted Magazine Tags',
      name: 'promotedMagazineTags',
      description: 'Place the magazine tags in the correct order',
      type: 'array',
      of: [
        {
          title: 'Magazine Tag',
          type: 'reference',
          to: [{ type: 'magazineTag' }],
          options: {
            // Disable new since this button does not work with dynamic initial
            // values  :(
            disableNew: true,
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique().min(5).max(5),
    },
    MagazineFooterComponent,
  ],
  preview: {
    select: {
      title: 'title',
      ingress: 'ingress',
    },
    prepare({ title, ingress }: { title: Block[]; ingress: Block[] }) {
      const plainTitle = title ? blocksToText(title) : ''

      return {
        title: plainTitle,
        subtitle: blocksToText(ingress) || '',
      }
    },
  },
}
