/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { forwardRef, AnchorHTMLAttributes, CSSProperties } from 'react'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward, external_link, arrow_down } from '@equinor/eds-icons'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'
import type { LinkType } from '../../../types/types'
import { default as NextLink } from 'next/link'

const { outline } = Tokens

/*link - color
link - color - hover
arrow - color
arrow - background - color
*/
export const BaseLink = styled(NextLink)<{ $textDecoration?: string }>`
  display: inline-flex;
  align-items: center;
  color: var(--link-color);
  text-decoration: ${({ $textDecoration }) => $textDecoration || 'none'};
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
  & > svg {
    flex-shrink: 0;
    box-sizing: content-box;
    padding: 0 var(--space-1);
  }
`

// TODO: should part of this styling be moved to a list item instead?
const ContentLink = styled(BaseLink)`
  border-bottom: 0.5px solid var(--grey-40);
  text-decoration: none;
  padding: var(--space-small) 0;
  color: var(--content-link-color) !important;
  width: 100%;
  & > svg {
    fill: var(--link-arrow-color);
    margin-left: auto;
    border: 1px solid transparent;
    border-radius: 50%;
    padding: var(--space-small) !important;
  }
  &:hover svg {
    background: var(--energy-red-50);
    fill: var(--content-link-arrow-color-hover);
  }
`

const ReadMoreLink = styled(BaseLink)`
  display: inline-flex;
  max-width: max-content;
  color: var(--content-link-color);
  justify-content: center;
  text-decoration: none;
  position: relative;

  & > svg {
    margin-left: var(--space-small);
    padding-right: 0;
    transition: 0.3s;
    fill: var(--link-arrow-color);
  }

  &:hover svg {
    padding-left: var(--space-medium);
    fill: var(--link-arrow-color-hover);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 0%;
    border-bottom: solid 0.5px var(--content-link-color);
    transition: 0.3s;
  }

  &:hover:after {
    width: 100%;
  }
`

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

export type LinkProps = {
  /** Which design to use */
  variant?: 'regular' | 'contentLink' | 'readMore'
  /** What kind of content is it  */
  type?: LinkType
  /** Some links don't have an underline, like the menu links */
  underline?: boolean
  /** The locale for the link, required for internal URLs */
  locale?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, variant = 'regular', type = 'internalUrl', underline = true, style, href = '', ...rest },
  ref,
) {
  if (variant === 'contentLink') {
    return (
      <ContentLink href={href} ref={ref} {...rest}>
        {children} <Icon data={getIconData(type)} />
      </ContentLink>
    )
  } else if (variant === 'readMore') {
    return (
      <ReadMoreLink href={href} ref={ref} {...rest}>
        {children} <Icon data={getIconData(type)} />
      </ReadMoreLink>
    )
  }

  // TODO: design not final
  return (
    <BaseLink
      ref={ref}
      href={href}
      style={
        {
          ...style,
        } as CSSProperties
      }
      $textDecoration={underline ? 'underline' : 'none'}
      prefetch={false}
      {...rest}
    >
      {children} {type === 'externalUrl' ? <Icon data={external_link} size={16} /> : null}
    </BaseLink>
  )
})
