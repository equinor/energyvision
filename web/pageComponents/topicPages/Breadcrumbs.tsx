import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import { BackgroundContainer, BackgroundContainerProps, BreadcrumbsList } from '@components'
import { BreadcrumbJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { BackgroundColours, Breadcrumb } from '../../types'

const { BreadcrumbsListItem } = BreadcrumbsList

type ContainerStyles = {
  hasTopMargin?: boolean
}

const Container = styled(BackgroundContainer)<{ $containerStyles?: ContainerStyles }>`
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  color: var(--color-on-background);
`
const StyledBreadcrumbList = styled(BreadcrumbsList)`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
`

const StyledBreadcrumbsListItem = styled(BreadcrumbsListItem)<{ $bgColor?: BackgroundColours }>`
  &:last-child {
    color: var(--breadcrumbs-inactive-color);
  }
`

const StyledNextLink = styled(NextLink)<{ $bgColor?: BackgroundColours }>`
  text-decoration: none;
  color: var(--color-on-background);
`

type BreadcrumbsProps = {
  slug: string
  useCustomBreadcrumbs: boolean
  defaultBreadcrumbs: Breadcrumb[]
  customBreadcrumbs: Breadcrumb[]
  containerStyles: ContainerStyles
} & BackgroundContainerProps

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
  background,
}: BreadcrumbsProps) => {
  const router = useRouter()

  const crumbs =
    useCustomBreadcrumbs && customBreadcrumbs && customBreadcrumbs.length >= 3
      ? parseBreadcrumbs(customBreadcrumbs, true)
      : parseBreadcrumbs(defaultBreadcrumbs)

  if (crumbs.length < 2) return null

  return (
    <Container $containerStyles={containerStyles} background={background}>
      <StyledBreadcrumbList>
        {crumbs.map((item: Breadcrumb) => {
          if (item.slug === slug) {
            return <StyledBreadcrumbsListItem key={item.slug}>{item.label}</StyledBreadcrumbsListItem>
          }
          return (
            <BreadcrumbsListItem key={item.slug}>
              <StyledNextLink href={item.slug} prefetch={false}>
                {item.label}
              </StyledNextLink>
            </BreadcrumbsListItem>
          )
        })}
      </StyledBreadcrumbList>
      <BreadcrumbJsonLd itemListElements={buildJsonLdElements(crumbs, router)} />
    </Container>
  )
}
