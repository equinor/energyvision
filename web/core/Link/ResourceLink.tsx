'use client'
import { forwardRef } from 'react'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { LinkType } from '../../types/index'
import { ArrowRight } from '../../icons'
import envisTwMerge from '../../twMerge'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { add, calendar } from '@equinor/eds-icons'
import { BsFiletypePdf, BsFiletypeXlsx } from 'react-icons/bs'
import { useTranslations } from 'next-intl'

export type Variants = 'default' | 'fit'

export type ResourceLinkProps = {
  variant?: Variants
  /** Overriding styles for the icon  */
  iconClassName?: string
  /** Overriding styles for the text */
  textClassName?: string
  /** When using aria-label on the link, e.g add to calendar  */
  ariaHideText?: boolean
  /* Link extension */
  extension?: string | undefined
  /** If type is of an extension type (PDF), show the extention as icon */
  showExtensionIcon?: boolean
} & BaseLinkProps

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
    extension,
    className = '',
    iconClassName = '',
    textClassName = '',
    showExtensionIcon = false,
    ariaHideText = false,
    href = '',
    ...rest
  },
  ref,
) {
  const intl = useTranslations()
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
    border-b
    border-grey-50
    dark:border-white-100
    no-underline
    ${variantClassName[variant]}
  `,
    className,
  )

  const getTranslation = () => {
    switch (type) {
      case 'externalUrl':
        return intl('externalLink')
      case 'downloadableFile':
      case 'downloadableImage':
      case 'icsLink':
        return intl('downloadDocument')
      default:
        return intl('internalLink')
    }
  }

  const getContentElements = () => {
    const textClassNames = envisTwMerge(`pt-1 grow leading-none`, textClassName)
    switch (type) {
      case 'downloadableFile':
        return extension &&
          (extension.toUpperCase() === 'PDF' ||
            extension.toUpperCase() === 'XLS' ||
            extension.toUpperCase() === 'XLSX') &&
          showExtensionIcon ? (
          <>
            {extension.toUpperCase() === 'PDF' ? (
              <BsFiletypePdf aria-label="pdf" size={24} className="mr-2 min-w-6 min-h-6" />
            ) : (
              <BsFiletypeXlsx aria-label="xlsx" size={24} className="mr-2 min-w-6 min-h-6" />
            )}
            <div
              className={textClassNames}
              {...(ariaHideText && {
                'aria-hidden': true,
              })}
            >
              {children}
            </div>
          </>
        ) : (
          <div
            className={textClassNames}
            {...(ariaHideText && {
              'aria-hidden': true,
            })}
          >
            {children}
            {(extension && !showExtensionIcon) ||
            (extension &&
              (extension.toUpperCase() !== 'PDF' ||
                extension.toUpperCase() !== 'XLS' ||
                extension.toUpperCase() !== 'XLSX') &&
              showExtensionIcon) ? (
              <span
                aria-label={`, ${getTranslation()} ${extension.toUpperCase()}`}
              >{`(${extension.toUpperCase()})`}</span>
            ) : null}
          </div>
        )
      case 'icsLink':
        return (
          <>
            <TransformableIcon aria-label={`, ${getTranslation()}`} iconData={calendar} className="mr-2" />
            <div
              className={textClassNames}
              {...(ariaHideText && {
                'aria-hidden': true,
              })}
            >
              {children}
            </div>
          </>
        )
      default:
        return (
          <div
            className={textClassNames}
            {...(ariaHideText && {
              'aria-hidden': true,
            })}
          >
            {children}
            {extension ? (
              <span aria-label={`, ${getTranslation()} ${extension.toUpperCase()}`}>
                {`(${extension.toUpperCase()})`}
              </span>
            ) : null}
          </div>
        )
    }
  }

  return (
    <BaseLink
      className={classNames}
      type={type}
      ref={ref}
      href={href}
      {...rest}
      {...(extension &&
        extension.toLowerCase() === 'pdf' && {
          target: '_blank',
        })}
    >
      <div
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
        {getArrowElement(type, iconClassName)}
      </div>
      <div className="w-[0%] h-[1px] bg-grey-40 transition-all duration-300 group-hover:w-full" />
    </BaseLink>
  )
})

export default ResourceLink
