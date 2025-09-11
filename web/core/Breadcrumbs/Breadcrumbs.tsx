'use client'
import { BreadcrumbJsonLd } from 'next-seo'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import type { Breadcrumb, DesignOptions } from '../../types'
import { forwardRef } from 'react'
import { BreadcrumbsList } from './BreadcrumbList'
import { BreadcrumbsListItem } from './BreadcrumbListItem'
import { BaseLink } from '../Link'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'

type BreadcrumbsProps = {
  slug: string
  useCustomBreadcrumbs: boolean
  defaultBreadcrumbs: Breadcrumb[]
  customBreadcrumbs: Breadcrumb[]
  className?: string
  designOptions?: DesignOptions
}

const buildJsonLdElements = (crumbs: Breadcrumb[], pathname: ReturnType<typeof usePathname>) => {
  return crumbs.map((item, index) => ({
    position: index + 1,
    name: item.label,
    item: `${pathname}/${item.slug}`,
  }))
}

const capitalize = (text: string): string => text?.[0].toUpperCase() + text?.slice(1)

const parseBreadcrumbs = (crumbs: Breadcrumb[]) => {
  return crumbs
    .filter((item) => item?.slug && item?.label)
    .map((item) => {
      return {
        ...item,
        label: capitalize(item.label),
      }
    })
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ slug, useCustomBreadcrumbs, defaultBreadcrumbs, customBreadcrumbs, designOptions, className = '' }, ref) => {
    const pathname = usePathname()
    const crumbs =
      useCustomBreadcrumbs && customBreadcrumbs.length >= 3
        ? parseBreadcrumbs(customBreadcrumbs)
        : parseBreadcrumbs(defaultBreadcrumbs)

    if (crumbs.length < 2) return null

    const { bg, dark } = getBgAndDarkFromBackground(designOptions)

    return (
      <nav ref={ref} aria-label="Breadcrumbs" className={`px-layout-lg ${bg} ${dark ? 'dark' : ''}`}>
        <BreadcrumbsList className={twMerge(`py-6`, className)}>
          {crumbs.map((item) => {
            const isActive = item.slug === slug
            const label = item.label
            return (
              <BreadcrumbsListItem key={item.slug} active={isActive}>
                {isActive ? (
                  <span aria-current="page">{label}</span>
                ) : (
                  <BaseLink href={item.slug} className="no-underline hover:underline">
                    {label}
                  </BaseLink>
                )}
              </BreadcrumbsListItem>
            )
          })}
        </BreadcrumbsList>
        <BreadcrumbJsonLd itemListElements={buildJsonLdElements(crumbs, pathname)} />
      </nav>
    )
  },
)
