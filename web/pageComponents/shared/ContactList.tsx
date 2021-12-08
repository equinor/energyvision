import styled from 'styled-components'
import type { ContactListData } from '../../types/types'
import { Heading } from '@components'
import { removeWhiteSpace } from '../../common/helpers/removeWhiteSpace'

const Wrapper = styled.div`
  margin: var(--space-4xLarge) auto;
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-large);
  max-width: var(--layout-maxContent-narrow);
`
const Contacts = styled.div`
  padding-top: var(--space-small);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`
const Contact = styled.div`
  display: flex;
  padding: var(--space-small) 0;
  flex-basis: 35%;
  justify-content: left;
  flex-direction: column;
`
const Phone = styled.a`
  margin: var(--space-xSmall) 0;
  color: var(--grey-70);
  font-size: var(--typeScale-0);
`

const Location = styled.p`
  margin: var(--space-xSmall) 0;
  font-size: var(--typeScale-1);
`
const Header = styled(Heading)``

type ContactListProps = {
  data: ContactListData
}

const ContactList = ({ data }: ContactListProps) => {
  return (
    <Wrapper>
      {data.title && (
        <Header size="lg" level="h2">
          {data.title}
        </Header>
      )}
      {data?.contacts && data?.contacts.length > 0 && (
        <Contacts>
          {data.contacts.map((contact) => {
            return (
              <Contact key={contact._key}>
                <Location>{contact.location} </Location>
                <Phone href={`tel:${removeWhiteSpace(contact.phone)}`}>{contact.phone}</Phone>
              </Contact>
            )
          })}
        </Contacts>
      )}
    </Wrapper>
  )
}

export default ContactList
