import React from 'react'
import { configureBlockContent } from '../../editors/blockContentType'
import CharCounterEditor from '../../components/CharCounterEditor'
import blocksToText from '../../../helpers/blocksToText'
import { validateCharCounterEditor } from '../../validations/validateCharCounterEditor'

import type { Block, Rule, Image } from '@sanity/types'
import routes from '../../routes'
import { filterByRoute } from '../../../helpers/referenceFilters'

const introBlockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

export default {
  title: 'Topic promotion',
  name: 'promoteTopics',
  type: 'object',

  fields: [
    {
      name: 'references',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'topics',
          title: 'Topic',
          fields: [
            {
              title: 'Topic to be promoted',
              name: 'reference',
              description: 'Select the topic you want to promote',
              type: 'reference',
              to: routes,
              options: {
                filter: filterByRoute,
                disableNew: true,
              },
            },
            {
              name: 'ingress',
              title: 'Ingress',
              description: 'A short and catchy introduction text for this topic content card (max. 215 chars)',
              type: 'array',
              inputComponent: CharCounterEditor,
              of: [introBlockContentType],
              validation: (Rule: Rule) => Rule.custom((value: any) => validateCharCounterEditor(value, 215)),
            },
          ],
          preview: {
            select: {
              title: 'reference.content.title',
              media: 'reference.content.heroFigure.image',
            },
            prepare({ title, media }: { title: Block[]; media: Image }) {
              const plainTitle = title ? blocksToText(title) : ''

              return {
                title: plainTitle,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique().min(3).max(3),
    },
  ],
  preview: {
    select: {
      reference1: 'references.0.reference.content.title',
      reference2: 'references.1.reference.content.title',
      reference3: 'references.2.reference.content.title',
    },
    prepare({ reference1, reference2, reference3 }: { reference1: Block[]; reference2: Block[]; reference3: Block[] }) {
      const plainTitle1 = reference1 ? blocksToText(reference1) : undefined
      const plainTitle2 = reference2 ? blocksToText(reference2) : undefined
      const plainTitle3 = reference3 ? blocksToText(reference3) : undefined
      const titles = [plainTitle1, plainTitle2, plainTitle3].filter(Boolean)
      return {
        title: titles.join(', '),
        subtitle: `Topic promotions.`,
      }
    },
  },
}
