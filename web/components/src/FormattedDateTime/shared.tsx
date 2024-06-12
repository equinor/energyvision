import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { calendar, time } from '@equinor/eds-icons'

export type DateProps = {
  datetime: string
  icon?: boolean
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
  /** Uppercase letter for the date or not */
  uppercase?: boolean
} & HTMLAttributes<HTMLSpanElement>

export const StyledDate = styled.span<{ uppercase?: boolean }>`
  display: inline-flex;
  align-items: center;
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
  & > svg {
    flex-shrink: 0;
    box-sizing: content-box;
  }

  & > :not([hidden]) ~ :not([hidden]) {
    margin-left: var(--space-small);
  }
`

export const DateIcon = (): JSX.Element => <Icon data={calendar} className="text-norwegian-woods-100" />
export const TimeIcon = (): JSX.Element => <Icon data={time} className="text-norwegian-woods-100" />
