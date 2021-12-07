import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { calendar, time } from '@equinor/eds-icons'
import { Card } from '../Card'

const { StyledLandscapeCard, StyledPortraitCard } = Card

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
    margin-left: 0.5em;
  }
`

const StyledIcon = styled(Icon)`
  /* If the icons are inside a card they should be green */
  ${StyledLandscapeCard} &,
  ${StyledPortraitCard} & {
    /* EDS Icon uses current color for fill */
    color: var(--moss-green-100);
  }
`

export const DateIcon = (): JSX.Element => <StyledIcon data={calendar} />
export const TimeIcon = (): JSX.Element => <StyledIcon data={time} />
