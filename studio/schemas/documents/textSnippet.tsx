import { text_field } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { isoToSchemaName, languages } from '../../languages'

const fields = languages.map((lang) => ({
  title: `${lang.title} value`,
  name: isoToSchemaName(lang.iso),
  description: `The ${lang.id} translation`,
  type: 'string',
}))

export default {
  type: 'document',
  title: `Text Snippet`,
  name: `textSnippet`,
  icon: () => EdsIcon(text_field),
  fields: fields,
}
