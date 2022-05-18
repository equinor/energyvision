import { languages } from '../../languages'
import { SearchWeights } from '../searchWeights'

const fields = languages.map((lang) => ({
  title: `${lang.title} value`,
  name: lang.name,
  description: `The ${lang.id} translation`,
  type: 'string',
}))

export default {
  type: 'document',
  title: `Text Snippet`,
  name: `textSnippet`,
  fields: fields,
  __experimental_search: languages.map((lang) => ({ weight: SearchWeights.TextSnippet, path: lang.name })),
}
