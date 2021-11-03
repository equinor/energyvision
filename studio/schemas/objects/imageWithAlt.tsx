import type { Rule, ValidationContext, CustomValidatorResult, Reference } from '@sanity/types'

export type ImageWithAlt = {
  _type: string
  asset: Reference
  isDecorative?: boolean
  alt?: string
}

export default {
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'isDecorative',
      type: 'boolean',
      title: 'Image is decorative',
      description:
        'If this image is purely decorative you can disable the alt tag input here. Please note that this makes the image invisible for screen reader users.',
      options: {
        isHighlighted: true,
      },
      initialValue: false,
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alt text',
      description: 'Alt attribute text description for image',
      options: {
        isHighlighted: true,
      },
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext): CustomValidatorResult => {
          const { parent } = context as { parent: ImageWithAlt }

          if (!parent?.isDecorative && !value) {
            return 'Alt attribute is required'
          }

          return true
        }),
      hidden: ({ parent }: { parent: ImageWithAlt }) => parent?.isDecorative === true,
    },
  ],
}
