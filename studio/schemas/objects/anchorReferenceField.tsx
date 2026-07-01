import type { Rule } from 'sanity'
import { validateAnchorReference } from '../validations/validateAnchorReference'

export const AnchorComponentDescription = () => (
  <>
    <span style={{ display: 'block', marginTop: '4.8px' }}>
      Add an optional anchor reference that can be used to link directly to this
      component.
    </span>
    <span style={{ display: 'block', marginTop: '4.8px' }}>
      Allowed characters are: letters, numbers, hyphens, and underscores. The #
      symbol is not needed.
    </span>
  </>
)

export const AnchorLinkDescription = () => (
  <>
    <span style={{ display: 'block', marginTop: '4.8px' }}>
      Optional: add the anchor reference of the component/section you want to
      link directly to.
    </span>
    <span style={{ display: 'block', marginTop: '4.8px' }}>
      Results cannot be guaranteed for external URLs.
    </span>
  </>
)
export default {
  name: 'anchorReferenceField',
  title: 'Anchor reference',
  type: 'string',
  description: AnchorComponentDescription(),
  validation: (Rule: Rule) =>
    Rule.custom((value: string) => {
      const result = validateAnchorReference(value)
      if (result === true || (Array.isArray(result) && result.length === 0)) {
        return true
      }
      return Array.isArray(result)
        ? result.map(msg => ({ message: msg }))
        : result
    }),
}
