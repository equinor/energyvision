import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import MagazineTagBar from '../../shared/MagazineTagBar'

export type RefinementListProps = React.ComponentProps<'div'> & UseRefinementListProps

const NoRelevant = styled.span`
  padding: var(--space-small) 0;
  display: inline-block;
  padding: var(--space-small) var(--space-large);
`
export function MagazineTagFilter(props: RefinementListProps) {
  const { items, refine, createURL } = useRefinementList(props)
  const tagLinks = items.map((e) => ({ link: createURL(e.value), label: e.value }))
  return (
    <>
      {items.length > 0 ? (
        <MagazineTagBar
          tags={tagLinks}
          onClick={(e: any) => {
            refine(e.value)
          }}
          isIndexPage
        />
      ) : (
        <NoRelevant>
          <FormattedMessage id="newsroom_no_relevant_filters" defaultMessage="No relevant content for this filter" />
        </NoRelevant>
      )}
    </>
  )
}
