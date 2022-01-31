import { validateAnchorReference } from '../validations/validateAnchorReference'
import { Rule } from '@sanity/types'

export default {
  name: 'anchorReferenceField',
  title: 'Anchor reference',
  description:
    'Add an optional anchor reference that can be used to link directly to this component. Allowed characters are: letters, numbers, hyphens, and underscores.',
  type: 'string',
  validation: (Rule: Rule) => Rule.custom((value: string) => validateAnchorReference(value)),
}
