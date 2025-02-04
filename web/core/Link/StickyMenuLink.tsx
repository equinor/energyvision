import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { arrow_down, library_pdf } from '@equinor/eds-icons'

export type StickMenuLinkProps = {
  isDownloadable?: boolean
} & BaseLinkProps

/** Sticky menu link style */
export const StickyMenuLink = forwardRef<HTMLAnchorElement, StickMenuLinkProps>(function StickyMenuLink(
  { children, type = 'internalUrl', className = '', href = '', isDownloadable = false, ...rest },
  ref,
) {
  const classNames = twMerge(
    `
    group
    inline-flex
    align-baseline
    w-fit
    text-slate-80
    leading-0
  `,
    className,
  )
  const contentClassNames = `
  relative
  w-fit
  hover:underline
  no-underline
  `

  return (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      {isDownloadable && <TransformableIcon iconData={library_pdf} className="mr-1" />}
      <div className={contentClassNames}>{children}</div>
      {isDownloadable && (
        <TransformableIcon
          iconData={arrow_down}
          className="text-energy-red-100
    dark:text-white-100 h-[22px] border-energy-red-100 border-b-2 ml-4"
        />
      )}
      {!isDownloadable && (
        <TransformableIcon
          iconData={arrow_down}
          className="text-energy-red-100
    dark:text-white-100
    ml-4"
        />
      )}
    </BaseLink>
  )
})
export default StickyMenuLink
