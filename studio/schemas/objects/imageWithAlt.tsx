import type {
  CustomValidatorResult,
  Reference,
  Rule,
  ValidationContext,
} from 'sanity';

export type ImageWithAlt = {
  _type: string;
  asset: Reference;
  isDecorative?: boolean;
  alt?: string;
};

export default {
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    collapsed: false,
  },
  validation: (Rule: Rule) =>
    Rule.custom<ImageWithAlt>((image) => {
      if (!image?.asset || image.isDecorative || image.alt) return true;

      return 'Alt attribute is required. Expand Accessibility to add alternative text or mark the image as decorative.';
    }),
  fieldsets: [
    {
      name: 'accessibility',
      title: 'Accessibility',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'isDecorative',
      fieldset: 'accessibility',
      type: 'boolean',
      title: 'Image is only decorative',
      description:
        'Please note that this makes the image invisible for screen reader users.',
    },
    {
      name: 'alt',
      fieldset: 'accessibility',
      type: 'string',
      title: 'Alternative text for screen readers',
      description: 'Recommended. Describe whats seen in the image.',
      validation: (Rule: Rule) =>
        Rule.custom(
          (
            value: string,
            context: ValidationContext,
          ): CustomValidatorResult => {
            const { parent } = context as { parent: ImageWithAlt };

            // Only  make the alt tag required if an image has been selected
            if (!parent?.asset) return true;

            // Alt tag should only be required if the image is not decorative
            if (!parent?.isDecorative && !value) {
              return 'Alt attribute is required';
            }

            return true;
          },
        ),
    },
  ],
};
