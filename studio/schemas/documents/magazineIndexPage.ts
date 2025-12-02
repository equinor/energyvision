import { bookmarks } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule, ValidationContext } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors/blockContentType'
import MagazineFooterComponent from '../objects/magazineFooterComponent'
import { HeroTypes } from './header/sharedHeaderFields'
import { lang } from './langField'

export default {
  type: 'document',
  title: 'Magazine Index Page',
  name: 'magazineIndex',
  icon: () => EdsIcon(bookmarks),
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
      description:
        'This part is used for meta information when this content is used on the web',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    lang,
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Meta information',
      name: 'seo',
      type: 'titleAndMeta',
      fieldset: 'metadata',
    },
    {
      title: 'Open Graph Image',
      name: 'openGraphImage',
      type: 'imageWithAlt',
      description:
        'You can override the hero image as the SoMe image by uploading another image here.',
      fieldset: 'metadata',
    },
    {
      title: 'Type',
      name: 'heroType',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: HeroTypes.DEFAULT },
          { title: 'Full Image', value: HeroTypes.FULL_WIDTH_IMAGE },
          {
            title: 'Title and/or ingress on background image',
            value: HeroTypes.BACKGROUND_IMAGE,
          },
        ].filter(e => e),
      },
      initialValue: HeroTypes.FULL_WIDTH_IMAGE,
    },
    {
      title: 'Hero image',
      name: 'heroFigure',
      type: 'imageWithAltAndCaption',
    },
    {
      title: 'Hero image ratio',
      name: 'heroRatio',
      type: 'string',
      options: {
        list: [
          { title: 'Tall', value: 'tall' },
          { title: '2:1(deprecated)', value: '0.5' },
          { title: 'Narrow', value: 'narrow' },
        ],
      },
      hidden: ({ parent }: any) => {
        return parent?.heroType !== HeroTypes.FULL_WIDTH_IMAGE
      },
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as any
          if (parent?.heroType === HeroTypes.FULL_WIDTH_IMAGE && !value)
            return 'Field is required'
          return true
        }),
      initialValue: 'narrow',
    },
    {
      title: 'Ingress',
      name: 'ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'fullBlock' })],
    },
    {
      title: 'Promoted Magazine Tags',
      name: 'promotedMagazineTags',
      description: 'Place the magazine tags in the correct order',
      type: 'array',
      of: [
        {
          title: 'Magazine Tag',
          type: 'reference',
          to: [{ type: 'magazineTag' }],
          options: {
            // Disable new since this button does not work with dynamic initial
            // values  :(
            disableNew: true,
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique().min(5).max(5),
    },
    MagazineFooterComponent,
  ],
  preview: {
    select: {
      title: 'title',
      ingress: 'ingress',
    },
    prepare({
      title,
      ingress,
    }: {
      title: PortableTextBlock[]
      ingress: PortableTextBlock[]
    }) {
      const plainTitle = title ? blocksToText(title) : ''

      return {
        title: plainTitle,
        subtitle: blocksToText(ingress) || '',
      }
    },
  },
}
