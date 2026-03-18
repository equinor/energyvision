/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { Rule } from 'sanity'
import { validateAnchorReference } from '../validations/validateAnchorReference'

export default {
  name: 'anchorReferenceField',
  title: 'Anchor reference',
  type: 'string',
  description: () => (
    <>
      <span style={{ display: 'block', wordWrap: 'break-word' }}>
        Insert the anchor id, which needs to match the id in the corresponding
        Anchorlink block component right before the section one wants to jump
        to. Use letters, numbers, hyphens and underscores. # is not needed.
      </span>
    </>
  ),
  // @ts-ignore - possible error in sanity with CustomValidatorResult
  validation: (Rule: Rule) =>
    //@ts-ignore
    Rule.custom((value: string) => validateAnchorReference(value)),
}
