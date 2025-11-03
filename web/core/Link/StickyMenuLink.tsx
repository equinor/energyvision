import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import DownloadableLink, { DownloadableLinkProps } from './DownloadableLink'

export type StickMenuLinkProps = BaseLinkProps | DownloadableLinkProps

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
      <div className={`w-fit group-hover:underline no-underline leading-none align-middle`}>{children}</div>
    </BaseLink>
  )
})
export default StickyMenuLink
