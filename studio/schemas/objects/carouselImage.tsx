import type { PortableTextBlock, Reference, Rule } from 'sanity'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'
import type { ImageWithAlt } from './imageWithAlt'
import singleItemArray from './singleItemArray'

export type CarouselImage = {
  _type: 'imageWithLinkOrOverlay'
  image: ImageWithAlt
  captionPositionUnderImage?: boolean
  action?: Reference[]
  captionType?: string
}

export default {
  name: 'imageWithLinkOrOverlay',
  title: 'Image with overlay and/or link',
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
      name: 'captionTitle',
      title: 'Caption title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
    },
    {
      name: 'captionText',
      title: 'Caption content',
      type: 'array',
      of: [configureBlockContent({ variant: 'simpleBlock' })],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 600)
        }).error(),
    },
    singleItemArray({
      name: 'action',
      title: 'CTA Link',
      type: 'array',
      of: [{ type: 'linkSelector', title: 'Link' }],
      description: 'Optional link associated with the image.',
    }),
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      alt: 'image.alt',
      caption: 'caption',
    },
    prepare({
      imageUrl,
      caption,
      alt,
    }: {
      imageUrl: string
      alt: string
      caption: string
    }) {
      return {
        title: alt || 'No alt text',
        subtitle: caption || 'No caption',
        media: <img src={imageUrl} alt={alt} style={{ height: '100%' }} />,
      }
    },
  },
}
