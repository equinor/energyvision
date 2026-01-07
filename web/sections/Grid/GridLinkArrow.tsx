/* eslint-disable @typescript-eslint/ban-ts-comment */

import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import BaseLink from '@/core/Link/BaseLink'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { ArrowRight } from '../../icons'
import { getLocaleFromName } from '../../sanity/helpers/localization'
import type { LinkData } from '../../types/index'

type GridLinkArrowProps = {
  action?: LinkData
  className?: string
  bgColor?: string
  variant?: 'square' | 'circle'
}

const GridLinkArrow = forwardRef<HTMLDivElement, GridLinkArrowProps>(
  function GridLinkArrow(
    { action, className = '', bgColor, variant = 'square' },
    ref,
  ) {
    const url = action && getUrlFromAction(action)

    const bgClassName = () => {
      switch (bgColor) {
        case 'bg-yellow-50':
        case 'bg-green-50':
        case 'bg-orange-50':
        case 'bg-mist-blue-100':
        case 'bg-moss-green-50':
        case 'bg-spruce-wood-90':
          return `text-slate-80 hover:bg-slate-80 hover:text-white-100 focus-visible:bg-slate-80 focus-visible:text-white-100`
        case 'bg-white-100':
          return `text-slate-80 hover:bg-grey-50 hover:text-white-100 focus-visible:bg-grey-50 focus-visible:text-white-100`
        default:
          return `text-white-100 hover:bg-white-100 hover:text-slate-80 dark:hover:bg-white-100 dark:hover:text-slate-80 focus-visible:bg-white-100 focus-visible:text-slate-80`
      }
    }

    const variantClassName = () => {
      switch (variant) {
        case 'circle':
          return `m-1 p-2 hover:rounded-full`
        default:
          return ``
      }
    }

    return (
      <>
        {action && url && (
          <div
            ref={ref}
            className={twMerge(
              `focus-visible:-translate-x-[5px] focus-visible:-translate-y-[5px] absolute right-0 bottom-0 flex w-full justify-end 3xl:pt-12 pt-4`,
              className,
            )}
          >
            <BaseLink
              href={url as string}
              {...(action.link?.lang && {
                hrefLang: getLocaleFromName(action.link?.lang),
              })}
              type={action.type}
              className={twMerge(
                `group px-4 py-2 focus:outline-hidden ${bgClassName()} ${variantClassName()} focus-visible:envis-outline dark:focus-visible:envis-outline`,
              )}
            >
              <span className='sr-only'>{`${action.label} ${
                action.extension ? `(${action.extension.toUpperCase()})` : ''
              }`}</span>
              <ArrowRight
                className={variant === 'circle' ? 'size-7' : `size-10`}
              />
            </BaseLink>
          </div>
        )}
      </>
    )
  },
)

export default GridLinkArrow
