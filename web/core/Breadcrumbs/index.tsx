import { BreadcrumbJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { Breadcrumb } from '../../types'
import { HTMLAttributes } from 'react'
import { Link } from '@core/Link'
import { twMerge } from 'tailwind-merge'

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
      label: custom && item.type == 'segment' ? item.label : item.label.replaceAll('-', ' '),
    }))
}

type BreadcrumbsProps = {
  slug: string
  breadcrumbs: Breadcrumb[]
  customBreadcrumbs?: Breadcrumb[]
  /** Override styling on the breadcrumb list*/
  className?: string
  /** Override styling on the breadcrumb list items */
  breadcrumbClassName?: string
} & HTMLAttributes<HTMLOListElement>

export const Breadcrumbs = ({
  slug,
  breadcrumbs,
  customBreadcrumbs,
  className = '',
  breadcrumbClassName = '',
}: BreadcrumbsProps) => {
  const router = useRouter()

  const crumbs =
    customBreadcrumbs && customBreadcrumbs.length >= 3
      ? parseBreadcrumbs(customBreadcrumbs, true)
      : parseBreadcrumbs(breadcrumbs)

  if (crumbs.length < 2) return null
  const breadcrumbClassNames = twMerge(
    `
  font-semibold 
  text-sm
  after:content-['>']
  last:after:content-['']
  last:font-medium
  last:text-slate-blue-90
  `,
    breadcrumbClassName,
  )

  return (
    <>
      <ol className={twMerge(`inline-flex space-x-1 py-8 px-layout-lg`, className)}>
        {crumbs.map((item: Breadcrumb) => {
          if (item.slug === slug) {
            return (
              <li className={breadcrumbClassNames} aria-current="page" key={item.slug}>
                {item.label}
              </li>
            )
          }
          return (
            <li key={item.slug} className={breadcrumbClassNames}>
              <Link href={item.slug}>{item.label}</Link>
            </li>
          )
        })}
      </ol>
      <BreadcrumbJsonLd itemListElements={buildJsonLdElements(crumbs, router)} />
    </>
  )
}
