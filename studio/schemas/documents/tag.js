import { tag_more } from '@equinor/eds-icons';
import { getTranslation, translationField } from '../../helpers/translation';
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
  name: `tag`,
  title: `Tag`,
  icon: () => EdsIcon(tag_more),
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
      validation: (Rule) => Rule.required(),

      options: {
        source: (doc) => getTranslation(doc.translation),
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-'),
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
    prepare({ translation }) {
      return {
        title: getTranslation(translation),
        media: TagIcon,
      };
    },
  },
};
