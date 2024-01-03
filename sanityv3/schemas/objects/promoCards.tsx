import { label } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule } from 'sanity'
import type { ColorSelectorValue } from '../components/ColorSelector'
import { EdsIcon } from '../../icons'
import type { LinkSelector } from './linkSelector'
import { configureBlockContent } from '../editors'
import { getLinkSelectorFields } from './linkSelector'
import blocksToText from '../../helpers/blocksToText'

const ingressBlockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

export type PromoCardsType = {
  _type: 'promoCards'
  ingress: PortableTextBlock[]
  linkLabelAsTitle?: boolean
  link?: LinkSelector
  isLink?: boolean
  background?: ColorSelectorValue
}

const linkFields = getLinkSelectorFields('label', 'isLink', false)

export default {
  title: 'Promo cards',
  name: 'promoCards',
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
    {
      name: 'label',
      title: 'Label',
      description: 'The label that the link/button should have.',
    },
  ],
  fields: [
    {
      name: 'ingress',
      title: 'Promo Text',
      type: 'array',
      of: [ingressBlockContentType],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'isLink',
      type: 'boolean',
      title: 'Use a link',
      description: 'Link to another piece of content',
      initialValue: false,
    },
    ...linkFields,
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
  ],
  preview: {
    select: {
      link: 'label',
      ingress: 'ingress',
    },
    prepare({ link, ingress }: { link: string; ingress: PortableTextBlock[] }) {
      return {
        title: link || blocksToText(ingress) || 'Promo Text Tile',
        subtitle: `Promo text tile component`,
        media: EdsIcon(label),
      }
    },
  },
}
