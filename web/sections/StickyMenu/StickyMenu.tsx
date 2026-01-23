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
          `sticky top-0 duration-300 ease-in-out [transition-property:top] ${twBg} z-10 w-full py-4 shadow-md`,
          className,
        )}
      >
        <div
          className={`mx-auto flex flex-col gap-y-3 px-layout-sm lg:flex-row lg:justify-between`}
        >
          <div className={`text-start font-medium text-base`}>{title}</div>
          <div className='flex items-center gap-10'>
            {links?.map(link => {
              return link?.type === 'anchorLinkReference' ? (
                <Link
                  key={link?.id}
                  href={`#${link?.anchorReference}`}
                  className={`text-sm`}
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
