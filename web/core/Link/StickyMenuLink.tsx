import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { BsFiletypePdf } from 'react-icons/bs'
import DownloadableLink from './DownloadableLink'

export type StickMenuLinkProps = {
  isDownloadable?: boolean
} & BaseLinkProps

/** Sticky menu link style */
export const StickyMenuLink = forwardRef<HTMLAnchorElement, StickMenuLinkProps>(function StickyMenuLink(
  { children, type = 'internalUrl', className = '', href = '', ...rest },
  ref,
) {
  if (type === 'downloadableFile') {
    return <DownloadableLink {...rest} type={type} variant="stickyMenu" showExtensionIcon={true} />
  }
  return (
    <BaseLink
      type={type}
      className={twMerge(
        `group relative flex w-fit justify-center text-sm text-slate-80 underline-offset-2`,
        className,
      )}
      ref={ref}
      href={href}
      {...rest}
    >
      <div className={`w-fit align-middle leading-none no-underline group-hover:underline`}>{children}</div>
    </BaseLink>
  )
})
export default StickyMenuLink
