import { ImageWithAlt } from './imageWithAlt'
import type { PortableTextBlock, Reference } from 'sanity'
import { defineField, Rule } from 'sanity'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'

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
      of: [configureTitleBlockContent()],
    },
    {
      name: 'captionText',
      title: 'Caption content',
      type: 'array',
      of: [blockContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 600)
        }).error(),
    },
    {
      name: 'action',
      title: 'CTA Link',
      type: 'array',
      of: [{ type: 'linkSelector', title: 'Link' }],
      description: 'Optional link associated with the image.',
      validation: (Rule: Rule) => Rule.max(1).error('Only one action is permitted'),
    },
  ],
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      alt: 'image.alt',
      caption: 'caption',
    },
    prepare({ imageUrl, caption, alt }: { imageUrl: string; alt: string; caption: string }) {
      return {
        title: alt || 'No alt text',
        subtitle: caption || 'No caption',
        media: <img src={imageUrl} alt={alt} style={{ height: '100%' }} />,
      }
    },
  },
}
