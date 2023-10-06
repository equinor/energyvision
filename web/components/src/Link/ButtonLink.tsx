import { forwardRef } from 'react'
import { Button, ButtonProps } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'

const StyledButtonLink = styled(Button)`
  --eds_button__height: auto;
  --eds_button__font_size: var(--typeScale-05);
  --eds_button__radius: var(--space-4);

  color: var(--slate-blue-95);
  text-decoration: none;
  display: inline-block;

  /* If the button link is used inside a inverted component, the text colour must also be inverted */
  &:hover {
    color: var(--inverted-text);
    background-color: var(--slate-blue-100);
  }
  .inverted-background & {
    color: var(--inverted-text);
    border-color: var(--white-100);
    &:hover {
      background-color: var(--white-100);
      color: var(--slate-blue-100);
    }
  }
`

export type ButtonLinkProps = { locale?: string } & ButtonProps

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { children, href = '', locale, ...rest },
  ref,
) {
  return (
    <NextLink href={href} locale={locale}>
      <StyledButtonLink color="secondary" variant="outlined" ref={ref} {...rest}>
        {children}
      </StyledButtonLink>
    </NextLink>
  )
})
