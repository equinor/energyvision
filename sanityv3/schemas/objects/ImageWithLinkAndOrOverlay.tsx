import { ImageWithAlt } from './imageWithAlt'
import type { PortableTextBlock, Reference } from 'sanity'
import { Rule } from 'sanity'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'
import singleItemArray from './singleItemArray'

export type CarouselImageWithLinkAndOrOverlay = {
  _type: 'imageWithLinkAndOrOverlay'
  image: ImageWithAlt
  captionTeaserTitle?: string
  captionTitle?: PortableTextBlock[]
  captionText?: PortableTextBlock[]
  action?: Reference[]
}

export default {
  name: 'imageWithLinkAndOrOverlay',
  title: 'Image with link and/or overlay',
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
      name: 'captionTeaserTitle',
      title: 'Caption teaser title',
      description: 'Teaser title to introduce overlay content',
      type: 'string',
    },
    {
      name: 'captionTitle',
      title: 'Caption title',
      description: 'Displays title in overlay',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
    },
    {
      name: 'captionText',
      title: 'Caption content',
      description: 'Displays title in overlay',
      type: 'array',
      of: [configureBlockContent({ variant: 'simpleBlock' })],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 200, true)
        }).error(),
    },
    singleItemArray({
      name: 'action',
      title: 'CTA Link',
      description:
        'Optional. Displays link label and arrow on image when used alone. Displays in overlay, label is hidden, when used with caption title or content.',
      type: 'array',
      of: [{ type: 'linkSelector', title: 'Link' }],
    }),
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      captionTeaserTitle: 'captionTeaserTitle',
    },
    prepare({ imageUrl, captionTeaserTitle }: { imageUrl: string; captionTeaserTitle: string }) {
      return {
        title: 'Image with link and or overlay',
        subtitle: captionTeaserTitle || '',
        media: <img src={imageUrl} alt="" style={{ height: '100%' }} />,
      }
    },
  },
}
