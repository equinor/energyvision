import styled from 'styled-components'
import { forwardRef } from 'react'
import { Typography } from '@equinor/eds-core-react'
import { Heading, HeadingProps } from '@components'

const Wrapper = styled.div`
  margin: var(--space-4xLarge) auto;
  display: flex;
  flex-direction: column;
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: 1700px;
`
const Contacts = styled.div`
  padding-top: var(--space-small);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`
const Contact = styled.div`
  display: flex;
  padding: var(--space-small) 0;
  flex-basis: calc(50% - 1rem);
  justify-content: center;
  flex-direction: column;
`
const Phone = styled.p`
  margin: var(--space-xSmall) 0;
`

const Location = styled.p`
  margin: var(--space-xSmall) 0;
`
const Header = styled(Heading)``

const ContactList = () => {
  return (
    <Wrapper>
      <Header size="lg" level="h2">
        Phone numbers for Q&A
      </Header>
      <Contacts>
        <Contact>
          <Location>Norway </Location>
          <Phone>+47 239 600 36</Phone>
        </Contact>
        <Contact>
          <Location>Norway </Location>
          <Phone>+47 239 600 36</Phone>
        </Contact>
        <Contact>
          <Location>Norway </Location>
          <Phone>+47 239 600 36</Phone>
        </Contact>
        <Contact>
          <Location>Norway </Location>
          <Phone>+47 239 600 36</Phone>
        </Contact>
      </Contacts>
    </Wrapper>
  )
}

export default ContactList
