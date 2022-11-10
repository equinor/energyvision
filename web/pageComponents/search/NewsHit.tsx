import { Highlight } from './Highlight'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import getConfig from 'next/config'
import { StyledHitLink } from './hit/HitLink'
import HitHeading from './hit/HitHeading'
import DisplayLink from './hit/DisplayLink'
import { FormattedDate } from '@components'
import { useRouter } from 'next/router'
import { defaultLanguage } from '../../languages'

const StyledFormattedDate = styled(FormattedDate)`
  font-size: var(--typeScale-00);
  letter-spacing: 1px;
  display: block;
`

/* @TODO: Let's use the Text component if the margin is removed */
const TextSnippet = styled.p`
  margin: 0;
  font-size: var(--typeScale-0);
  line-height: var(--lineHeight-3);
  color: var(--inverted-text);
`

const buildDisplayURL = (slug: string, locale: string | undefined): string => {
  const { publicRuntimeConfig } = getConfig()

  const startsWithLocale = (slug: string) => slug.startsWith(`${locale}/`) || slug.startsWith(`/${locale}/`)

  if (locale && locale !== defaultLanguage?.locale && !startsWithLocale(slug)) {
    return `${publicRuntimeConfig.domain}/${locale}/${slug.replace(/^\//, '')}`
  }

  return `${publicRuntimeConfig.domain}${slug}`
}

type NewsResultHit = {
  slug?: string
  type?: string // @TODO: be more specific, like "news", "page", "event"?
  pageTitle?: string
  ingress?: string
  text?: string
  publishDateTime?: string
}

export type NewsHitType = AlgoliaHit<NewsResultHit>

export type HitProps = {
  hit: NewsHitType
}

const NewsHit = ({ hit }: HitProps) => {
  // Shouldn't be empty string, but this is work in progress
  const { slug = '' } = hit
  const router = useRouter()
  const { locale } = router
  const fullUrl = buildDisplayURL(slug, locale)

  return (
    <article>
      <NextLink href={slug} passHref legacyBehavior>
        <StyledHitLink>
          {hit.publishDateTime && <StyledFormattedDate datetime={hit.publishDateTime} uppercase />}
          <HitHeading level="h2" size="sm" inverted>
            <Highlight hit={hit} attribute="pageTitle" />
          </HitHeading>
          {hit.ingress && (
            <TextSnippet>
              <Highlight hit={hit} attribute="ingress" />
            </TextSnippet>
          )}
          {hit.text && (
            <TextSnippet>
              <Highlight hit={hit} attribute="text" />
            </TextSnippet>
          )}
          <DisplayLink>{fullUrl}</DisplayLink>
        </StyledHitLink>
      </NextLink>
    </article>
  )
}

export default NewsHit
