/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { Rule } from 'sanity'
import { validateAnchorReference } from '../validations/validateAnchorReference'

export const AnchorComponentDescription = () => (
  <>
    <span style={{ display: 'block', wordWrap: 'break-word' }}>
      Add an optional anchor reference that can be used to link directly to this
      component.Allowed characters are: letters, numbers, hyphens, and
      underscores. The # symbol is not needed.
    </span>
  </>
)

export const AnchorLinkDescription = () => (
  <span style={{ display: 'block', wordWrap: 'break-word' }}>
    Optional: add the anchor reference of the component/section you want to link
    directly to. Results cannot be guaranteed for external URLs.
  </span>
)
export default {
  name: 'anchorReferenceField',
  title: 'Anchor reference',
  type: 'string',
  description: AnchorComponentDescription(),
  // @ts-ignore - possible error in sanity with CustomValidatorResult
  validation: (Rule: Rule) =>
    //@ts-ignore
    Rule.custom((value: string) => validateAnchorReference(value)),
}
