import styled from 'styled-components'
import Hit from './Hit'
import { Hits } from './Hits'
import { Heading } from '@components'
import { Pagination } from '../../pageComponents/search/Pagination'

const StyledNewsList = styled.div``

const StyledPagination = styled(Pagination)`
  padding-top: var(--space-medium);
`

const NewsList = ({ ...rest }) => {
  return (
    <StyledNewsList {...rest}>
      <Heading level="h2" size="lg">
        News
      </Heading>
      <Hits hitComponent={Hit} />
      <StyledPagination padding={1} hitsPerPage={20} />
    </StyledNewsList>
  )
}

export default NewsList
