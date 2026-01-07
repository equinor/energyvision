'use client'
import { add, calendar } from '@equinor/eds-icons'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { ArrowRight } from '../../icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import type { LinkType } from '../../types/index'
import { BaseLink, type BaseLinkProps } from './BaseLink'
import DownloadableLink from './DownloadableLink'

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
  label?: string
  file?: any
} & Omit<BaseLinkProps, 'href'>

export const iconRotation: Record<string, string> = {
  externalUrl: '-rotate-45',
  downloadableFile: 'rotate-90',
  downloadableImage: 'rotate-90',
  internalUrl: '',
}

export const getArrowAnimation = (type: LinkType) => {
  switch (type) {
    case 'downloadableFile':
    case 'downloadableImage':
      return 'group-hover:translate-y-0.5'
    case 'anchorLink':
      return 'translate-y-0.5 group-hover:translate-y-2'
    case 'icsLink':
      return 'translate-y-0.5'
    case 'externalUrl':
      return 'translate-y-0.5 group-hover:-translate-y-0.5'
    default:
      return 'translate-y-0.5 group-hover:translate-x-2'
  }
}

export const getArrowElement = (
  type: LinkType,
  iconClassName?: string,
  marginClassName?: string,
) => {
  const iconClassNames = twMerge(
    `size-arrow-right
    text-energy-red-100
    dark:text-white-100
    justify-self-end
    min-h-arrow-right
    min-w-arrow-right
    ${iconRotation[type]}
    ${getArrowAnimation(type)}
    transition-all
    duration-300
  `,
    iconClassName,
  )
  const marginClassNames = twMerge(`ml-6 xl:ml-8`, marginClassName)

  switch (type) {
    case 'downloadableFile':
    case 'downloadableImage':
      return (
        <div
          className={`flex flex-col px-1 ${marginClassNames} translate-y-px`}
        >
          <ArrowRight className={iconClassNames} />
          <div className='h-0.5 w-full bg-energy-red-100 dark:bg-white-100' />
        </div>
      )
    case 'icsLink':
      return (
        <TransformableIcon
          iconData={add}
          className={`${marginClassName} ${iconClassNames}`}
        />
      )
    default:
      return <ArrowRight className={`${marginClassName} ${iconClassNames}`} />
  }
}

export const ResourceLink = forwardRef<HTMLAnchorElement, ResourceLinkProps>(
  function ResourceLink(
    {
      variant = 'default',
      children,
      type = 'internalUrl',
      className = '',
      iconClassName = '',
      textClassName = '',
      showExtensionIcon = false,
      ariaHideText = false,
      href = '',
      file,
    },
    ref,
  ) {
    if (type === 'downloadableFile' || type === 'downloadableImage') {
      return (
        <DownloadableLink
          file={file}
          linkType={type}
          variant={variant}
          showExtensionIcon={showExtensionIcon}
        >
          {children}
        </DownloadableLink>
      )
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
      `group
    text-base
    relative
    flex
    flex-col
    justify-end
    gap-0
    text-slate-blue-95
    dark:text-white-100
    border-b
    border-grey-50
    dark:border-white-100
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
                {children}
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
              {children}
            </span>
          )
      }
    }

    return href ? (
      <BaseLink className={classNames} type={type} ref={ref} href={href}>
        <div
          className={twMerge(
            `flex h-full w-inherit items-center justify-start gap-x-2 ${contentVariantClassName[variant]}`,
          )}
        >
          {getContentElements()}
          {getArrowElement(type, iconClassName)}
        </div>
        <div className='h-px w-[0%] bg-grey-40 transition-all duration-300 group-hover:w-full' />
      </BaseLink>
    ) : null
  },
)

export default ResourceLink
