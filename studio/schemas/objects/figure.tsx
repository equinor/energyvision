import { SchemaType } from '../../types'
import { Colors } from '../../helpers/ColorListValues'

export default {
  name: 'figure',
  title: 'Image (what is a good name)',
  type: 'object',
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
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
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
    prepare({ alt, image }: { alt: string; image: any }) {
      return {
        title: `Alt text: ${alt}`,
        subtitle: 'Image',
        media: image,
      }
    },
  },
}
