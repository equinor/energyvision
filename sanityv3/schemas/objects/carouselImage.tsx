import { ImageWithAlt } from './imageWithAlt'
import type { Reference } from 'sanity'
import { Rule } from 'sanity'


export type CarouselImage = {
  _type: 'carouselImage'
  image: ImageWithAlt
  captionPositionUnderImage?: boolean
  action?: Reference[]
}

export default {
  name: 'carouselImage',
  title: 'Image with options',
  type: 'object',
  options: {
    collapsed: false,
  },
  fields: [
    {
      name: 'image',
      title: 'Image with alt',
      type: 'imageWithAlt',
    },
    {
      name: 'caption',
      title: 'Image caption',
      type: 'string',
    },
    {
      name: 'attribution',
      title: 'Credit',
      type: 'string',
    },
    {
      name: 'action',
      title: 'Link',
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