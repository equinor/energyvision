import { Fragment } from 'react'
import { getHighlightedParts, getPropertyByPath } from 'instantsearch.js/es/lib/utils/index.js'
import styled from 'styled-components'
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
  const { value: attributeValue = '' } = getPropertyByPath(hit._highlightResult, path) || {}
  const parts = getHighlightedParts(attributeValue)

  return (
    <>
      {parts.map((part) => {
        if (part.isHighlighted) {
          return <StyledSpan key={`${hit.objectID}-${path}-${part.value}`}>{part.value}</StyledSpan>
        }

        return <Fragment key={`${hit.objectID}-${path}-${part.value}`}>{part.value}</Fragment>
      })}
    </>
  )
}
