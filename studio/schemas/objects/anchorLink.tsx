import React from 'react'
import { Rule } from '@sanity/types'
import styled from 'styled-components'
import { validateAnchorReference } from '../validations/validateAnchorReference'

const StyledSpan = styled.span`
  display: block;
  margin-top: 0.3em;
`

export const AnchorComponentDescription = () => (
  <>
    <StyledSpan>Add an optional anchor reference that can be used to link directly to this component.</StyledSpan>
    <StyledSpan>
      Allowed characters are: letters, numbers, hyphens, and underscores. The # symbol is not needed.
    </StyledSpan>
  </>
)

// export const AnchorLinkDescription = () => (
//   <>
//     <StyledSpan>Optional: add the anchor reference of the component/section you want to link directly to.</StyledSpan>
//     <StyledSpan>Results cannot be guaranteed for external URLs.</StyledSpan>
//   </>
// )

export type AnchorLink = {
  _type: 'anchorLink'
}
export default {
  title: 'Anchor Link',
  description: 'This component is to be used to display Id',
  name: 'anchorLink',
  type: 'object',

  fields: [
    {
      name: 'anchorReferenceField',
      title: 'Anchor reference',
      type: 'string',
      description: AnchorComponentDescription(),
      validation: (Rule: Rule) => Rule.custom((value: string) => validateAnchorReference(value)),
    },
  ],
}
