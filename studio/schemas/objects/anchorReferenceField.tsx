/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { validateAnchorReference } from '../validations/validateAnchorReference'
import styled from 'styled-components'
import { Rule } from '@sanity/types'

const StyledSpan = styled.span`
  display: block;
  margin-top: 0.3em;
`

const description = () => (
  <>
    <StyledSpan>Add an optional anchor reference that can be used to link directly to this component.</StyledSpan>
    <StyledSpan>
      Allowed characters are: letters, numbers, hyphens, and underscores. The # symbol is not needed.
    </StyledSpan>
  </>
)

export default {
  name: 'anchorReferenceField',
  title: 'Anchor reference',
  description: description(),
  type: 'string',
  // @ts-ignore - possible error in @sanity/types with CustomValidatorResult
  validation: (Rule: Rule) => Rule.custom((value: string) => validateAnchorReference(value)),
}
