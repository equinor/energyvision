import React from 'react'

type PreviewProps = {
  imageUrl: string
  alt: string
  caption: string
}

type ImageWithAltAndCaptionPreview = {
  title: string
  subtitle: string
  media: JSX.Element
}

export default {
  name: 'imageWithAltAndCaption',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'inlineImage',
      title: 'Image with alt',
      type: 'imageWithAlt',
    },
    {
      name: 'caption',
      title: 'Image caption',
      type: 'string',
    },
  ],
  preview: {
    select: {
      imageUrl: 'inlineImage.asset.url',
      alt: 'inlineImage.alt',
      caption: 'caption',
    },
    prepare({ imageUrl, caption, alt }: PreviewProps): ImageWithAltAndCaptionPreview {
      return {
        title: alt,
        subtitle: caption,
        media: <img src={imageUrl} alt={alt} style={{ height: '100%' }} />,
      }
    },
  },
}
