import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink } from './BaseLink'
import DownloadableLink from './DownloadableLink'
import type { ResourceLinkProps } from './ResourceLink'

export type StickMenuLinkProps = ResourceLinkProps

/** Sticky menu link style */
export const StickyMenuLink = forwardRef<HTMLAnchorElement, StickMenuLinkProps>(function StickyMenuLink(
  { children, type = 'internalUrl', className = '', href = '', file },
  ref,
) {
  if (type === 'downloadableFile' || type === 'downloadableImage') {
    return <DownloadableLink file={file} type={type} variant="stickyMenu" showExtensionIcon={true} />
  }

  return (
    <BaseLink
      type={type}
      className={twMerge(
        `group
        relative 
        flex
        justify-end
        w-fit
        underline-offset-2
        text-slate-80
        text-sm`,
        className,
      )}
      ref={ref}
      href={href}
    >
      <div className={`w-fit group-hover:underline no-underline leading-none align-middle`}>{children}</div>
    </BaseLink>
  )
})
export default StickyMenuLink
