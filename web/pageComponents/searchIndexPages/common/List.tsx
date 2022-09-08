import styled from 'styled-components'
import Hit from './Hit'
import { Hits } from './Hits'
import { Heading } from '@components'
import { Pagination } from '../../shared/search/pagination/Pagination'
import { FormattedMessage } from 'react-intl'

const StyledList = styled.div`
  padding: 0 var(--space-large);

  @media (min-width: 800px) {
    padding: 0;
    display: grid;
    grid-template-rows: var(--space-56) min-content min-content;
  }
`

const StyledPagination = styled(Pagination)`
  margin-top: var(--space-medium);
`

const HeaderText = ({ filterType }: { filterType: 'news' | 'magazine' }) => {
  if (filterType === 'magazine') {
    return <FormattedMessage id="magazineindex_list_header" defaultMessage="Stories" />
  }

  return <FormattedMessage id="newsroom_newslist_header" defaultMessage="News" />
}

const List = ({ filterType, ...rest }: { filterType: 'news' | 'magazine' }) => {
  return (
    <StyledList {...rest}>
      <Heading level="h2" size="lg">
        <HeaderText filterType={filterType} />
      </Heading>
      <Hits hitComponent={Hit} />
      <StyledPagination padding={1} hitsPerPage={20} />
    </StyledList>
  )
}

export default List