import { forwardRef } from 'react'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward } from '@equinor/eds-icons'
import { twMerge } from 'tailwind-merge'
import { BaseLink, BaseLinkProps } from './BaseLink'
import { LinkType } from '../../types/types'

export type ResourceLinkProps = {
  /** Overriding styles for the icon  */
  iconClassName?: string
  /** What kind of content is it  */
  type?: LinkType
} & Omit<BaseLinkProps, 'type'>

/** Read more link style */
export const ResourceLink = forwardRef<HTMLAnchorElement, ResourceLinkProps>(function ResourceLink(
  { children, type = 'internalUrl', className = '', iconClassName = '', href = '', ...rest },
  ref,
) {
  const classNames = twMerge(
    `
    group
    grid
    grid-cols-[auto_1fr]
    align-baseline
    w-full
    text-slate-blue-95
    py-5
    pr-2
    border-b-[0.5px]
    border-grey-40
    no-underline
    hover:border-b
  `,
    className,
  )

  const iconRotation: Record<string, string> = {
    externalUrl: '-rotate-45',
    downloadableFile: 'rotate-90',
    downloadableImage: 'rotate-90',
    internalUrl: '',
  }

  const iconClassNames = twMerge(
    `
    text-energy-red-100
    ${iconRotation[type] ?? ''}
    dark:text-white-100
    justify-self-end
    ${
      type === 'downloadableFile' || type === 'downloadableImage'
        ? 'group-hover:translate-y-2'
        : 'group-hover:translate-x-2'
    }
    transition-all
    duration-300
  `,
    iconClassName,
  )

  return (
    <BaseLink className={classNames} ref={ref} href={href} {...rest}>
      {children}

      <Icon data={arrow_forward} className={iconClassNames} style={{ all: 'revert-layer' }} />
    </BaseLink>
  )
})
export default ResourceLink
