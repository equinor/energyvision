import { Fragment } from 'react'
import { getHighlightedParts, getPropertyByPath } from 'instantsearch.js/es/lib/utils/index.js'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { decode } from 'html-entities'
import type { EventHitType } from './EventHit'
import type { TopicHitType } from './TopicHit'

const StyledSpan = styled.span`
  color: var(--spruce-wood-100);
  font-weight: var(--fontWeight-bold);
`

type Highlight = {
  hit: EventHitType | TopicHitType
  attribute: string
}

export const Highlight: React.FC<Highlight> = ({ hit, attribute }) => {
  const result = hit._snippetResult && attribute in hit._snippetResult ? hit._snippetResult : hit._highlightResult

  const { value: attributeValue = '' } = getPropertyByPath(result, attribute) || {}
  const parts = getHighlightedParts(attributeValue)

  return (
    <>
      {parts.map((part) => {
        // Using index as key is a bad practise, and we need accuracy here to avoid problems with duplication
        const key = uuidv4()
        const value = decode(part.value)
        if (part.isHighlighted) {
          return <StyledSpan key={key}>{value}</StyledSpan>
        }

        return <Fragment key={key}>{value}</Fragment>
      })}
    </>
  )
}
