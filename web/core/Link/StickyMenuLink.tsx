import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { BsFiletypePdf } from 'react-icons/bs'

export type StickMenuLinkProps = {
  isDownloadable?: boolean
} & BaseLinkProps

/** Sticky menu link style */
export const StickyMenuLink = forwardRef<HTMLAnchorElement, StickMenuLinkProps>(function StickyMenuLink(
  { children, type = 'internalUrl', className = '', href = '', isDownloadable = false, ...rest },
  ref,
) {
  const isPDF = href?.toLowerCase().endsWith('.pdf')
  const pdfIconElement = <>{isPDF ? <BsFiletypePdf aria-label="pdf" size={18} className="mr-2" /> : null}</>

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
      {...(isPDF && {
        target: '_blank',
      })}
      {...rest}
    >
      {isDownloadable && pdfIconElement}
      <div className={`w-fit group-hover:underline no-underline leading-none align-middle`}>{children}</div>
    </BaseLink>
  )
})
export default StickyMenuLink
