import type { Rule } from 'sanity';
import type { SchemaType } from '../../types';
import { CharacterCountInputText } from '../components/CharacterCountInputText';
//import { SyncDocumentTitleInput } from '../components/SyncDocumentTitleInput'

export default {
  title: 'Fields for title and description meta',
  name: 'titleAndMeta',
  type: 'object',
  validation: (Rule: Rule) =>
    Rule.required().warning(
      'Add a page title and meta description to help users understand this page in search results.',
    ),
  fields: [
    {
      name: 'documentTitle',
      title: 'Page title',
      description: `The page title shown in browser tabs and often used as the headline in search results. Write a clear, unique title that accurately describes the page, placing the main topic first. Aim for 50–60 characters; search engines may shorten or rewrite it.`,
      type: 'string',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.required().warning(
          'Add a clear, unique document title to help users and search engines understand this page.',
        ),
    },
    {
      name: 'metaDescription',
      title: 'Meta description',
      validation: (Rule: Rule) => [
        Rule.required().warning(
          'Add a clear, unique meta description to summarize this page and help users decide whether to visit from search results.',
        ),
        Rule.max(160).warning(
          'Aim for 150–160 characters; search engines may shorten or replace it.',
        ),
      ],
      description: `A short summary of the page that search engines may show below its title in search results. Write a clear, unique description that reflects the content and gives readers a reason to visit.`,
      type: 'text',
      options: { maxLength: 160 },
      components: {
        input: CharacterCountInputText,
      },
    },
  ],
};
