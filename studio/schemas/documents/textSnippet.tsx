import { languages } from '../../languages'
import { SearchWeights } from '../searchWeights'
import { Flags } from '../../src/lib/datasetHelpers'

const fields = languages.map((lang) => ({
  title: `${lang.title} value`,
  name: lang.name,
  description: `The ${lang.id} translation`,
  type: 'string',
}))

const textSnippet = {
  type: 'document',
  title: `Text Snippet`,
  name: `textSnippet`,
  fields: fields,
}

export default Flags.IS_DEV
  ? textSnippet
  : {
      ...textSnippet,
      __experimental_search: languages.map((lang) => ({ weight: SearchWeights.TextSnippet, path: lang.name })),
    }