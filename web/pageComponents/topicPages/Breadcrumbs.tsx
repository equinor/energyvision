import { default as NextLink } from 'next/link'
import { BackgroundContainer, BackgroundContainerProps, BreadcrumbsList } from '@components'
import { BreadcrumbJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { Breadcrumb } from '../../types'
import { twMerge } from 'tailwind-merge'

const { BreadcrumbsListItem } = BreadcrumbsList

type BreadcrumbsProps = {
  slug: string
  useCustomBreadcrumbs: boolean
  defaultBreadcrumbs: Breadcrumb[]
  customBreadcrumbs: Breadcrumb[]
  className?: string
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
  return parts?.[0] + parts?.slice(1)
}

const capitalize = (string: string): string => string[0].toUpperCase() + string.slice(1)

const parseBreadcrumbs = (crumbs: Breadcrumb[]) => {
  return crumbs
    .filter((item) => item.slug && item.label)
    .map((item) => ({
      ...item,
      label: capitalize(item.label),
    }))
}

export const Breadcrumbs = ({
  slug,
  useCustomBreadcrumbs,
  defaultBreadcrumbs,
  customBreadcrumbs,
  background,
  className = '',
}: BreadcrumbsProps) => {
  const router = useRouter()

  const crumbs =
    useCustomBreadcrumbs && customBreadcrumbs && customBreadcrumbs.length >= 3
      ? parseBreadcrumbs(customBreadcrumbs)
      : parseBreadcrumbs(defaultBreadcrumbs)

  if (crumbs.length < 2) return null

  return (
    <BackgroundContainer background={background} renderFragmentWhenPossible className="mx-auto max-w-viewport">
      <BreadcrumbsList className={twMerge(`py-10 px-layout-lg`, className)}>
        {crumbs.map((item: Breadcrumb) => {
          const label = item.label ?? parseSlug(item.slug)?.replaceAll('-', ' ')
          const shouldLink = item.slug !== slug

          return (
            <BreadcrumbsListItem key={item.slug}>
              {shouldLink ? (
                <NextLink
                  href={item.slug}
                  prefetch={false}
                  className="hover:underline no-underline focus:outline-none focus-visible:envis-outline dark:focus-visible:envis-outline-invert underline-offset-4"
                >
                  {label}
                </NextLink>
              ) : (
                <>{label}</>
              )}
            </BreadcrumbsListItem>
          )
        })}
      </BreadcrumbsList>
      <BreadcrumbJsonLd itemListElements={buildJsonLdElements(crumbs, router)} />
    </BackgroundContainer>
  )
}
