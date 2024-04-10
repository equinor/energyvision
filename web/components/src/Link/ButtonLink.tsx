import { forwardRef } from 'react'
import { Button, ButtonProps } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'

const StyledButtonLink = styled(Button)`
  --eds_button__height: auto;
  --eds_button__font_size: var(--typeScale-05);
  --eds_button__radius: var(--space-4);

  text-decoration: none;
  display: inline-block;

  color: var(--button-text);
  border-color: var(--button-border-color);
  background-color: var(--button-background);

  &:hover {
    color: var(--button-text-hover);
    background-color: var(--button-background-hover);
    border-color: var(--button-border-color-hover);
  }
`

export type ButtonLinkProps = { locale?: string } & ButtonProps

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { children, href = '', locale, ...rest },
  ref,
) {
  return (
    <StyledButtonLink
      locale={locale}
      forwardedAs={NextLink}
      prefetch={false}
      href={href}
      color="secondary"
      variant="outlined"
      ref={ref}
      {...rest}
    >
      {children}
    </StyledButtonLink>
  )
})

export const StyledSkipLink = styled(ButtonLink)`
  user-select: none;
  border: 0;
  margin: -1px;
  padding: 0;
  outline: 0;
  overflow: hidden;
  position: absolute;
  clip: rect(0 0 0 0);

  &:focus {
    clip: auto;
    width: auto;
    height: auto;
    background: white;
    border: 1px solid black;
    margin: var(--space-medium);
    border-radius: 7px;
    padding: var(--space-medium);
  }

  &:hover {
    color: var(--button-text-hover);
    background-color: var(--button-background-hover);
    border-color: var(--button-border-color-hover);
  }
`
