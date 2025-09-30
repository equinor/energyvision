'use client'
import { HTMLAttributes } from 'react'
import { Icon } from '@equinor/eds-core-react'
import { calendar, time } from '@equinor/eds-icons'

export type DateProps = {
  datetime: string | Date
  icon?: boolean
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
  weekday?: 'long'
  uppercase?: boolean
} & HTMLAttributes<HTMLSpanElement>

export const DateIcon = (): JSX.Element => <Icon data={calendar} className="text-norwegian-woods-100" />
export const TimeIcon = (): JSX.Element => <Icon data={time} className="text-norwegian-woods-100" />
