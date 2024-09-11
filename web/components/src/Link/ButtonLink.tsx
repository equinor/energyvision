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

export const SkipLink = () => {
  return (
    <NextLink
      href="#mainTitle"
      className="sr-only focus:not-sr-only focus:z-50 focus:absolute focus:bg-white focus:border-black focus:bg-moss-green-100 focus:text-white-100 focus:m-6 focus:rounded focus:p-4 transition"
    >
      skip to content
    </NextLink>
  )
}
