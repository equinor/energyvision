'use client'

import type { PortableTextBlock } from '@portabletext/types'
import { useSearchParams } from 'next/navigation'
import { JsonLdScript } from 'next-seo'
import { forwardRef } from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import type { Image as ImageType } from '@/core/Image/imageUtilities'
import { BaseLink } from '@/core/Link/BaseLink'
import { ModalPromotion } from '@/core/Promotion/ModalPromotion'
import { Typography } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'
import { urlForImage } from '@/sanity/lib/utils'
import CallToActions from '@/sections/CallToActions'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import type { LinkData } from '@/types'

export type PersonListItem = {
  id: string
  highlighted?: boolean
  person: {
    id: string
    name: string
    title?: string
    linkedinProfileUrl?: string
    image?: ImageType
    bio?: PortableTextBlock[]
    callToActions?: LinkData[]
    slug?: string
  }
}

export type PersonListData = {
  id: string
  type: 'personList'
  title?: PortableTextBlock[]
  hideTitle?: boolean
  ingress?: PortableTextBlock[]
  items: PersonListItem[]
  designOptions?: {
    background?: {
      backgroundUtility?: ColorKeys
    }
    foreground?: ColorKeys
  }
}

type PersonListProps = {
  data: PersonListData
  anchor?: string
  className?: string
}

const PersonSocialLinks = ({
  person,
}: {
  person: PersonListItem['person']
}) => {
  const socialLinks = person.linkedinProfileUrl
    ? [
        {
          id: 'linkedin',
          href: person.linkedinProfileUrl,
          label: `${person.name} on LinkedIn`,
          icon: FaLinkedin,
        },
      ]
    : []

  if (socialLinks.length === 0) return null

  return (
    <ul className='m-0 flex list-none gap-3 p-0'>
      {socialLinks.map(({ id, href, label, icon: SocialIcon }) => (
        <li key={id}>
          <BaseLink
            href={href}
            type='externalUrl'
            className='focus-visible:envis-outline dark:focus-visible:envis-outline-invert inline-flex rounded-full border border-grey-20 p-2 text-slate-80 hover:bg-grey-20 hover:text-north-sea-100'
          >
            <SocialIcon className='h-6 w-6' aria-hidden='true' />
            <span className='sr-only'>{label}</span>
          </BaseLink>
        </li>
      ))}
    </ul>
  )
}

const buildPersonListJsonLd = (items: PersonListItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: items.length,
  itemListElement: items.map(({ person }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Person',
      name: person.name,
      ...(person.title && { jobTitle: person.title }),
      ...(person.image && {
        image: urlForImage(person.image)?.toString(),
      }),
    },
  })),
})

const PersonList = forwardRef<HTMLDivElement, PersonListProps>(
  function PersonList({ anchor, data, className }, ref) {
    const backgroundUtility = data.designOptions?.background?.backgroundUtility
    const foreground = data.designOptions?.foreground
    const searchParams = useSearchParams()
    // URL hashtag param is set by ModalPromotion as encodeURIComponent(name)
    const activePersonName = searchParams.get('person')
      ? decodeURIComponent(searchParams.get('person') ?? '')
      : null

    return (
      <>
        <JsonLdScript
          data={buildPersonListJsonLd(data.items)}
          scriptKey={`person-list-jsonld-${data.id}`}
        />
        <section
          ref={ref}
          id={anchor}
          className={twMerge(
            'mx-auto w-full max-w-content',
            backgroundUtility &&
              colorKeyToUtilityMap[backgroundUtility]?.background,
            className,
          )}
        >
          {(data?.title || data?.ingress) && (
            <div className='px-layout-sm pb-8 lg:px-layout-lg'>
              {data.title && (
                <Blocks
                  variant='h2'
                  value={data.title}
                  className={twMerge(data?.hideTitle && 'sr-only')}
                />
              )}
              {data.ingress && (
                <Blocks variant='ingress' value={data.ingress} />
              )}
            </div>
          )}

          {(() => {
            const validItems = data.items.filter(item => item.person)
            const highlighted = validItems.find(item => item.highlighted)
            const rest = validItems.filter(item => !item.highlighted)

            const renderCard = (item: PersonListItem) => (
              <ModalPromotion
                className='h-full'
                title={item.person?.name}
                image={item.person?.image}
                ingress={item.person?.title}
                background={foreground}
                imageClassName=''
                modalTitle={item.person?.name}
                initialOpen={
                  !!activePersonName && item.person?.name === activePersonName
                }
                modalContent={
                  <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-6'>
                      {item.person?.image && (
                        <div className='w-[30%] shrink-0'>
                          <Image
                            image={item.person.image}
                            aspectRatio='1:1'
                            imageClassName='rounded-full'
                            className='w-full'
                          />
                        </div>
                      )}
                      <div className='flex flex-col justify-center'>
                        <Typography as='h2' variant='h3'>
                          {item.person?.name}
                        </Typography>
                        {item.person?.title && (
                          <Typography
                            variant='body'
                            className={
                              item.person?.linkedinProfileUrl && 'mb-1'
                            }
                          >
                            {item.person.title}
                          </Typography>
                        )}
                        <PersonSocialLinks person={item.person} />
                      </div>
                    </div>
                    {item.person?.bio && <Blocks value={item.person.bio} />}
                    {item.person?.callToActions && (
                      <CallToActions
                        callToActions={item.person.callToActions}
                      />
                    )}
                  </div>
                }
              />
            )

            return (
              <div className='flex flex-col gap-6 px-layout-sm'>
                {highlighted && (
                  <ul className='m-0 grid list-none grid-cols-[minmax(min(18.75rem,100%),1fr)] justify-center p-0 md:grid-cols-[22rem]'>
                    <li key={highlighted.id} className='flex'>
                      {renderCard(highlighted)}
                    </li>
                  </ul>
                )}
                {rest.length > 0 && (
                  <ul className='m-0 flex list-none flex-wrap justify-center gap-6 p-0'>
                    {rest.map(item => (
                      <li key={item.id} className='flex w-full md:w-75'>
                        {renderCard(item)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })()}
        </section>
      </>
    )
  },
)

export default PersonList
