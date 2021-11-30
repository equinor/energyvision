import styled from 'styled-components'
import { forwardRef } from 'react'
import { Typography } from '@equinor/eds-core-react'

const Wrapper = styled.div`
  margin-top: var(--space-medium);

  display: block;
  width: 18rem;
  margin-top: 0;
  padding-left: var(--space-medium);
  border-left: 1px solid var(--grey-30);
`

const Header = styled(Typography)``

const ContactList = () => {
  return (
    <Wrapper>
      <Header> Phone numbers for Q&A </Header>
    </Wrapper>
  )
}

export default ContactList
