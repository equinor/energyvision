import React from 'react'

import blocksToText from '../../../helpers/blocksToText'
import type { Block, Rule } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'

export type Promotion = {
  _type: 'promotion'
  type: 'news' | 'topic'
  title?: Block[]
  ingress?: Block[]
  background?: ColorListValue
}

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
          title: 'Topics to be promoted',
          description: 'Select the topics you want to promote',
          type: 'reference',
          to: [{ type: 'route_en_GB' }, { type: 'route_nb_NO' }],
          options: {
            filter: ({ document }: { document: any }) => ({
              filter: `_type == $routeLang `,
              params: { routeLang: `route_${document._lang}` },
            }),
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique().min(3).max(3),
    },
  ],
  preview: {
    select: {
      reference1: 'references.0.content.title',
      reference2: 'references.1.content.title',
      reference3: 'references.2.content.title',
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
