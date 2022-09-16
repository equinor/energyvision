import { useMenu, UseMenuProps, useClearRefinements } from 'react-instantsearch-hooks-web'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import MagazineTagBar from '../../shared/MagazineTagBar'

export type RefinementListProps = React.ComponentProps<'div'> & UseMenuProps
const NoRelevant = styled.span`
  padding: var(--space-small) 0;
  display: inline-block;
  padding: var(--space-small) var(--space-large);
`
export function MagazineTagFilter(props: RefinementListProps) {
  const { items, refine } = useMenu(props)
  const { refine: clear } = useClearRefinements()
  const tagLinks = items.map((e) => ({ href: '#', label: e.value, active: e.isRefined }))
  return (
    <>
      {items.length > 0 ? (
        <MagazineTagBar
          tags={tagLinks}
          onClick={(value: string) => {
            if (value === 'ALL') {
              clear()
            } else refine(value)
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
