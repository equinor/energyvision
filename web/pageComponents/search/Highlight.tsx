import { Fragment } from 'react'
import { getHighlightedParts, getPropertyByPath } from 'instantsearch.js/es/lib/utils/index.js'
import { v4 as uuidv4 } from 'uuid'
import { decode } from 'html-entities'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import type { HitData } from './UniversalHit'
import { Highlight as TypographyHighlight } from '@/core/Typography'

type Highlight = {
  hit: AlgoliaHit<HitData>
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
          return (
            <TypographyHighlight key={key} className="font-bold">
              {value}
            </TypographyHighlight>
          )
        }
        return <Fragment key={key}>{value}</Fragment>
      })}
    </>
  )
}
