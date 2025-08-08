import { label } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule, ValidationContext } from 'sanity'
import type { ColorSelectorValue } from '../components/ColorSelector'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import CompactBlockEditor from '../components/CompactBlockEditor'
import type { ImageWithAlt } from './imageWithAlt'

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureBlockContent, configureTitleBlockContent } from '../editors'
//import { LinkSelector } from './linkSelector/common'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'
import linkSelector from './linkSelector/linkSelector'
import { LinkSelector } from './linkSelector/common'

const titleContentType = configureTitleBlockContent()
const blockConfig = {
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
  smallText: false,
}

const blockContentType = configureBlockContent({ ...blockConfig })

export type PromoTile = {
  _type: 'promoTile'
  title: any[]
  linkLabelAsTitle?: boolean
  image?: ImageWithAlt
  link?: LinkSelector
  background?: ColorSelectorValue
}

export default {
  title: 'Promo tile',
  name: 'promoTile',
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
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    },
    {
      name: 'containImage',
      title:
        'Use this to contain image.The image keeps its aspect ratio, but is resized to fit within the given dimension',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'linkLabelAsTitle',
      title: 'Use label for the link as the title',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'title',
      type: 'array',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      title: 'Title',
      hidden: ({ parent }: { parent: PromoTile }) => parent?.linkLabelAsTitle,
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[], context: ValidationContext) => {
          const { parent } = context as { parent: PromoTile }
          if (parent?.linkLabelAsTitle || value) return true
          return 'Required'
        }),
    },
    {
      name: 'ingress',
      type: 'array',
      title: 'Short ingress',
      description: 'Max 600 chars',
      of: [blockContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 600, true)
        }).error(),
    },
    linkSelector(['link', 'reference', 'referenceToOtherLanguage', 'homePageLink'], undefined, undefined, false),
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
      imageUrl: 'image.asset.url',
      linkLabelAsTitle: 'linkLabelAsTitle',
      link: 'link.label',
    },
    prepare({
      title,
      imageUrl,
      linkLabelAsTitle,
      link,
    }: {
      title: any[]
      imageUrl: string
      linkLabelAsTitle: boolean
      link: string
    }) {
      return {
        title: linkLabelAsTitle ? link : blocksToText(title as any[]),
        subtitle: `Promo tile component`,
        media: imageUrl ? <img src={imageUrl} alt="" style={{ height: '100%' }} /> : EdsIcon(label),
      }
    },
  },
}
