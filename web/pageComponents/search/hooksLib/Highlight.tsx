import { Fragment } from 'react'
import { getHighlightedParts, getPropertyByPath } from 'instantsearch.js/es/lib/utils/index.js'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import type { Hit } from './Hit'

const StyledSpan = styled.span`
  color: var(--lichen-green-100);
  font-weight: var(--fontWeight-bold);
`

type Highlight = {
  hit: Hit
  path: string
}

export const Highlight: React.FC<Highlight> = ({ hit, path }) => {
  // Only ingress is currently available as snippet
  const property = path === 'ingress' ? hit._snippetResult : hit._highlightResult

  const { value: attributeValue = '' } = getPropertyByPath(property, path) || {}
  const parts = getHighlightedParts(attributeValue)

  return (
    <>
      {parts.map((part) => {
        // Using index as key is a bad practise, and we need accuracy here to avoid problems with duplication
        const key = uuidv4()

        if (part.isHighlighted) {
          return <StyledSpan key={key}>{part.value}</StyledSpan>
        }

        return <Fragment key={key}>{part.value}</Fragment>
      })}
    </>
  )
}
