import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks'
import { List, Checkbox } from '@components'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

export type RefinementListProps = React.ComponentProps<'div'> & UseRefinementListProps

const { Item } = List

const NoRelevant = styled.span`
  padding: var(--space-small) 0;
  display: inline-block;
  padding: var(--space-small) var(--space-large);
`
const StyledList = styled(List)`
  margin: var(--space-medium) 0;
`

const StyledItem = styled(Item)`
  padding-left: var(--space-small);
`
export function RefinementList(props: RefinementListProps) {
  const { items, refine } = useRefinementList(props)

  return (
    <>
      {items.length > 0 ? (
        <>
          <StyledList unstyled>
            {items.map((item) => (
              <StyledItem key={item.value}>
                <Checkbox
                  value={item.value}
                  label={`${item.label} (${item.count})`}
                  checked={item.isRefined}
                  onChange={() => refine(item.value)}
                ></Checkbox>
              </StyledItem>
            ))}
          </StyledList>
        </>
      ) : (
        <NoRelevant>
          <FormattedMessage id="newsroom_no_relevant_filters" defaultMessage="No relevant content for this filter" />
        </NoRelevant>
      )}
    </>
  )
}
