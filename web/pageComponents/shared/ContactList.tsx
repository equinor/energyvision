import type { ContactListData } from '../../types/index'
import { Text, Heading } from '@components'
import { removeWhiteSpace } from '../../common/helpers/removeWhiteSpace'
import { twMerge } from 'tailwind-merge'

type ContactListProps = {
  data: ContactListData
  className?: string
}

const ContactList = ({ data, className = '' }: ContactListProps) => {
  return (
    <div className={twMerge(`flex flex-col pb-page-content px-layout-lg max-w-viewport`, className)}>
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
