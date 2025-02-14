import { ImageWithAlt } from './imageWithAlt'
import type { PortableTextBlock, Reference } from 'sanity'
import { Rule } from 'sanity'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'

const blockConfig = {
  h2: false,
  h3: true,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: true,
}

const blockContentType = configureBlockContent({ ...blockConfig })

export type CarouselImageWithRichText = {
  _type: 'imageWithRichText'
  image: ImageWithAlt
  content: PortableTextBlock[]
  action?: Reference[]
}

export default {
  name: 'imageWithRichTextBelow',
  title: 'Image with rich text below',
  type: 'object',
  options: {
    collapsed: false,
  },
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'caption',
      title: 'Caption content',
      description: 'Displays below',
      type: 'array',
      of: [blockContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 600, true)
        }).error(),
    },
    {
      name: 'action',
      title: 'CTA Link',
      description: 'Optional. Displays with content above is used',
      type: 'array',
      of: [{ type: 'linkSelector', title: 'Link' }],
      validation: (Rule: Rule) => Rule.max(1).error('Only one action is permitted'),
    },
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
    },
    prepare({ imageUrl }: { imageUrl: string }) {
      return {
        title: 'Image with rich text below',
        media: <img src={imageUrl} alt="" style={{ height: '100%' }} />,
      }
    },
  },
}
