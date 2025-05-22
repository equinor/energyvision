/* eslint-disable react/display-name */
import blocksToText from '../../../helpers/blocksToText'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import type { PortableTextBlock, Reference, Rule } from 'sanity'

const titleContentType = configureTitleBlockContent()

const blockConfig = {
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: true,
}

const blockContentType = configureBlockContent({ ...blockConfig })

export type HomepageBanner = {
  _type: 'homepageBanner'
  title?: PortableTextBlock[]
  image: ImageWithAlt
  ctaCards: any[]
  background?: ColorSelectorValue
}

export default {
  name: 'homepageBanner',
  title: 'Homepage banner',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Main catchphrase',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
    },
    {
      name: 'image',
      title: 'Background image',
      description: 'Choose either image or colored background',
      type: 'imageWithAlt',
      fieldset: 'design',
    },
    {
      name: 'attribution',
      title: 'Credit',
      type: 'string',
      fieldset: 'design',
    },
    {
      title: 'Colored background',
      description: 'Choose either image or colored background',
      name: 'colorBackground',
      type: 'colorlist',
      fieldset: 'design',
    },
    {
      title: 'CTA cards',
      name: 'ctaCards',
      type: 'array',
      of: [
        {
          title: 'CTA card',
          name: 'ctaCard',
          type: 'object',
          fields: [
            {
              name: 'overline',
              title: 'Eyebrow',
              type: 'string',
            },
            {
              name: 'link',
              type: 'array',
              title: 'Link or download',
              of: [
                { type: 'linkSelector', title: 'Link' },
                { type: 'downloadableImage', title: 'Call to action: Download image' },
                { type: 'downloadableFile', title: 'Call to action: Download file' },
              ],
              validation: (Rule: Rule) => Rule.max(1).error('Only one is permitted'),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image.asset',
    },
    prepare({ title, image }: { title: PortableTextBlock[]; image: Reference }) {
      const plainTitle = blocksToText(title) ?? 'Missing title'

      return {
        title: plainTitle,
        subtitle: 'Homepage banner component',
        media: image,
      }
    },
  },
}
