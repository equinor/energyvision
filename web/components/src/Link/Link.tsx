/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { forwardRef, HTMLAttributes } from 'react'
import { default as NextLink } from 'next/link'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward } from '@equinor/eds-icons'
import styled from 'styled-components'

export enum LinkType {
  Regular = 1,
  ContentLink,
  ReadMore,
}

export type LinkProps = {
  type: LinkType
  href: string // should not have to declare this?
} & HTMLAttributes<HTMLAnchorElement>

// TODO: Get colours and other constants from theme with css variables
const ContentLink = styled.a`
  display: flex;
  color: rgba(0, 112, 121, 1);
  border-bottom: 0.5px solid #b4bbc0;
  text-decoration: none;
  padding: 1em 1em 1em 0;

  & > svg {
    margin-left: auto;
    padding-left: 1em;
    flex-shrink: 0;
    box-sizing: content-box;
  }
`

const ReadMoreLink = styled(ContentLink)`
  display: inline-flex;
  border: none;
  color: rgba(235, 0, 55, 1);
  padding: 0;
  justify-content: center;
  align-items: center;
  border-bottom: solid 0.5px transparent;

  & > svg {
    margin: 0;
  }

  &:hover {
    border-color: rgba(235, 0, 55, 1);
  }
`

/**
 * TODO: Pass icon from outside of component as part of {children}
 * or pass desired icon as prop value & have fixed selection of
 * icons to choose from?
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, href, type = LinkType.Regular, ...rest }, ref) => {
    if (type === LinkType.ContentLink) {
      return (
        <NextLink href={href} {...rest} passHref>
          <ContentLink ref={ref}>
            {children} <Icon data={arrow_forward} />
          </ContentLink>
        </NextLink>
      )
    } else if (type === LinkType.ReadMore) {
      return (
        <NextLink href={href} {...rest} passHref>
          <ReadMoreLink ref={ref}>
            {children} <Icon data={arrow_forward} />
          </ReadMoreLink>
        </NextLink>
      )
    }

    return (
      <NextLink href={href} {...rest}>
        <a ref={ref}>{children}</a>
      </NextLink>
    )
  },
)

Link.displayName = 'EnvisLink'
