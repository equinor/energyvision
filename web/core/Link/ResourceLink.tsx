import { forwardRef } from 'react'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { LinkType } from '../../types/index'
import { ArrowRight } from '../../icons'
import envisTwMerge from '../../twMerge'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { add, calendar } from '@equinor/eds-icons'
import { PiFilePdfThin } from 'react-icons/pi'

export type Variants = 'default' | 'fit'

export type ResourceLinkProps = {
  variant?: Variants
  /** Overriding styles for the icon  */
  iconClassName?: string
  /** Overriding styles for the text */
  textClassName?: string
  /** When using aria-label on the link, e.g add to calendar  */
  ariaHideText?: boolean
  /** What kind of content is it  */
  type?: LinkType
  /* Link extension */
  extension?: string | undefined
  /** If type is of an extension type (PDF), show the extention as icon */
  showExtensionIcon?: boolean
} & Omit<BaseLinkProps, 'type'>

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
  const iconRotation: Record<string, string> = {
    externalUrl: '-rotate-45',
    downloadableFile: 'rotate-90',
    downloadableImage: 'rotate-90',
    internalUrl: '',
  }

  const getArrowAnimation = (type: LinkType) => {
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

  const getArrowElement = (type: LinkType, iconClassName: string) => {
    const iconClassNames = envisTwMerge(
      `size-arrow-right
      text-energy-red-100
      dark:text-white-100
      justify-self-end
      ${iconRotation[type]}
      ${getArrowAnimation(type)}
      transition-all
      duration-300
    `,
      iconClassName,
    )
    const marginClassName = `ml-6 xl:ml-8`

    switch (type) {
      case 'downloadableFile':
      case 'downloadableImage':
        return (
          <div className={`flex flex-col px-1 ${marginClassName} translate-y-[1px]`}>
            <ArrowRight className={iconClassNames} />
            <div className="bg-energy-red-100 h-[2px] w-full" />
          </div>
        )
      case 'icsLink':
        return <TransformableIcon iconData={add} className={`${marginClassName} ${iconClassNames}`} />
      default:
        return <ArrowRight className={`${marginClassName} ${iconClassNames}`} />
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

  const classNames = envisTwMerge(
    `group
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
    const textClassNames = envisTwMerge(`pt-1 grow leading-none`, textClassName)
    switch (type) {
      case 'downloadableFile':
        return extension && extension.toUpperCase() === 'PDF' && showExtensionIcon ? (
          <>
            <PiFilePdfThin size={24} className="mr-2" />
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
          </div>
        )
      case 'icsLink':
        return (
          <>
            <TransformableIcon iconData={calendar} className="mr-2" />
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
          </div>
        )
    }
  }
  return (
    <BaseLink className={classNames} type={type} ref={ref} href={href} {...rest}>
      <div
        className={envisTwMerge(
          `h-full flex
          justify-start
        items-center
        ${contentVariantClassName[variant]}`,
        )}
      >
        {getContentElements()}
        {extension && !showExtensionIcon ? `(${extension.toUpperCase()})` : ''}
        {getArrowElement(type, iconClassName)}
      </div>
      <div className="w-[0%] h-[1px] bg-grey-40 transition-all duration-300 group-hover:w-full" />
    </BaseLink>
  )
})

export default ResourceLink
