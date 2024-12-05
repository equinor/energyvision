import { ImageWithAlt } from './imageWithAlt'

export type CarouselImage = {
  _type: 'carouselImage'
  image: ImageWithAlt
  captionPositionUnderImage?: boolean
  action?: any
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
    type: 'boolean',
    name: 'captionPositionUnderImage',
    title: 'Position caption and credit under image',
    description: 'Toggle to display caption and credit under the image.',
    initialValue: false,
  },
    {
      name: 'action',
      title: 'Link',
      type: 'linkSelector',
      description: 'Optional link associated with the image.',
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
