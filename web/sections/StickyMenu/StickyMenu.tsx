import { getTranslations } from 'next-intl/server'
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
  title?: string
  background?: keyof ColorKeyTokens
  links?: StickyMenuLinkType[]
} & HTMLAttributes<HTMLElement>

export const StickyMenu = forwardRef<HTMLElement, StickyMenuProps>(
  async function StickyMenu(
    { background, title, links = [], className = '' },
    ref,
  ) {
    const intl = await getTranslations()

    const twBg = colorKeyToUtilityMap[background ?? 'white-100']?.background
    //Each page template has a reference to the data-sticky to add a padding-top as peer
    return links?.length === 0 ? null : (
      <nav
        ref={ref}
        aria-label={intl('local')}
        data-sticky={!links || links?.length > 0}
        className={twMerge(
          `peer sticky top-0 z-20 shadow-md duration-400 ease-in-out [transition-property:top] peer-data-topbar-visible:top-topbar`,
          twBg,
          className,
        )}
      >
        <div
          className={`mx-auto flex h-full w-full max-w-content py-4 md:h-topbar-sticky`}
        >
          <div
            className={`flex w-full flex-col items-baseline justify-between gap-x-6 gap-y-3 px-layout-sm md:flex-row`}
          >
            <div className={`text-start font-medium text-base`}>
              {title ?? ''}
            </div>
            <div className='flex gap-10'>
              {links?.map(link => {
                return link?.type === 'anchorLinkReference' ? (
                  <Link
                    key={link?.id}
                    href={`#${link?.anchorReference}`}
                    className='items-end text-sm leading-none no-underline hover:text-slate-80 hover:underline dark:hover:text-grey-20'
                  >
                    {link?.title ?? ''}
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
        </div>
      </nav>
    )
  },
)
export default StickyMenu
