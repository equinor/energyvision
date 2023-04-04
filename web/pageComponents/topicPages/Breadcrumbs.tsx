import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import { BreadcrumbsList } from '@components'
import { BreadcrumbJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { getFullUrl } from '../../common/helpers/getFullUrl'

const { BreadcrumbsListItem } = BreadcrumbsList

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

type Breadcrumbs = {
  label: string
  slug: string
}[]

type BreadcrumbsProps = {
  slug: string
  defaultBreadcrumbs: string[]
  customBreadcrumbs: string[] | [] | null
}

const buildJsonLdElements = (crumbs: Breadcrumbs, router: NextRouter) => {
  const { pathname, locale } = router

  return crumbs.map((item, index) => {
    const fullUrl = getFullUrl(pathname, item.slug, locale)

    return {
      position: index + 1,
      name: item.label,
      item: fullUrl,
    }
  })
}

const parseBreadcrumbs = (crumbs: string[]): Breadcrumbs => {
  return [
    {
      label: 'Home',
      slug: '/',
    },
    ...crumbs
      .filter((e) => e)
      .map((item) => {
        const label = item.split('/').at(-1) || item
        return {
          label: label[0].toUpperCase() + label.slice(1),
          slug: item,
        }
      }),
  ]
}

export const Breadcrumbs = ({ slug, defaultBreadcrumbs, customBreadcrumbs }: BreadcrumbsProps) => {
  const router = useRouter()

  const crumbs = parseBreadcrumbs(
    customBreadcrumbs && customBreadcrumbs.length > 0 ? customBreadcrumbs : defaultBreadcrumbs,
  )

  if (crumbs.length < 2) return null

  return (
    <Container>
      <BreadcrumbsList>
        {crumbs.map((item) => {
          if (item.slug === slug) {
            return <BreadcrumbsListItem key={item.slug}>{item.label}</BreadcrumbsListItem>
          }

          return (
            <BreadcrumbsListItem key={item.slug}>
              <NextLink href={item.slug}>{item.label}</NextLink>
            </BreadcrumbsListItem>
          )
        })}
      </BreadcrumbsList>
      <BreadcrumbJsonLd itemListElements={buildJsonLdElements(crumbs, router)} />
    </Container>
  )
}
