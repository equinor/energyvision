import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { useLocale } from 'next-intl'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { BaseLink } from '@/core/Link/BaseLink'
import { Typography } from '@/core/Typography'
import { defaultLanguage } from '@/languageConfig'
import { host } from '@/lib/config'
import { Highlight } from './Highlight'
import DisplayLink from './hit/DisplayLink'

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

const buildDisplayURL = (slug: string, locale: string | undefined): string => {
  const startsWithLocale =
    slug.startsWith(`${locale}/`) || slug.startsWith(`/${locale}/`)

  return locale && locale !== defaultLanguage?.locale && !startsWithLocale
    ? `${host.url}/${locale}/${slug.replace(/^\//, '')}`
    : `${host.url}${slug}`
}

const UniversalHit: React.FC<HitProps> = ({ hit }) => {
  const {
    slug = '',
    title,
    ingress,
    text,
    eventDescription,
    eventDate,
    publishDateTime,
    pageTitle,
    type,
  } = hit
  const locale = useLocale()
  const fullUrl = buildDisplayURL(slug, locale)
  const formattedDate = eventDate || publishDateTime

  const commonLinkClassName = `
    text-base
    pb-4
    group-hover:underline
    group-focus:outline-hidden
    group-focus-visible:envis-outline
    group-active:scale-99
    dark:text-white-100
    dark:group-focus-visible:envis-outline-invert
    dark:group-active:envis-outline-invert`

  return (
    <article className='border-white-100/20 border-b pt-6 pb-8'>
      <BaseLink href={slug} className='group'>
        {formattedDate && type !== 'magazine' && (
          <FormattedDateTime
            variant='date'
            uppercase
            datetime={formattedDate}
            className={`pb-3 text-xs tracking-wide`}
          />
        )}
        {pageTitle && (
          <Typography as='h2' variant='h6' className={`${commonLinkClassName}`}>
            <Highlight hit={hit} attribute='pageTitle' />
          </Typography>
        )}
        {title && (
          <div
            className={`${title && pageTitle ? 'text-sm' : ''} ${!pageTitle ? commonLinkClassName : ''}`}
          >
            <Highlight hit={hit} attribute='title' />
          </div>
        )}

        {[
          { key: 'ingress', value: ingress },
          { key: 'eventDescription', value: eventDescription },
          { key: 'text', value: text },
        ].map(
          ({ key, value }) =>
            value && (
              <span key={key} className={`text-xs`}>
                <Highlight hit={hit} attribute={key} />
              </span>
            ),
        )}

        <DisplayLink>{fullUrl}</DisplayLink>
      </BaseLink>
    </article>
  )
}

export default UniversalHit
