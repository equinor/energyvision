import { collection_1, collection_2 } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Rule } from 'sanity'
import type { PromoCardsType } from './promoCards'
import blocksToText from '../../helpers/blocksToText'

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
      spacing: 'spacing',
    },
    prepare({ group, spacing }: { group: PromoCardsType[]; spacing: boolean }) {
      const length = group.length
      const ingresses = group.map((e) => blocksToText(e.ingress)?.slice(0, length === 1 ? 40 : 20) + '...')
      console.log(ingresses)
      return {
        title: `Promo cards | ${ingresses.map((e) => e).join(' ')}`,
        subtitle: `${length == 1 ? 'Single Card' : 'Double Cards'} | ${spacing ? 'Extra spacing' : 'No Extra spacing'}`,
        media: EdsIcon(length === 1 ? collection_1 : collection_2),
      }
    },
  },
}
