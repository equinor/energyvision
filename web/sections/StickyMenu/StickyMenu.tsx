'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import type { DownloadableLinkProps } from '@/core/Link/DownloadableLink'
import DownloadableLink from '@/core/Link/DownloadableLink'
import Link from '@/core/Link/Link'
import type { AnchorLinkReference, LinkType } from '@/types'
import {
  type ColorKeyTokens,
  colorKeyToUtilityMap,
} from '../../styles/colorKeyToUtilityMap'

export type StickyMenuLinkType = AnchorLinkReference | DownloadableLinkProps

export type StickyMenuProps = {
  title: string
  links: StickyMenuLinkType[]
  background: keyof ColorKeyTokens
} & HTMLAttributes<HTMLElement>

export const StickyMenu = forwardRef<HTMLElement, StickyMenuProps>(
  function StickyMenu({ background, title, links, className = '' }, ref) {
    const intl = useTranslations()
    const twBg = colorKeyToUtilityMap[background ?? 'white-100']?.background

    return (
      <nav
        ref={ref}
        aria-label={intl('local')}
        className={twMerge(
          `-mt-1 sticky inset-e-0 inset-s-0 flex h-topbar-sticky w-full max-w-full px-layout-sm duration-500 ease-in-out [transition-property:top] ${twBg} z-10 w-full py-4`,
          className,
        )}
      >
        <div
          className={`flex w-full flex-col gap-y-3 lg:flex-row lg:justify-between`}
        >
          <div className={`text-start font-medium text-base`}>{title}</div>
          <div className='flex items-center gap-10'>
            {links?.map(link => {
              return link?.type === 'anchorLinkReference' ? (
                <Link
                  key={link?.id}
                  href={`#${link?.anchorReference}`}
                  className='text-sm no-underline hover:text-slate-80 hover:underline dark:hover:text-grey-20'
                >
                  {title}
                </Link>
              ) : (
                <DownloadableLink
                  key={link?.id}
                  file={{
                    ...link?.file,
                    label: link?.label,
                  }}
                  linkType={link?.type as LinkType}
                  type='stickyMenu'
                />
              )
            })}
          </div>
        </div>
      </nav>
    )
  },
)
export default StickyMenu
