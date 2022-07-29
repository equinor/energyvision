import styled from 'styled-components'
import Hit from './Hit'
import { Hits } from './Hits'
import { Heading } from '@components'
import { Pagination } from '../shared/search/pagination/Pagination'
import { FormattedMessage } from 'react-intl'

const StyledNewsList = styled.div`
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

const HeaderText = ({ header }: { header: string }) => {
  if (header === 'magazine') {
    return <FormattedMessage id="magazineindex_list_header" defaultMessage="Stories" />
  }

  return <FormattedMessage id="newsroom_newslist_header" defaultMessage="News" />
}

const NewsList = ({ header, ...rest }: { header: string }) => {
  return (
    <StyledNewsList {...rest}>
      <Heading level="h2" size="lg">
        <HeaderText header={header} />
      </Heading>
      <Hits hitComponent={Hit} />
      <StyledPagination padding={1} hitsPerPage={20} />
    </StyledNewsList>
  )
}

export default NewsList
