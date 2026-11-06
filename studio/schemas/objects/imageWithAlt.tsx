import type {
  CustomValidatorResult,
  Reference,
  Rule,
  ValidationContext,
} from 'sanity';
import { DecorativeImageInfo } from '../components/Details/DecorativeImageInfo';

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
      if (
        !image?.asset ||
        image.isDecorative ||
        (typeof image.alt === 'string' && image.alt.trim())
      )
        return true;

      return 'Alt attribute is required. Add alternative text or mark the image as decorative.';
    }),
  fields: [
    {
      name: 'decorativeImageInfo',
      type: 'string',
      title: 'When should I set image as decorative?',
      readOnly: true,
      components: {
        field: DecorativeImageInfo,
      },
    },
    {
      name: 'isDecorative',
      type: 'boolean',
      title: 'Image is only decorative',
      description:
        'Please note that this makes the image invisible for screen reader users.',
    },
    {
      name: 'alt',
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
