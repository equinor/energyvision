import { SchemaType } from '../../types'

export default {
  name: 'relatedLinks',
  type: 'array',
  title: 'Related links',
  of: [
    { type: 'linkSelector', title: 'Link' },
    { type: 'downloadableFile', title: 'Downloadable file' },
    { type: 'downloadableImage', title: 'Downloadable image' },
  ],
  validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationResult => Rule.unique(),
}
