import { forwardRef, HTMLAttributes } from 'react'
import { StickyMenuData } from '../../types/index'
import { useIntl } from 'react-intl'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { StickyMenuLink } from '@core/Link'
import envisTwMerge from '../../twMerge'

export type StickyMenuProps = {
  stickyMenuData?: StickyMenuData
} & HTMLAttributes<HTMLElement>

export const StickyMenu = forwardRef<HTMLElement, StickyMenuProps>(function StickyMenu(
  { stickyMenuData, className = '', ...rest },
  ref,
) {
  const intl = useIntl()
  const anchorReference = stickyMenuData?.links.find((it) => it.type == 'anchorLinkReference')
  const resourceLink = stickyMenuData?.links.find((it) => it.type == 'downloadableFile')

  const stickyMenuKey = (stickyMenuData?.background as keyof ColorKeyTokens) || ('white-100' as keyof ColorKeyTokens)
  const twBg = colorKeyToUtilityMap[stickyMenuKey]?.background

  return (
    <nav
      ref={ref}
      aria-label={intl.formatMessage({
        id: 'local',
        defaultMessage: 'Local',
      })}
      role="navigation"
      className={envisTwMerge(`sticky top-0 [will-change:transform] ${twBg} w-full shadow-md z-10 py-4`, className)}
    >
      <div className={`flex flex-col lg:flex-row gap-y-3 lg:justify-between px-layout-sm max-w-viewport mx-auto`}>
        <div className={`text-start font-medium text-base`}>{stickyMenuData?.title}</div>
        <div className="flex gap-10 items-center">
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
