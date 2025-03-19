import { Highlight } from './Highlight'
import getConfig from 'next/config'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { StyledHitLink } from './hit/HitLink'
import HitHeading from './hit/HitHeading'
import DisplayLink from './hit/DisplayLink'
import { FormattedDate } from '@components'
import { useRouter } from 'next/router'
import { defaultLanguage } from '../../languages'

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
  const { slug = '', title, ingress, text, eventDescription, eventDate, publishDateTime } = hit
  const { locale } = useRouter()
  const fullUrl = buildDisplayURL(slug, locale)

  const textAttributes = [
    { key: 'title', value: title },
    { key: 'ingress', value: ingress },
    { key: 'text', value: text },
    { key: 'eventDescription', value: eventDescription },
  ]

  return (
    <article>
      <StyledHitLink href={slug} prefetch={false}>
        {eventDate ||
          (publishDateTime && (
            <p className="block text-xs tracking-wide">
              <FormattedDate uppercase datetime={eventDate || publishDateTime} />
            </p>
          ))}
        <HitHeading level="h2" size="sm">
          <Highlight hit={hit} attribute="pageTitle" />
        </HitHeading>

        {textAttributes.map(
          ({ key, value }) =>
            value && (
              <p key={key} className="m-0 text-xs leading-cloudy">
                <Highlight hit={hit} attribute={key} />
              </p>
            ),
        )}

        <DisplayLink>{fullUrl}</DisplayLink>
      </StyledHitLink>
    </article>
  )
}

export default UniversalHit
