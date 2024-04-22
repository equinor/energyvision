import type { ContactListData } from '../../types/types'
import { Text, Heading } from '@components'
import { removeWhiteSpace } from '../../common/helpers/removeWhiteSpace'
import { twMerge } from 'tailwind-merge'

<<<<<<< HEAD
=======
const Wrapper = styled.div`
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

>>>>>>> 9127c9a3 (:art: update)
type ContactListProps = {
  data: ContactListData
  className?: string
}

<<<<<<< HEAD
const ContactList = ({ data }: ContactListProps) => {
  return (
    <div className="flex flex-col pb-page-content px-layout-lg max-w-viewport">
=======
const ContactList = ({ data, className = '', ...rest }: ContactListProps) => {
  return (
    <Wrapper {...rest} className={twMerge(`my-28 mx-auto flex flex-col py-0 px-6`, className)}>
>>>>>>> 9127c9a3 (:art: update)
      {data?.title && (
        <Heading className="pb-6 text-left" size="xl" level="h2">
          {data.title}
        </Heading>
      )}
      {data?.ingress && <Text size="md">{data.ingress}</Text>}
      {data?.contacts && data?.contacts.length > 0 && (
        <div className="flex flex-row flex-wrap justify-between">
          {data.contacts.map((contact) => {
            return (
              <div className="flex basis-2/5 justify-left flex-col py-2" key={contact._key}>
                <p className="my-2 text-md">{contact.location} </p>
                <a
                  className="my-2 text-gray-600 text-xs hover:text-moss-green-100"
                  href={`tel:${removeWhiteSpace(contact.phone)}`}
                >
                  {contact.phone}
                </a>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ContactList
