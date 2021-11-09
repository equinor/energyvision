import React from 'react'
import blocksToText from '../../../helpers/blocksToText'

import type { Rule, Block } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'
import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import CharCounterEditor from '../../components/CharCounterEditor'

export type Promotion = {
  _type: 'promotion'
  type: 'news' | 'topic'
  title?: Block[]
  ingress?: Block[]
  background?: ColorListValue
}

type PromotionType = 'promoteTopics' | 'promoteNews'

const titleContentType = configureTitleBlockContent()

const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  title: 'Promotion',
  name: 'promotion',
  type: 'object',

  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'array',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressContentType],
    },
    {
      type: 'array',
      name: 'promotion',
      description: 'Choose a type to promote',
      title: 'Promoted content',
      of: [
        { type: 'promoteNews', title: 'Promote news' },
        { type: 'promoteTopics', title: 'Promote topic' },
      ],
      validation: (Rule: Rule) => Rule.required().min(1).max(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'promotion[0]._type',
    },
    prepare({ title = [], type }: { title: Block[]; type: PromotionType }) {
      const plainTitle = title ? blocksToText(title) : undefined

      const getPromotionType = (type: PromotionType) => {
        if (type === 'promoteTopics') {
          return 'Topic page promotion'
        }
        return 'News promotions'
      }

      return {
        title: plainTitle,
        subtitle: getPromotionType(type),
      }
    },
  },
}
