import { default as NextLink } from 'next/link'
import { BackgroundContainer, BackgroundContainerProps, BreadcrumbsList } from '@components'
import { BreadcrumbJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { Breadcrumb } from '../../types'

const { BreadcrumbsListItem } = BreadcrumbsList

type BreadcrumbsProps = {
  slug: string
  useCustomBreadcrumbs: boolean
  defaultBreadcrumbs: Breadcrumb[]
  customBreadcrumbs: Breadcrumb[]
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

const parseSlug = (item: string): string => {
  const parts = item?.split('/').at(-1) || item
  return parts?.[0]?.toUpperCase() + parts?.slice(1)
}

export const Breadcrumbs = ({
  slug,
  useCustomBreadcrumbs,
  defaultBreadcrumbs,
  customBreadcrumbs,
  background,
}: BreadcrumbsProps) => {
  const router = useRouter()

  const crumbs =
    useCustomBreadcrumbs && customBreadcrumbs && customBreadcrumbs.length >= 3 ? customBreadcrumbs : defaultBreadcrumbs

  if (crumbs.length < 2) return null

  return (
    <BackgroundContainer background={background} renderFragmentWhenPossible className="mx-auto max-w-viewport">
      <BreadcrumbsList className="py-10 px-layout-lg">
        {crumbs
          .filter((item) => item.slug && item.label)
          .map((item: Breadcrumb) => {
            if (item.slug === slug) {
              return (
                <BreadcrumbsListItem key={item.slug}>
                  {item.label ?? parseSlug(item.slug)?.replaceAll('-', ' ')}
                </BreadcrumbsListItem>
              )
            }
            return (
              <BreadcrumbsListItem key={item.slug}>
                <NextLink href={item.slug} prefetch={false} className="hover:underline no-underline">
                  {item.label ?? parseSlug(item.slug)?.replaceAll('-', ' ')}
                </NextLink>
              </BreadcrumbsListItem>
            )
          })}
      </BreadcrumbsList>
      <BreadcrumbJsonLd itemListElements={buildJsonLdElements(crumbs, router)} />
    </BackgroundContainer>
  )
}
