/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { forwardRef, AnchorHTMLAttributes } from 'react'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward, external_link, arrow_down } from '@equinor/eds-icons'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

// TODO: Get colours and other constants from theme with css variables

export const BaseLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: rgba(0, 112, 121, 1);
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
  & > svg {
    flex-shrink: 0;
    box-sizing: content-box;
    padding: 0 var(--spacing-xxSmall);
  }
`

// TODO: should part of this styling be moved to a list item instead?
const ContentLink = styled(BaseLink)`
  border-bottom: 0.5px solid #b4bbc0;
  text-decoration: none;
  padding: var(--spacing-small) 0;
  /* Should be safe to assume that content links always will be 100% width? */
  width: 100%;
  & > svg {
    margin-left: auto;
    border: 1px solid transparent;
    border-radius: 50%;
    padding: 8px;
  }
  &:hover svg {
    /* @TODO Fix colours and theming */
    background: var(--moss-green-60);
  }
`

const ReadMoreLink = styled(BaseLink)`
  display: inline-flex;
  max-width: max-content;
  color: rgba(235, 0, 55, 1);
  justify-content: center;
  text-decoration: none;
  position: relative;

  & > svg {
    padding-right: 0;
    transition: 0.3s;
  }

  &:hover svg {
    padding-left: 1em;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 0%;
    border-bottom: solid 0.5px rgba(235, 0, 55, 1);
    transition: 0.3s;
  }

  &:hover:after {
    width: 100%;
  }

  /* If the link is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
    &:after {
      border-bottom-color: var(--inverted-text);
    }
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

type LinkType = 'internalUrl' | 'externalUrl' | 'downloadableFile' | 'downloadableImage'

export type LinkProps = {
  /** Which design to use */
  variant?: 'regular' | 'contentLink' | 'readMore'
  /** What kind of content is it  */
  type?: LinkType
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, variant = 'regular', type = 'internalUrl', ...rest },
  ref,
) {
  if (variant === 'contentLink') {
    return (
      <ContentLink ref={ref} {...rest}>
        {children} <Icon data={getIconData(type)} />
      </ContentLink>
    )
  } else if (variant === 'readMore') {
    return (
      <ReadMoreLink ref={ref} {...rest}>
        {children} <Icon data={arrow_forward} />
      </ReadMoreLink>
    )
  }

  // TODO: design not final
  return (
    <BaseLink ref={ref} {...rest}>
      {children} {type === 'externalUrl' ? <Icon data={external_link} size={16} /> : null}
    </BaseLink>
  )
})
