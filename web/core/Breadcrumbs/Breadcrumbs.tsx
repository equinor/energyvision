import { BreadcrumbsList } from './index'
import { BackgroundContainer, BackgroundContainerProps } from '@components'
import { BreadcrumbJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'
import NextLink from 'next/link'
import type { Breadcrumb } from '../../types'

type BreadcrumbsProps = {
  slug: string
  useCustomBreadcrumbs: boolean
  defaultBreadcrumbs: Breadcrumb[]
  customBreadcrumbs: Breadcrumb[]
  className?: string
} & BackgroundContainerProps

const buildJsonLdElements = (crumbs: Breadcrumb[], router: ReturnType<typeof useRouter>) => {
  const { pathname, locale } = router

  return crumbs.map((item, index) => ({
    position: index + 1,
    name: item.label,
    item: `${pathname}/${item.slug}`,
  }))
}

const capitalize = (text: string): string => text[0].toUpperCase() + text.slice(1)

const parseBreadcrumbs = (crumbs: Breadcrumb[]) => {
  return crumbs.map((item) => ({
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
    useCustomBreadcrumbs && customBreadcrumbs.length >= 3
      ? parseBreadcrumbs(customBreadcrumbs)
      : parseBreadcrumbs(defaultBreadcrumbs)

  if (crumbs.length < 2) return null

  return (
    <BackgroundContainer background={background} renderFragmentWhenPossible className="mx-auto max-w-viewport">
      <nav aria-label="Breadcrumbs">
        <BreadcrumbsList className={twMerge(`py-10 px-layout-lg`, className)}>
          {crumbs.map((item) => {
            const isActive = item.slug === slug
            const label = item.label
            return (
              <BreadcrumbsList.BreadcrumbsListItem key={item.slug} active={isActive}>
                {isActive ? (
                  <span aria-current="page">{label}</span>
                ) : (
                  <NextLink
                    href={item.slug}
                    className="hover:underline no-underline focus:outline-none focus-visible:envis-outline dark:focus-visible:envis-outline-invert"
                  >
                    {label}
                  </NextLink>
                )}
              </BreadcrumbsList.BreadcrumbsListItem>
            )
          })}
        </BreadcrumbsList>
      </nav>
      <BreadcrumbJsonLd itemListElements={buildJsonLdElements(crumbs, router)} />
    </BackgroundContainer>
  )
}