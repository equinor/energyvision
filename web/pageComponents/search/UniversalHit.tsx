import { Highlight } from './Highlight'
import getConfig from 'next/config'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import HitHeading from './hit/HitHeading'
import DisplayLink from './hit/DisplayLink'
import { FormattedDate } from '@components'
import { useRouter } from 'next/router'
import { defaultLanguage } from '../../languages'
import { default as NextLink } from 'next/link'

export type HitData = {
  slug?: string
  type?: string
  pageTitle?: string
  ingress?: string
  text?: string
  publishDateTime?: string
  eventDescription?: string
  eventDate?: string
  title?: string
}

export type UniversalHitType = AlgoliaHit<HitData>
export type HitProps = { hit: UniversalHitType }

const buildDisplayURL = (slug = '', locale: string | undefined): string => {
  const { publicRuntimeConfig } = getConfig()
  const startsWithLocale = slug.startsWith(`${locale}/`) || slug.startsWith(`/${locale}/`)

  return locale && locale !== defaultLanguage?.locale && !startsWithLocale
    ? `${publicRuntimeConfig.domain}/${locale}/${slug.replace(/^\//, '')}`
    : `${publicRuntimeConfig.domain}${slug}`
}

const UniversalHit: React.FC<HitProps> = ({ hit }) => {
  const { slug = '', title, ingress, text, eventDescription, eventDate, publishDateTime, pageTitle, type } = hit
  const { locale } = useRouter()
  const fullUrl = buildDisplayURL(slug, locale)
  const formattedDate = eventDate || publishDateTime

  // Define text attributes with conditional class names
  const textAttributes = [
    { key: 'title', value: title, className: 'text-sm' },
    { key: 'pageTitle', value: pageTitle, className: 'text-sm' },
    { key: 'ingress', value: ingress, className: type === 'event' ? 'text-2xs' : 'text-xs' },
    { key: 'eventDescription', value: eventDescription, className: type === 'event' ? 'text-2xs' : 'text-xs' },
    { key: 'text', value: text, className: 'text-xs' },
  ]

  console.log('UniversalHit', hit)

  return (
    <article>
      <NextLink className="py-4 px-0 block cursor-pointer outline-none" href={slug} prefetch={false}>
        {formattedDate && type !== 'magazine' && (
          <p className={`block tracking-wide ${type === 'news' ? 'text-2xs' : 'text-xs'}`}>
            <FormattedDate uppercase datetime={formattedDate} />
          </p>
        )}

        {textAttributes.map(({ key, value, className }) =>
          value ? (
            <p key={key} className={`${className} m-0 leading-cloudy`}>
              <Highlight hit={hit} attribute={key} />
            </p>
          ) : null,
        )}

        <DisplayLink>{fullUrl}</DisplayLink>
      </NextLink>
    </article>
  )
}

export default UniversalHit
