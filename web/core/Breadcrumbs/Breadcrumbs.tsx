'use client'
import { usePathname } from 'next/navigation'
import { BreadcrumbJsonLd } from 'next-seo'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import type { ColorKeys } from '@/styles/colorKeyToUtilityMap'
import BaseLink from '../Link/BaseLink'
import { BreadcrumbsList } from './BreadcrumbList'
import { BreadcrumbsListItem } from './BreadcrumbListItem'
import { domain } from '@/languageConfig'

export type Breadcrumb = {
  label: string
  slug: string
  type?: string
}
export type BreadcrumbData = {
  enableBreadcrumbs: boolean
  useCustomBreadcrumbs: boolean
  defaultBreadcrumbs: Breadcrumb[]
  customBreadcrumbs: Breadcrumb[]
}

const buildJsonLdElements = (
  crumbs: Breadcrumb[],
  pathname: ReturnType<typeof usePathname>,
) => {
  return crumbs.map((item, index) => ({
    position: index + 1,
    name: item.label,
    item: `${domain}${item.slug}`,
  }))
}

const capitalize = (text: string): string =>
  text?.[0].toUpperCase() + text?.slice(1)

const parseBreadcrumbs = (crumbs: Breadcrumb[]) => {
  return crumbs
    .filter(item => item?.slug && item?.label)
    .map(item => {
      return {
        ...item,
        label: capitalize(item.label),
      }
    })
}

type BreadcrumbsProps = {
  currentSlug?: string
  className?: string
  background?: ColorKeys
} & Omit<BreadcrumbData, 'enableBreadcrumbs'>

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      currentSlug,
      useCustomBreadcrumbs,
      defaultBreadcrumbs,
      customBreadcrumbs,
      background,
      className = '',
    },
    ref,
  ) => {
    const pathname = usePathname()
    const crumbs =
      useCustomBreadcrumbs && customBreadcrumbs.length >= 3
        ? parseBreadcrumbs(customBreadcrumbs)
        : parseBreadcrumbs(defaultBreadcrumbs)

    if (crumbs.length < 2) return null

    return (
      <nav
        ref={ref}
        aria-label='Breadcrumbs'
        className={`px-layout-sm lg:px-layout-lg py-10 ${background ?? ''}`}
      >
        <BreadcrumbsList className={twMerge(`py-2 lg:py-4`, className)}>
          {crumbs.map(item => {
            const isActive = item.slug === currentSlug
            const label = item.label
            return (
              <BreadcrumbsListItem key={item.slug} active={isActive}>
                {isActive ? (
                  <span aria-current='page'>{label}</span>
                ) : (
                  <BaseLink
                    href={item.slug}
                    className='no-underline hover:underline'
                  >
                    {label}
                  </BaseLink>
                )}
              </BreadcrumbsListItem>
            )
          })}
        </BreadcrumbsList>
        <BreadcrumbJsonLd items={buildJsonLdElements(crumbs, pathname)} />
      </nav>
    )
  },
)
