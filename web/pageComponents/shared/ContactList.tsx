import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import type { ContactListData } from '../../types/types'
import { Text, Heading } from '@components'
import { removeWhiteSpace } from '../../common/helpers/removeWhiteSpace'

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
  &:hover {
    color: var(--moss-green-100);
  }
`

const Location = styled.p`
  margin: var(--space-xSmall) 0;
  font-size: var(--typeScale-1);
`
const Header = styled(Heading)`
  text-align: var(--contactList-titleAlign, left);
  margin: var(--contactList-titleMargin, 0 0 var(--space-xLarge) 0);
`

type ContactListProps = {
  data: ContactListData
} & HTMLAttributes<HTMLDivElement>

const ContactList = ({ data }: ContactListProps) => {
  return (
    <div className="flex flex-col py-0 px-layout-lg max-w-viewport">
      {data?.title && (
        <Header size="xl" level="h2">
          {data.title}
        </Header>
      )}
      {data?.ingress && <Text size="md">{data.ingress}</Text>}
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
    </div>
  )
}

export default ContactList
