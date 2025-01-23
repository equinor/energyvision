import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { arrow_down, library_pdf } from '@equinor/eds-icons'
import { PiFilePdfThin } from 'react-icons/pi'
import { ArrowRight } from 'icons'
import envisTwMerge from 'twMerge'
import { getArrowAnimation, iconRotation } from './ResourceLink'

export type StickMenuLinkProps = {
  isDownloadable?: boolean
} & BaseLinkProps

/** Sticky menu link style */
export const StickyMenuLink = forwardRef<HTMLAnchorElement, StickMenuLinkProps>(function StickyMenuLink(
  { children, type = 'internalUrl', className = '', href = '', isDownloadable = false, ...rest },
  ref,
) {
  const iconClassNames = `size-arrow-right
    text-energy-red-100
    dark:text-white-100
    rotate-90
    group-hover:translate-y-0.5
    transition-all
    duration-300
  `

  return (
    <BaseLink
      className={twMerge(
        `group
        relative 
        flex
        justify-center
        w-fit
        underline-offset-2
        text-slate-80
        text-sm`,
        className,
      )}
      ref={ref}
      href={href}
      {...rest}
    >
      {isDownloadable && <PiFilePdfThin className="mr-2" />}
      <div className={`w-fit group-hover:underline no-underline leading-none align-middle`}>{children}</div>
      {/*       {isDownloadable && (
        <div className={`flex flex-col px-1 ml-2 xl:ml-4 -translate-y-[3px]`}>
          <ArrowRight className={iconClassNames} />
          <div className="bg-energy-red-100 h-[2px] w-full" />
        </div>
      )} */}
      {/*       {!isDownloadable && (
        <TransformableIcon iconData={arrow_down} className="text-energy-red-100 dark:text-white-100 ml-4" />
      )} */}
    </BaseLink>
  )
})
export default StickyMenuLink
