import { label } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule, ValidationContext } from 'sanity'
import type { ColorSelectorValue } from '../components/ColorSelector'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'
import type { LinkSelector } from './linkSelector'
import { configureBlockContent } from '../editors'
import { getLinkSelectorFields } from './linkSelector'

const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export type PromoTextTile = {
  _type: 'promoTextTile'
  linkLabelAsTitle?: boolean
  link?: LinkSelector
  isLink?: boolean
  background?: ColorSelectorValue
}

export default {
  title: 'Promo text tile',
  name: 'promoTextTile',
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
      name: 'text',
      title: 'Ingress',
      type: 'array',
      of: [ingressContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => validateCharCounterEditor(value, 600)).warning(),
    },
    {
      name: 'isLink',
      type: 'boolean',
      title: 'Use a link',
      description: 'Link to another piece of content',
      initialValue: false,
    },
    {
      name: 'linkLabelAsTitle',
      title: 'Toggle button text',
      description: 'This will add the text to link',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }: { parent: PromoTextTile }) => !parent.isLink,
    },
    ...getLinkSelectorFields(undefined, 'isLink'),

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
      title: 'title',
      linkLabelAsTitle: 'linkLabelAsTitle',
      link: 'link.label',
    },
    prepare({ linkLabelAsTitle, link }: { title: PortableTextBlock[]; linkLabelAsTitle: boolean; link: string }) {
      return {
        title: linkLabelAsTitle && link,
        subtitle: `Promo text tile component`,
        media: EdsIcon(label),
      }
    },
  },
}
