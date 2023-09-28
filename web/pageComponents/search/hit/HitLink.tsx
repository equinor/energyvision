import styled from 'styled-components'
import { default as NextLink } from 'next/link'

// This is just the shared styles and not the
// component itself. This is because we had some issues with
// Next.js and error message in the console. When we tried the
// suggested workaround, next/link didn't work
// properly with client side navigation using forwardRef. See issue #892
export const StyledHitLink = styled(NextLink)`
  padding: var(--space-medium) 0;
  display: block;
  color: var(--inverted-text);
  cursor: pointer;
  outline: none;
  text-decoration: none;
`
