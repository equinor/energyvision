import { label } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule, ValidationContext } from 'sanity'
import type { ColorSelectorValue } from '../components/ColorSelector'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'
import type { LinkSelector } from './linkSelector'
import { configureTitleBlockContent, configureBlockContent } from '../editors'

const titleContentType = configureTitleBlockContent()

const blockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

export type PromoTextTile = {
  _type: 'promoTextTile'
  title: string
  linkLabelAsTitle?: boolean
  link?: LinkSelector
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
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      title: 'Title',
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[], context: ValidationContext) => {
          const { parent } = context as { parent: PromoTextTile }
          if (parent?.linkLabelAsTitle || value) return true
          return 'Required'
        }),
    },
    {
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [blockContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => validateCharCounterEditor(value, 600)).warning(),
    },
    {
      name: 'linkLabelAsTitle',
      title: 'Toggle link button text',
      description: 'This will add the link label as the button text',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'link',
      type: 'linkSelector',
    },
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
    prepare({ title, linkLabelAsTitle, link }: { title: any[]; linkLabelAsTitle: boolean; link: string }) {
      return {
        title: linkLabelAsTitle ? link : blocksToText(title as any[]),
        subtitle: `Promo text tile component`,
        media: EdsIcon(label),
      }
    },
  },
}
