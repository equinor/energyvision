import { ImageWithAltAndCaption } from './imageWithAltAndCaption'

export type CarouselImage = {
  _type: 'carouselImage'
  image: ImageWithAltAndCaption
  caption?: string
  attribution?: string
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
      title: 'Image with alt and Caption',
      type: 'imageWithAltAndCaption',
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
      imageUrl: 'image.image.asset.url',
      alt: 'image.image.alt',
      caption: 'image.caption',
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
