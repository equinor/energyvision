import { forwardRef } from 'react'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { LinkType } from '../../types/index'
import { ArrowRight } from '../../icons'
import envisTwMerge from '../../twMerge'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { add, calendar } from '@equinor/eds-icons'
import { PiFilePdfThin } from 'react-icons/pi'

export type Variants = 'default' | 'fit' | 'compact'

export type ResourceLinkProps = {
  variant?: Variants
  /** Overriding styles for the icon  */
  iconClassName?: string
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
    showExtensionIcon = false,
    href = '',
    ...rest
  },
  ref,
) {
  const variantClassName: Partial<Record<Variants, string>> = {
    default: 'w-full pt-5',
    fit: 'w-fit pt-5',
    compact: 'w-fit pt-4',
  }

  const baseResourceLinkClassNames = `group
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
  `

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
        return 'group-hover:translate-y-2'
      case 'icsLink':
        return ''
      default:
        return 'group-hover:translate-x-2'
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

    switch (type) {
      case 'downloadableFile':
      case 'downloadableImage':
        return (
          <span className="flex flex-col px-1">
            <ArrowRight className={iconClassNames} />
            <span className="bg-energy-red-100 h-[2px] w-full" />
          </span>
        )
      case 'icsLink':
        return <TransformableIcon iconData={add} className={iconClassNames} />
      default:
        return <ArrowRight className={iconClassNames} />
    }
  }

  const contentVariantClassName: Partial<Record<Variants, string>> = {
    default: 'pb-3 pr-2 gap-6 xl:gap-16',
    fit: 'pb-3 pr-2 gap-6 xl:gap-16', //gap-14
    compact: 'text-sm pb-2 gap-6',
  }

  const classNames = envisTwMerge(
    `${baseResourceLinkClassNames}
    ${variantClassName[variant]}
  `,
    className,
  )

  const getContentElements = () => {
    switch (type) {
      case 'downloadableFile':
        return extension && extension.toUpperCase() === 'PDF' && showExtensionIcon ? (
          <span className="flex gap-2">
            <PiFilePdfThin />
            {children}
          </span>
        ) : (
          <>{children}</>
        )
      case 'icsLink':
        return (
          <span className="flex gap-2">
            <TransformableIcon iconData={calendar} />
            {children}
          </span>
        )
      default:
        return <>{children}</>
    }
  }
  return (
    <BaseLink className={classNames} type={type} ref={ref} href={href} {...rest}>
      <span
        className={envisTwMerge(
          `grid 
        grid-cols-[1fr_max-content]
        text-start
        items-center
        leading-tight
        ${contentVariantClassName[variant]}`,
        )}
      >
        {getContentElements()}
        {extension && !showExtensionIcon ? `(${extension.toUpperCase()})` : ''}
        {getArrowElement(type, iconClassName)}
      </span>
      <span className="w-[0%] h-[1px] bg-grey-40 transition-all duration-300 group-hover:w-full" />
    </BaseLink>
  )
})

export default ResourceLink
