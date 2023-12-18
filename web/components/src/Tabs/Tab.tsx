import { forwardRef, CSSProperties } from 'react'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'
import { Tab as CTab, TabProps as CTabProps } from '@chakra-ui/react'

const { outline } = Tokens

const StyledTab = styled(CTab)`
  color: var(--font-color);
  background: transparent;
  border: none;

  padding: var(--space-xSmall) 0;
  /* Not sure about this one, but some spaces for tab components that wrap multiple lines */
  margin-bottom: var(--space-small);
  :not(:last-child) {
    margin-right: var(--space-medium);
  }
  &:hover {
    cursor: pointer;
  }

  color: var(--color-on-background);

  &:active {
    background: transparent;
  }

  &:focus-visible {
    outline: none;
    ${outlineTemplate(outline)}
    outline-color: var(--mist-blue-100);
  }

  &[data-selected] {
    border-bottom: 2px solid;
  }
`

export type TabProps = CTabProps & {
  variant?: string
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function CTab({ children, variant = 'line', ...rest }, ref) {
  return (
    <StyledTab
      ref={ref}
      _selected={{
        '--font-color': 'var(--color-on-background)',
        borderColor: 'var(--color-on-background)',
        borderBottom: '2px solid',
      }}
      variant={variant}
      {...rest}
      style={
        {
          '--font-color': 'var(--color-on-background)',
        } as CSSProperties
      }
    >
      {children}
    </StyledTab>
  )
})
