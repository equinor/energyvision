import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import { BreadcrumbsList, Link } from '@components'
import { BreadcrumbJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { Breadcrumb } from '../../types'

const { BreadcrumbsListItem } = BreadcrumbsList

const Container = styled.div<{ $hasTopMargin?: boolean }>`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;

  ${({ $hasTopMargin }) =>
    $hasTopMargin && {
      paddingTop: 'var(--space-xLarge)',
    }}
`

type BreadcrumbsProps = {
  slug: string
  useCustomBreadcrumbs: boolean
  defaultBreadcrumbs: Breadcrumb[]
  customBreadcrumbs: Breadcrumb[]
  hasTopMargin?: boolean
}

const buildJsonLdElements = (crumbs: Breadcrumb[], router: NextRouter) => {
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

const parseBreadcrumbs = (crumbs: Breadcrumb[]) => {
  return crumbs
    .filter((item) => item.slug && item.label)
    .map((item) => ({
      ...item,
      label: capitalize(item.label.replaceAll('-', ' ')),
    }))
}

const capitalize = (string: string): string => string[0].toUpperCase() + string.slice(1)

export const Breadcrumbs = ({
  slug,
  useCustomBreadcrumbs,
  defaultBreadcrumbs,
  customBreadcrumbs,
  hasTopMargin = false,
}: BreadcrumbsProps) => {
  const router = useRouter()

  const crumbs =
    useCustomBreadcrumbs && customBreadcrumbs && customBreadcrumbs.length >= 3
      ? parseBreadcrumbs(customBreadcrumbs)
      : parseBreadcrumbs(defaultBreadcrumbs)

  if (crumbs.length < 2) return null

  return (
    <Container $hasTopMargin={hasTopMargin}>
      <BreadcrumbsList>
        {crumbs.map((item: Breadcrumb) => {
          if (item.slug === slug) {
            return <BreadcrumbsListItem key={item.slug}>{item.label}</BreadcrumbsListItem>
          }

          return (
            <BreadcrumbsListItem key={item.slug}>
              <NextLink href={item.slug} passHref legacyBehavior>
                <Link variant="regular" underline={false}>
                  {item.label}
                </Link>
              </NextLink>
            </BreadcrumbsListItem>
          )
        })}
      </BreadcrumbsList>
      <BreadcrumbJsonLd itemListElements={buildJsonLdElements(crumbs, router)} />
    </Container>
  )
}
