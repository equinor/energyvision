'use client'
import { forwardRef, HTMLAttributes } from 'react'
import { StickyMenuData } from '../../types/index'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { StickyMenuLink } from '@/core/Link'
import envisTwMerge from '../../twMerge'
import { useTranslations } from 'next-intl'

export type StickyMenuProps = {
  stickyMenuData?: StickyMenuData
} & HTMLAttributes<HTMLElement>

export const StickyMenu = forwardRef<HTMLElement, StickyMenuProps>(function StickyMenu(
  { stickyMenuData, className = '', ...rest },
  ref,
) {
  const intl = useTranslations()
  const anchorReference = stickyMenuData?.links.find((it) => it.type == 'anchorLinkReference')
  const resourceLink = stickyMenuData?.links.find((it) => it.type == 'downloadableFile')

  const stickyMenuKey = (stickyMenuData?.background as keyof ColorKeyTokens) || ('white-100' as keyof ColorKeyTokens)
  const twBg = colorKeyToUtilityMap[stickyMenuKey]?.background

  return (
    <nav
      {...rest}
      ref={ref}
      aria-label={intl('local')}
      role="navigation"
      className={envisTwMerge(
        `sticky top-0 [transition-property:top] duration-300 ease-in-out ${twBg} z-10 w-full py-4 shadow-md`,
        className,
      )}
    >
      <div className={`mx-auto flex flex-col gap-y-3 px-layout-sm lg:flex-row lg:justify-between`}>
        <div className={`text-start text-base font-medium`}>{stickyMenuData?.title}</div>
        <div className="flex items-center gap-10">
          {anchorReference && (
            <StickyMenuLink className="" href={`#${anchorReference.anchorReference}`}>
              {anchorReference.title}
            </StickyMenuLink>
          )}
          {resourceLink && (
            <StickyMenuLink className="" href={resourceLink.href} isDownloadable>
              {resourceLink.label}
            </StickyMenuLink>
          )}
        </div>
      </div>
    </nav>
  )
})
export default StickyMenu
