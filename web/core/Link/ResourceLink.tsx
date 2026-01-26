import { add, calendar } from '@equinor/eds-icons'
import { forwardRef } from 'react'
import { ArrowRight } from '../../icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import envisTwMerge from '../../twMerge'
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
  /** Display as a regular link without the border bottom effect and reduced spacing */
  useAsRegular?: boolean
  /** not provided with downloads */
  href?: string | undefined
  /** Inline block attachment */
  isAttachment?: boolean
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

export const getArrowElement = (type: LinkType, iconClassName?: string, marginClassName?: string) => {
  const iconClassNames = envisTwMerge(
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
  const marginClassNames = envisTwMerge(`ml-6 xl:ml-8`, marginClassName)

  switch (type) {
    case 'downloadableFile':
    case 'downloadableImage':
      return (
        <div className={`flex flex-col px-1 ${marginClassNames} translate-y-[1px]`}>
          <ArrowRight className={iconClassNames} />
          <div className="bg-energy-red-100 dark:bg-white-100 h-[2px] w-full" />
        </div>
      )
    case 'icsLink':
      return <TransformableIcon iconData={add} className={`${marginClassName} ${iconClassNames}`} />
    default:
      return <ArrowRight className={`${marginClassName} ${iconClassNames}`} />
  }
}

export const ResourceLink = forwardRef<HTMLAnchorElement, ResourceLinkProps>(function ResourceLink(
  {
    variant = 'default',
    children,
    type = 'internalUrl',
    className = '',
    iconClassName = '',
    textClassName = '',
    showExtensionIcon = false,
    ariaHideText = false,
    useAsRegular = false,
    href = '',
    isAttachment = false,
    file,
    locale,
  },
  ref,
) {
  if (type === 'downloadableFile' || type === 'downloadableImage') {
    return (
      <DownloadableLink
        file={file}
        type={type}
        variant={variant}
        showExtensionIcon={showExtensionIcon}
        ariaHideText={ariaHideText}
        isAttachment={isAttachment}
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

  const classNames = envisTwMerge(
    `group
    text-base
    relative
    flex
    flex-col
    justify-end
    gap-0
    text-slate-blue-95
    dark:text-white-100
    ${
      useAsRegular
        ? `underline 
        hover:text-norwegian-woods-100 
        dark:hover:text-slate-blue-95`
        : `border-b border-grey-50 dark:border-white-100 no-underline`
    }
    ${variantClassName[variant]}
  `,
    className,
  )

  const getContentElements = () => {
    const textClassNames = envisTwMerge(`pt-1 grow leading-none`, textClassName)
    switch (type) {
      case 'icsLink':
        return (
          <>
            <TransformableIcon title={`calendar`} iconData={calendar} className="mr-2" />
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
    <BaseLink className={classNames} type={type} ref={ref} href={href} locale={locale}>
      <span
        className={envisTwMerge(
          `h-full
          w-inherit 
          flex
          justify-start
          items-center
          gap-x-2
          ${contentVariantClassName[variant]}`,
        )}
      >
        {getContentElements()}
        {!useAsRegular && getArrowElement(type, iconClassName)}
      </span>
      {!useAsRegular && <span className="w-[0%] h-[1px] bg-grey-40 transition-all duration-300 group-hover:w-full" />}
    </BaseLink>
  ) : null
})

export default ResourceLink
