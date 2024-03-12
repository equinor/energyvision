import { AnchorHTMLAttributes, forwardRef } from 'react'
import { arrow_forward, external_link, arrow_down } from '@equinor/eds-icons'
import { Icon } from '@equinor/eds-core-react'
import type { LinkType } from '../../types/types'
import { default as NextLink } from 'next/link'

export type LinkProps = {
  /** What kind of content is it  */
  type?: LinkType
  /** The locale for the link, required for internal URLs */
  locale?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

const getIconData = (type: LinkType) => {
  switch (type) {
    case 'downloadableFile':
    case 'downloadableImage': {
      return arrow_down
    }
    case 'externalUrl': {
      return external_link
    }
    default:
      return arrow_forward
  }
}

/** Regular link style for use in text */
export const BaseLink = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, type = 'internalUrl', className = '', href = '', ...rest },
  ref,
) {
  const variant = {}

  return type === 'externalUrl' ? (
    <a ref={ref} href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
      <Icon data={getIconData(type)} size={16} />
    </a>
  ) : (
    <NextLink ref={ref} href={href} prefetch={false} {...rest}>
      {children}
    </NextLink>
  )
})
