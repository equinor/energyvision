import { calendar } from '@equinor/eds-icons'
import { type PortableTextBlock, toPlainText } from 'next-sanity'
import { twMerge } from 'tailwind-merge'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { BaseLink, type BaseLinkProps } from './BaseLink'
import DownloadableLink from './DownloadableLink'
import { getArrowElement } from './linkCommon'

export type Variants = 'default' | 'fit'

export type ResourceLinkProps = {
  variant?: Variants
  /** Overriding styles for the icon  */
  iconClassName?: string
  /** Overriding styles for the text */
  textClassName?: string
  /** When using aria-label on the link, e.g add to calendar  */
  ariaHideText?: boolean
  /** If type is of an extension type (PDF), show the extention as icon */
  showExtensionIcon?: boolean
  /** not provided with downloads */
  href?: string | undefined
  label?: string | PortableTextBlock[]
  file?: any
} & Omit<BaseLinkProps, 'href'>

export const ResourceLink = ({
  ref,
  variant = 'default',
  children,
  type = 'internalUrl',
  className = '',
  iconClassName = '',
  textClassName = '',
  showExtensionIcon = true,
  ariaHideText = false,
  href,
  hrefLang,
  file,
  onClick,
  label,
}: ResourceLinkProps) => {
  if (type === 'downloadableFile' || type === 'downloadableImage') {
    return (
      <DownloadableLink
        file={file}
        linkType={type}
        variant={variant}
        showExtensionIcon={showExtensionIcon}
        onClick={onClick}
      >
        {children}
      </DownloadableLink>
    )
  }

  let _label = children
  if (label) {
    if (Array.isArray(label)) {
      _label = toPlainText(label)
    } else {
      _label = label as string
    }
  }

  const variantClassName: Partial<Record<Variants, string>> = {
    default: 'w-full pt-3',
    fit: 'w-fit pt-3',
  }

  const contentVariantClassName: Partial<Record<Variants, string>> = {
    default: 'pb-3 pr-2',
    fit: 'pb-3 pr-2',
  }

  const classNames = twMerge(
    `group/link
    text-base
    relative
    flex
    flex-col
    justify-end
    gap-0
    text-slate-blue-95
    dark:text-white-100
    no-underline
    ${variantClassName[variant]}
  `,
    className,
  )

  const getContentElements = () => {
    const textClassNames = twMerge(`pt-1 grow leading-none`, textClassName)
    switch (type) {
      case 'icsLink':
        return (
          <>
            <TransformableIcon
              title={`calendar`}
              iconData={calendar}
              className='mr-2'
            />
            <span
              className={textClassNames}
              {...(ariaHideText && {
                'aria-hidden': true,
              })}
            >
              {_label}
            </span>
          </>
        )
      default:
        return (
          <span
            className={textClassNames}
            {...(ariaHideText && {
              'aria-hidden': true,
            })}
          >
            {_label}
          </span>
        )
    }
  }

  return href ? (
    <BaseLink
      className={classNames}
      type={type}
      ref={ref}
      href={href}
      hrefLang={hrefLang}
      onClick={onClick}
    >
      <div
        className={twMerge(
          `flex h-full w-inherit items-center justify-start gap-x-2 ${contentVariantClassName[variant]}`,
        )}
      >
        {getContentElements()}
        {getArrowElement(type, iconClassName)}
      </div>
      <div className='relative h-0.5'>
        <div className='absolute inset-0 z-10 h-0.5 w-[0%] bg-grey-50 transition-all duration-300 group-hover/link:w-full dark:bg-white-100' />
        <div className='absolute inset-0 z-0 h-px w-full bg-grey-50 dark:bg-white-100' />
      </div>
    </BaseLink>
  ) : null
}

export default ResourceLink
