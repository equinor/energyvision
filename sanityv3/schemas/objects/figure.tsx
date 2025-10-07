import type { Reference, Rule } from 'sanity'
import type { ColorSelectorValue } from '../components/ColorSelector'
import type { ImageWithAltAndCaption } from './imageWithAltAndCaption'

export type Figure = {
  _type: 'figure'
  figure: ImageWithAltAndCaption
  background?: ColorSelectorValue
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
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: 'original', value: 'original' },
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '2:3', value: '2:3' },
          { title: '1:1', value: '1:1' },
        ],
      },
      initialValue: '16:9',
    },
    {
      name: 'figure',
      title: 'Image',
      type: 'imageWithAltAndCaption',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Align with text width',
      description:
        'Since text width (readability 810px) is smaller than the inner content grid, setting this will align image with the text width',
      name: 'alignWithText',
      type: 'boolean',
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
  ],
  preview: {
    select: {
      alt: 'figure.image.alt',
      caption: 'figure.caption',
      credit: 'figure.attribution',
      image: 'figure.image.asset',
      aspectRatio: 'aspectRatio',
      background: 'background',
    },
    prepare({
      alt,
      image,
      aspectRatio,
      credit,
      caption,
      background,
    }: {
      alt: string
      image: Reference
      aspectRatio?: string
      credit?: string
      caption?: string
      background?: string
    }) {
      return {
        title: `${aspectRatio} image ${alt ? '| alt ' : ''}${credit ? '| credit ' : ''}${caption ? '| caption ' : ''} `,
        subtitle: `Image component ${background ? `| ${background?.title}` : ''}`,
        media: image,
      }
    },
  },
}
