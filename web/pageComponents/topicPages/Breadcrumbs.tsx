import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import { BreadcrumbsList, getBackgroundByColorName, Link } from '@components'
import { BreadcrumbJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { BackgroundColours, Breadcrumb } from '../../types'

const { BreadcrumbsListItem } = BreadcrumbsList

type ContainerStyles = {
  hasTopMargin?: boolean
  backgroundColor: BackgroundColours
}

const Container = styled.div<{ $containerStyles?: ContainerStyles }>`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;

  ${({ $containerStyles }) => {
    const hasTopMargin = $containerStyles?.hasTopMargin && {
      paddingTop: 'var(--space-xLarge)',
    }
    // BreadCrumbs's background color is defined by its following component
    const bgColor = $containerStyles?.backgroundColor && {
      background: getBackgroundByColorName($containerStyles.backgroundColor),
    }
    return { ...hasTopMargin, ...bgColor }
  }}
`

type BreadcrumbsProps = {
  slug: string
  useCustomBreadcrumbs: boolean
  defaultBreadcrumbs: Breadcrumb[]
  customBreadcrumbs: Breadcrumb[]
  containerStyles: ContainerStyles
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

const parseBreadcrumbs = (crumbs: Breadcrumb[], custom = false) => {
  return crumbs
    .filter((item) => item.slug && item.label)
    .map((item) => ({
      ...item,
      // @TODO: the item.type check can be removed once all existing custom breadcrumbs have been updated to use the segment type
      label: capitalize(custom && item.type == 'segment' ? item.label : item.label.replaceAll('-', ' ')),
    }))
}

const capitalize = (string: string): string => string[0].toUpperCase() + string.slice(1)

export const Breadcrumbs = ({
  slug,
  useCustomBreadcrumbs,
  defaultBreadcrumbs,
  customBreadcrumbs,
  containerStyles,
}: BreadcrumbsProps) => {
  const router = useRouter()

  const crumbs =
    useCustomBreadcrumbs && customBreadcrumbs && customBreadcrumbs.length >= 3
      ? parseBreadcrumbs(customBreadcrumbs, true)
      : parseBreadcrumbs(defaultBreadcrumbs)

  if (crumbs.length < 2) return null

  return (
    <Container $containerStyles={containerStyles}>
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
