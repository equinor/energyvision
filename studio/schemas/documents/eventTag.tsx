import { tag_special_equipment } from '@equinor/eds-icons';
import type { Rule } from 'sanity';
import {
  getTranslation,
  type TranslationValue,
  translationField,
} from '../../helpers/translation';
import { EdsIcon, TagIcon } from '../../icons';
import { languages } from '../../languages';

// Legacy locale fields kept hidden so existing data is preserved; use translation.
const localeStrings = languages.map((lang) => ({
  name: lang.iso.replace('-', '_'),
  type: 'string',
  title: lang.title,
  readOnly: true,
}));

export default {
  type: 'document',
  name: 'eventTag',
  title: 'Event Tag',
  icon: () => EdsIcon(tag_special_equipment),
  fields: [
    {
      type: 'object',
      name: 'title',
      title: 'Title',
      fields: localeStrings,
      hidden: true,
    },
    translationField({ required: true }),
    {
      title: 'Key',
      name: 'key',
      type: 'slug',
      description:
        "This is a data point, no need to alter it beyond 'generate'",
      validation: (Rule: Rule) => Rule.required(),

      options: {
        source: (doc: { translation?: TranslationValue[] }) =>
          getTranslation(doc.translation),
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-'),
      },
    },
  ],
  orderings: [
    {
      title: 'Title descending',
      name: 'titleDesc',
      by: [{ field: 'key.current', direction: 'desc' }],
    },
    {
      title: 'Title ascending',
      name: 'titleDesc',
      by: [{ field: 'key.current', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      translation: 'translation',
    },
    prepare({ translation }: { translation?: TranslationValue[] }) {
      return {
        title: getTranslation(translation),
        media: TagIcon,
      };
    },
  },
};
