import React from 'react'

export default {
  type: 'object',
  name: 'downloadableImage',
  title: 'Image',
  fields: [
    { name: 'label', type: 'string', title: 'Label' },
    { name: 'image', type: 'image', title: 'Image' },
  ],
  preview: {
    select: {
      title: 'label',
      image: 'image',
    },
    prepare({ title = '', image }: { title: string; image: any }) {
      return {
        title,
        media: image,
        subtitle: 'Image',
      }
    },
  },
}
