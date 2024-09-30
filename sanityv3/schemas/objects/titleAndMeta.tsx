import { Rule } from 'sanity'
import { SchemaType } from '../../types'
import { CharCounterEditor } from '../components/CharCounterEditor'

export default {
  title: 'Fields for title and description meta',
  name: 'titleAndMeta',
  type: 'object',
  validation: (Rule: Rule) => [
    Rule.required().warning('It is recommended to complete the SEO fields for better search visibility'),
  ],
  fields: [
    {
      name: 'documentTitle',
      title: 'Document title',
      description: `The HTML title element (<title>) defines the document's title. A <title> tells both users and search
      engines what the topic of a particular page is. You should create a unique title for each page on your site. Choose a
      title that reads naturally and effectively communicates the topic of the page’s content. The frontend will use h1 as a fallback for missing document title.`,
      type: 'string',

      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.required().warning('Ensure the document title is optimized for SEO'),
    },
    {
      name: 'metaDescription',
      title: 'Meta description',
      validation: (Rule: Rule) => [
        Rule.required().warning('Provide an SEO-friendly meta description'),
        Rule.max(160).warning('Google recommends max. 160 chars'),
      ],
      description: `Meta descriptions are HTML attributes that provide concise summaries of webpages.
      It shows up in search results and in social media. Should be max. 160 chars`,
      type: 'text',
      components: {
        input: CharCounterEditor,
      },
    },
  ],
}
