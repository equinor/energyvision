import { Highlight } from './Highlight'
import getConfig from 'next/config'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import DisplayLink from './hit/DisplayLink'
import { FormattedDate } from '@/core/FormattedDateTime'
import { defaultLanguage } from '../../languages'
import { default as NextLink } from 'next/link'
import { Typography } from '@/core/Typography'
import { useLocale } from 'next-intl'

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
  const locale = useLocale()
  const fullUrl = buildDisplayURL(slug, locale)
  const formattedDate = eventDate || publishDateTime

  return (
    <article>
      <NextLink className="py-6 px-0 block cursor-pointer outline-hidden" href={slug} prefetch={false}>
        {formattedDate && type !== 'magazine' && (
          <Typography className={`block tracking-wide ${type === 'news' ? 'text-2xs' : 'text-xs'}`}>
            <FormattedDate uppercase datetime={formattedDate} />
          </Typography>
        )}
        {pageTitle && (
          <Typography className="relative inline-block" level="h2" size="sm">
            <span className="hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-mist-blue-100">
              <Highlight hit={hit} attribute="pageTitle" />
            </span>
          </Typography>
        )}
        {title && pageTitle && <br />}
        {title && (
          <Typography
            level="h2"
            size="sm"
            className={`relative inline-block ${pageTitle && title ? 'text-xs' : 'hover:underline'}`}
          >
            <span
              className={`${
                pageTitle && title ? 'text-xs' : 'hover:underline'
              } focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-mist-blue-100`}
            >
              <Highlight hit={hit} attribute="title" />
            </span>
          </Typography>
        )}

        {[
          { key: 'ingress', value: ingress },
          { key: 'eventDescription', value: eventDescription },
          { key: 'text', value: text },
        ].map(
          ({ key, value }) =>
            value && (
              <Typography
                key={key}
                className={`${
                  type === 'event' && (key === 'ingress' || key === 'eventDescription') ? 'text-2xs' : 'text-xs'
                } m-0 leading-cloudy`}
              >
                <Highlight hit={hit} attribute={key} />
              </Typography>
            ),
        )}

        <DisplayLink>{fullUrl}</DisplayLink>
      </NextLink>
    </article>
  )
}

export default UniversalHit
