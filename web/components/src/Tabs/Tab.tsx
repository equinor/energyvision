import { forwardRef, CSSProperties } from 'react'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'
import { Tab as CTab } from '@chakra-ui/react'
import { Tab as RTab, TabProps as RTabProps } from '@reach/tabs'
import { Flags } from '../../../common/helpers/datasetHelpers'

const { outline } = Tokens

const StyledCTab = styled(CTab)`
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
  /* If the text is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
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

const StyledTab = styled(RTab)`
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
  /* If the text is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
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

export type TabProps = RTabProps & {
  inverted?: boolean
  variant?: string
}

export const Tab = Flags.IS_DEV
  ? forwardRef<HTMLButtonElement, TabProps>(function CTab(
      { inverted = false, children, variant = 'line', ...rest },
      ref,
    ) {
      return (
        <StyledCTab
          ref={ref}
          _selected={{
            '--font-color': inverted ? 'var(--inverted-text)' : 'var(--default-text)',
            borderColor: inverted ? 'var(--inverted-text)' : 'var(--default-text)',
            borderBottom: '2px solid',
          }}
          variant={variant}
          {...rest}
          style={
            {
              '--font-color': inverted ? 'var(--inverted-text)' : 'var(--default-text)',
            } as CSSProperties
          }
        >
          {children}
        </StyledCTab>
      )
    })
  : forwardRef<HTMLButtonElement, TabProps>(function Tab({ inverted = false, children, ...rest }, ref) {
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
