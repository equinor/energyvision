import { collection_2 } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Rule } from 'sanity'
import type { PromoCardsType } from './promoCards'

export type PromoCardsArray = {
  _type: 'promoCardsArrayType'
  group: PromoCardsType[]
}

export default {
  type: 'object',
  name: 'promoCardsArray',
  title: 'Promo cards',
  fields: [
    {
      name: 'spacing',
      type: 'boolean',
      title: 'Space between other components',
      initialValue: false,
    },
    {
      type: 'array',
      name: 'group',
      description: 'Add promo cards as one or a pair',
      title: 'Promo cards',
      of: [{ type: 'promoCards' }],
      validation: (Rule: Rule) => Rule.required().min(1).max(2),
    },
  ],
  preview: {
    select: {
      group: 'group',
    },
    prepare() {
      return {
        title: 'Promo cards title',
        subtitle: `Promo cards component`,
        media: EdsIcon(collection_2),
      }
    },
  },
}
