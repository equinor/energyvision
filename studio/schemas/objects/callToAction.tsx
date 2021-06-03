import { SchemaType } from '../../types'
import { Colors } from '../../helpers/ColorListValues'

export default {
  type: 'object',
  name: 'callToAction',
  title: 'Call to action',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'action',
      type: 'array',
      title: 'Call to action',
      of: [
        { type: 'internalUrl', title: 'Call to action: Internal link' },
        { type: 'externalUrl', title: 'Call to action: External link' },
        { type: 'downloadableImage', title: 'Call to action: Download image' },
        { type: 'downloadableFile', title: 'Call to action: Download file' },
      ],
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
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
      title: 'action[0].label',
      media: 'action[0].image',
      type: 'action[0]._type',
      /* Let's rename this to label? */
      filename: 'action[0].filename',
    },
    prepare({ title = '', media, type, filename }: { title: string; media: any; type: string; filename: string }) {
      return {
        title: title || filename,
        media,
        subtitle: `Call to action: ${type}`,
      }
    },
  },
}
