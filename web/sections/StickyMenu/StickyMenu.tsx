'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { StickyMenuLink } from '@/core/Link'
import {
  type ColorKeyTokens,
  colorKeyToUtilityMap,
} from '../../styles/colorKeyToUtilityMap'
import type { StickyMenuData } from '../../types/index'

export type StickyMenuProps = {
  stickyMenuData?: StickyMenuData
} & HTMLAttributes<HTMLElement>

export const StickyMenu = forwardRef<HTMLElement, StickyMenuProps>(
  function StickyMenu({ stickyMenuData, className = '', ...rest }, ref) {
    const intl = useTranslations()
    const anchorReference = stickyMenuData?.links.find(
      it => it.type === 'anchorLinkReference',
    )
    const resourceLink = stickyMenuData?.links.find(
      it => it.type === 'downloadableFile',
    )

    const stickyMenuKey =
      (stickyMenuData?.background as keyof ColorKeyTokens) ||
      ('white-100' as keyof ColorKeyTokens)
    const twBg = colorKeyToUtilityMap[stickyMenuKey]?.background

    return (
      <nav
        {...rest}
        ref={ref}
        data-sticky='true'
        aria-label={intl('local')}
        className={twMerge(
          `peer sticky top-0 duration-300 ease-in-out [transition-property:top] ${twBg} z-10 w-full py-4 shadow-md`,
          className,
        )}
      >
        <div
          className={`mx-auto flex flex-col gap-y-3 px-layout-sm lg:flex-row lg:justify-between`}
        >
          <div className={`text-start font-medium text-base`}>
            {stickyMenuData?.title}
          </div>
          <div className='flex items-center gap-10'>
            {anchorReference && (
              <StickyMenuLink
                className=''
                href={`#${anchorReference?.anchorReference}`}
              >
                {anchorReference.title}
              </StickyMenuLink>
            )}
            {resourceLink && (
              <StickyMenuLink {...resourceLink} type='downloadableFile'>
                {resourceLink?.label}
              </StickyMenuLink>
            )}
          </div>
        </div>
      </nav>
    )
  },
)
export default StickyMenu
