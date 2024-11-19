import type { ImageWithAlt } from './imageWithAlt'

export type ImageWithAltAndCaption = {
  _type: 'imageWithAltAndCaption'
  image: ImageWithAlt
  caption?: string
  attribution?: string
}

export const getImageWithAltAndCaptionFields = (showCaptionToggle?: boolean) => [
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
    hidden: !showCaptionToggle,
  },
]

export default {
  name: 'imageWithAltAndCaption',
  title: 'Image',
  type: 'object',
  options: {
    collapsed: false,
  },
  fields: getImageWithAltAndCaptionFields(),
  preview: {
    select: {
      imageUrl: 'image.asset.url',
      alt: 'image.alt',
      caption: 'caption',
      captionPositionUnderImage: 'captionPositionUnderImage',
    },
    prepare({ imageUrl, caption, alt }: { imageUrl: string; alt: string; caption: string }) {
      return {
        title: alt || 'No alt text',
        subtitle: caption || 'No caption provided',
        media: imageUrl ? <img src={imageUrl} alt={alt || ''} style={{ height: '100%' }} /> : null,
      }
    },
  },
}