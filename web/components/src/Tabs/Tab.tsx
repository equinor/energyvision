import { forwardRef, CSSProperties } from 'react'
import { Tab as RTab, TabProps as RTabProps } from '@reach/tabs'
import styled from 'styled-components'

const StyledTab = styled(RTab)`
  color: var(--font-color);
  background: transparent;
  border: none;
  border-bottom: 2px solid;
  padding: var(--space-xSmall) 0;
  /* Not sure about this one, but some spaces for tab components that wrap multiple lines */
  margin-bottom: var(--space-small);
  :not(:last-child) {
    margin-right: var(--space-medium);
  }

  /* If the text is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
  }
`

export type TabProps = RTabProps & {
  inverted?: boolean
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({ inverted = false, children, ...rest }, ref) {
  return (
    <StyledTab
      ref={ref}
      {...rest}
      style={
        {
          '--font-color': inverted ? 'var(--inverted-text)' : 'var(--default-text)',
        } as CSSProperties
      }
    >
      {children}
    </StyledTab>
  )
})
