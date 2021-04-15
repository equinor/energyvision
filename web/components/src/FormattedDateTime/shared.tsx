import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { calendar, time } from '@equinor/eds-icons'

export type DateProps = {
  datetime: string
  withIcon?: boolean
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
} & HTMLAttributes<HTMLSpanElement>

export const StyledDate = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  text-transform: uppercase;

  & > svg {
    flex-shrink: 0;
    box-sizing: content-box;
    padding-right: 0.5em;
  }

  & time:first-of-type {
    margin-right: 0.5em;
  }
`

export const DateIcon = (): JSX.Element => <Icon data={calendar} />
export const TimeIcon = (): JSX.Element => <Icon data={time} />
