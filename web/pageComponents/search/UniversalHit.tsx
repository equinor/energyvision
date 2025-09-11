import { Highlight } from './Highlight'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import DisplayLink from './hit/DisplayLink'
import { FormattedDate } from '@/core/FormattedDateTime'
import { defaultLanguage } from '../../languages'
import { default as NextLink } from 'next/link'
import { Typography } from '@/core/Typography'
import { useLocale } from 'next-intl'
import { host } from '@/lib/config'
import { BaseLink } from '@/core/Link'

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
  const startsWithLocale = slug.startsWith(`${locale}/`) || slug.startsWith(`/${locale}/`)

  return locale && locale !== defaultLanguage?.locale && !startsWithLocale
    ? `${host.url}/${locale}/${slug.replace(/^\//, '')}`
    : `${host.url}${slug}`
}

const UniversalHit: React.FC<HitProps> = ({ hit }) => {
  const { slug = '', title, ingress, text, eventDescription, eventDate, publishDateTime, pageTitle, type } = hit
  const locale = useLocale()
  const fullUrl = buildDisplayURL(slug, locale)
  const formattedDate = eventDate || publishDateTime

  const commonLinkClassName = `
    pb-2
    group-hover:underline
    group-focus:outline-hidden
    group-focus-visible:envis-outline
    group-active:scale-99
    dark:text-white-100
    dark:group-focus-visible:envis-outline-invert
    dark:group-active:envis-outline-invert`

  return (
    <article className="border-b border-white-100/20 pt-6 pb-8">
      <BaseLink href={slug} className="group">
        {formattedDate && type !== 'magazine' && (
          <div className={`tracking-wide ${type === 'news' ? 'text-2xs' : 'text-xs'}`}>
            <FormattedDate uppercase datetime={formattedDate} />
          </div>
        )}
        {pageTitle && (
          <Typography as="h2" variant="h6" className={`${commonLinkClassName}`}>
            <Highlight hit={hit} attribute="pageTitle" />
          </Typography>
        )}
        {title && (
          <div className={`${title && pageTitle ? 'pt-2 text-sm' : ''} ${!pageTitle ? commonLinkClassName : ''}`}>
            <Highlight hit={hit} attribute="title" />
          </div>
        )}

        {[
          { key: 'ingress', value: ingress },
          { key: 'eventDescription', value: eventDescription },
          { key: 'text', value: text },
        ].map(
          ({ key, value }) =>
            value && (
              <span
                key={key}
                className={`${
                  type === 'event' && (key === 'ingress' || key === 'eventDescription') ? 'text-2xs' : 'text-xs'
                }`}
              >
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
