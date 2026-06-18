'use client'
import { useLocale } from 'next-intl'
import { BreadcrumbJsonLd } from 'next-seo'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { defaultLanguage, domain } from '@/languageConfig'
import { getLocaleFromIso } from '@/sanity/helpers/localization'
import type { ColorKeys } from '@/styles/colorKeyToUtilityMap'
import BaseLink from '../Link/BaseLink'
import { BreadcrumbsList } from './BreadcrumbList'
import { BreadcrumbsListItem } from './BreadcrumbListItem'

export type Breadcrumb = {
  label: string
  //without route locale
  slug: string
  //with route locale for other than defaultLanguage
  href: string
  type?: string
}
export type BreadcrumbData = {
  enableBreadcrumbs: boolean
  useCustomBreadcrumbs: boolean
  defaultBreadcrumbs: Breadcrumb[]
  customBreadcrumbs: Breadcrumb[]
}

const buildJsonLdElements = (crumbs: Breadcrumb[]) => {
  return crumbs.map((item, index) => {
    return {
      position: index + 1,
      name: item.label,
      item: `${domain}${item.href}`,
    }
  })
}

const capitalize = (text: string): string =>
  text?.[0].toUpperCase() + text?.slice(1)

const parseBreadcrumbs = (crumbs: Breadcrumb[], isoLang: string) => {
  return crumbs
    .filter(item => item?.slug && item?.label)
    .map(item => {
      console.log('parseBreadcrumbs item', item)
      return {
        ...item,
        href:
          isoLang !== defaultLanguage.iso
            ? `/${getLocaleFromIso(isoLang)}${item.slug}`
            : item.slug,
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
    const isoLang = useLocale()
    const crumbs =
      useCustomBreadcrumbs && customBreadcrumbs.length >= 3
        ? parseBreadcrumbs(customBreadcrumbs, isoLang)
        : parseBreadcrumbs(defaultBreadcrumbs, isoLang)

    if (crumbs.length < 2) return null

    return (
      <nav
        ref={ref}
        aria-label='Breadcrumbs'
        className={`mx-auto max-w-content px-layout-sm lg:px-layout-lg ${background ?? ''}`}
      >
        <BreadcrumbsList className={twMerge(`py-6 lg:py-8`, className)}>
          {crumbs.map(item => {
            // doesnt contain /locale/ in slug, add locale to href
            const isActive = item.slug === currentSlug
            const label = item.label

            return (
              <BreadcrumbsListItem key={item.slug} active={isActive}>
                {isActive ? (
                  <span aria-current='page'>{label}</span>
                ) : (
                  <BaseLink
                    href={item.href}
                    className='no-underline hover:underline'
                  >
                    {label}
                  </BaseLink>
                )}
              </BreadcrumbsListItem>
            )
          })}
        </BreadcrumbsList>
        <BreadcrumbJsonLd items={buildJsonLdElements(crumbs)} />
      </nav>
    )
  },
)
