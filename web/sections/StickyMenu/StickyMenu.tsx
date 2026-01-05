import { StickyMenuLink } from '@core/Link'
import { forwardRef, type HTMLAttributes } from 'react'
import { useIntl } from 'react-intl'
import { type ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import envisTwMerge from '../../twMerge'
import type { StickyMenuData } from '../../types/index'

export type StickyMenuProps = {
  stickyMenuData?: StickyMenuData
} & HTMLAttributes<HTMLElement>

export const StickyMenu = forwardRef<HTMLElement, StickyMenuProps>(function StickyMenu(
  { stickyMenuData, className = '', ...rest },
  ref,
) {
  const intl = useIntl()
  const anchorReference = stickyMenuData?.links.find((it) => it.type === 'anchorLinkReference')
  const resourceLink = stickyMenuData?.links.find((it) => it.type === 'downloadableFile')

  const stickyMenuKey = (stickyMenuData?.background as keyof ColorKeyTokens) || ('white-100' as keyof ColorKeyTokens)
  const twBg = colorKeyToUtilityMap[stickyMenuKey]?.background

  return (
    <nav
      {...rest}
      ref={ref}
      aria-label={intl.formatMessage({
        id: 'local',
        defaultMessage: 'Local',
      })}
      className={envisTwMerge(
        `
        sticky
        top-0
        [transition-property:top]
        ease-in-out  
        duration-300
        ${twBg} 
        w-full
        shadow-md
        z-10
        py-4`,
        className,
      )}
    >
      <div className={`flex flex-col lg:flex-row gap-y-3 lg:justify-between px-layout-sm max-w-viewport mx-auto`}>
        <div className={`text-start font-medium text-base`}>{stickyMenuData?.title}</div>
        <div className="flex gap-10 items-end">
          {anchorReference && (
            <StickyMenuLink className="" href={`#${anchorReference?.anchorReference}`}>
              {anchorReference.title}
            </StickyMenuLink>
          )}
          {resourceLink && (
            <StickyMenuLink {...resourceLink} type="downloadableFile">
              {resourceLink?.label}
            </StickyMenuLink>
          )}
        </div>
      </div>
    </nav>
  )
})
export default StickyMenu
