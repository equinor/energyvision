import { Colors } from '../../helpers/ColorListValues'
import type { Rule, Reference } from '@sanity/types'
import type { ImageWithAltAndCaption } from './imageWithAltAndCaption'
import type { ColorListValue } from 'sanity-plugin-color-list'

export type Figure = {
  _type: 'figure'
  figure: ImageWithAltAndCaption
  background?: ColorListValue
}

export default {
  name: 'figure',
  title: 'Image',
  type: 'object',
  description: 'Image with optional caption and credit.',

  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'figure',
      title: 'Image',
      type: 'imageWithAltAndCaption',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: true,
        list: Colors,
      },
      fieldset: 'design',
      initialValue: Colors[0],
    },
  ],
  preview: {
    select: {
      alt: 'figure.image.alt',
      image: 'figure.image.asset',
    },
    prepare({ alt, image }: { alt: string; image: Reference }) {
      const altText = alt === undefined ? 'Decorative image' : alt
      return {
        title: `Alt text: ${altText}`,
        subtitle: 'Image',
        media: image,
      }
    },
  },
}
