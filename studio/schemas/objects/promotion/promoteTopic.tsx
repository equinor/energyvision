import React from 'react'
import { configureBlockContent } from '../../editors/blockContentType'
import CharCounterEditor from '../../components/CharCounterEditor'
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

const validateIngress = (value: any) => {
  if (!value || value.length === 0) {
    return 'Required'
  }

  const count = value[0].children.reduce(
    (total: any, current: { text: string | any[] }) => total + current.text.length,
    0,
  )

  if (count > 215) {
    return `The introduction should be no longer than 215 characters. Currently ${count} characters long.`
  }

  return true
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
          type: 'object',
          name: 'topics',
          title: 'Topic',
          fields: [
            {
              title: 'Topic to be promoted',
              name: 'reference',
              description: 'Select the topic you want to promote',
              type: 'reference',
              to: [{ type: 'route_en_GB' }, { type: 'route_nb_NO' }],
              options: {
                filter: ({ document }: { document: any }) => ({
                  filter: `_type == $routeLang `,
                  params: { routeLang: `route_${document._lang}` },
                }),
              },
            },
            {
              name: 'ingress',
              title: 'Ingress',
              description: 'A short and catchy introduction text for this card (max. 215 chars)',
              type: 'array',
              inputComponent: CharCounterEditor,
              of: [introBlockContentType],
              validation: (Rule: Rule) => Rule.custom((value: any) => validateIngress(value)),
            },
          ],
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
