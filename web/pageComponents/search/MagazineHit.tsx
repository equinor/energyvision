import { Highlight } from './Highlight'
import styled from 'styled-components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import getConfig from 'next/config'
import { StyledHitLink } from './hit/HitLink'
import HitHeading from './hit/HitHeading'
import DisplayLink from './hit/DisplayLink'
import { useRouter } from 'next/router'
import { defaultLanguage } from '../../languages'

/* @TODO: Let's use the Text component if the margin is removed */
const TextSnippet = styled.p`
  margin: 0;
  font-size: var(--typeScale-0);
  line-height: var(--lineHeight-3);
  color: var(--color-on-background);
`

const buildDisplayURL = (slug: string, locale: string | undefined): string => {
  const { publicRuntimeConfig } = getConfig()

  const startsWithLocale = (slug: string) => slug.startsWith(`${locale}/`) || slug.startsWith(`/${locale}/`)

  if (locale && locale !== defaultLanguage?.locale && !startsWithLocale(slug)) {
    return `${publicRuntimeConfig.domain}/${locale}/${slug.replace(/^\//, '')}`
  }

  return `${publicRuntimeConfig.domain}${slug}`
}

type MagazineResultHit = {
  slug?: string
  type?: string // @TODO: be more specific, like "news", "page", "event"?
  title?: string
  pageTitle?: string
  ingress?: string
  text?: string
}

export type MagazineHitType = AlgoliaHit<MagazineResultHit>

export type HitProps = {
  hit: MagazineHitType
}

const MagazineHit = ({ hit }: HitProps) => {
  // Shouldn't be empty string, but this is work in progress
  const { slug = '' } = hit
  const router = useRouter()
  const { locale } = router
  const fullUrl = buildDisplayURL(slug, locale)

  return (
    <article>
      <StyledHitLink href={slug} prefetch={false}>
        <HitHeading level="h2" size="sm">
          <Highlight hit={hit} attribute="pageTitle" />
        </HitHeading>
        {hit.title && (
          <TextSnippet>
            <Highlight hit={hit} attribute="title" />
          </TextSnippet>
        )}
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
    </article>
  )
}

export default MagazineHit
