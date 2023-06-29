import type { ImageWithAlt } from './imageWithAlt'
import { HeroTypes } from '../HeroTypes'

export type ImageWithAltAndCaption = {
  _type: 'imageWithAltAndCaption'
  image: ImageWithAlt
  caption?: string
  attribution?: string
}

export default {
  name: 'imageWithAltAndCaption',
  title: 'Image',
  type: 'object',
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
      hidden: ({ document }: any) => document?.heroType === HeroTypes.FIFTY_FIFTY,
    },
    {
      name: 'attribution',
      title: 'Credit',
      type: 'string',
      hidden: ({ document }: any) => document?.heroType === HeroTypes.FIFTY_FIFTY,
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
        title: alt,
        subtitle: caption,
        media: <img src={imageUrl} alt={alt} style={{ height: '100%' }} />,
      }
    },
  },
}
