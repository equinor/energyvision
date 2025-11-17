import type { ContactListData } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@/core/Typography'
import { removeWhiteSpace } from '@/lib/helpers/removeWhiteSpace'

type ContactListProps = {
  data: ContactListData
  className?: string
}

const ContactList = ({ data, className = '' }: ContactListProps) => {
  return (
    <div className={twMerge(`sm:px-layout-lg" flex flex-col px-layout-sm py-20`, className)}>
      {data?.title && (
        <Typography className="pb-6 text-left" variant="xl" as="h2">
          {data.title}
        </Typography>
      )}
      {data?.ingress && (
        <Typography variant="h5" className="pb-4">
          {data.ingress}
        </Typography>
      )}
      {data?.contacts && data?.contacts.length > 0 && (
        <div className="flex flex-row flex-wrap justify-between">
          {data.contacts.map((contact) => {
            return (
              <div className="justify-left flex basis-2/5 flex-col py-2" key={contact._key}>
                <p className="my-2 text-md">{contact.location} </p>
                <a
                  className="my-2 text-xs text-gray-600 hover:text-moss-green-100"
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
