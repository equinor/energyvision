import React, { forwardRef, useCallback, useEffect, useState } from 'react'

import { range } from 'lodash'
import { useId } from '@reach/auto-id'

import { ResetIcon } from '@sanity/icons'
import { Marker } from '@sanity/types'
import { FormField } from '@sanity/base/components'
import { Box, Button, Flex, Select, Text, useForwardedRef } from '@sanity/ui'
// eslint-disable-next-line import/no-unresolved
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

export const EMPTY = '--'
export const INVALID_TIME_FORMAT = 'Invalid time format'

const TIMESTEP = 5
const MINUTES = range(0, 60, TIMESTEP)
const HOURS_24 = range(0, 24)
const outgoingValue = ({ hours, minutes }: TimeType) => `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
const isValid = ({ hours, minutes }: TimeType) =>
  hours && minutes && Number.isInteger(Number(hours)) && Number.isInteger(Number(minutes))

type Props = {
  value?: string
  markers: Marker[]
  presence: any
  onChange: (event: any) => void
  type: {
    name: string
    title: string
    description?: string
    placeholder?: string
  }
}

type TimeType = {
  hours: string
  minutes: string
}

const TimeInput = forwardRef((props: Props, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
  const { value, onChange, presence, type, markers } = props
  const [warning, setWarning] = useState('')
  const [time, setTime] = useState({
    hours: value?.split(':')[0] ?? EMPTY,
    minutes: value?.split(':')[1] ?? EMPTY,
  })

  const handleHoursChange = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      setTime({ ...time, hours: event.currentTarget.value })
    },
    [time],
  )

  const handleMinutesChange = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      setTime({ ...time, minutes: event.currentTarget.value })
    },
    [time],
  )

  const handleReset = useCallback(() => {
    setTime({ hours: EMPTY, minutes: EMPTY })
  }, [])

  const ref = useForwardedRef(forwardedRef)

  useEffect(() => {
    setWarning('')
    const newValue = outgoingValue(time)
    if (isValid(time)) {
      onChange(createPatchFrom(newValue))
    } else if (time.hours === EMPTY && time.minutes === EMPTY) {
      onChange(createPatchFrom(''))
    } else {
      setWarning(INVALID_TIME_FORMAT)
      onChange(createPatchFrom(newValue))
    }
  }, [onChange, time])

  const createPatchFrom = (value: string) => PatchEvent.from(value === '' ? unset() : set(value))

  const id = useId()

  return (
    <FormField
      __unstable_markers={
        warning && !markers.some((e) => e.item.message === INVALID_TIME_FORMAT)
          ? [
              ...markers,
              {
                type: 'validation',
                level: 'warning',
                item: { message: warning, paths: [] },
              } as unknown as Marker,
            ]
          : markers
      }
      __unstable_presence={presence}
      inputId={id}
      title={type.title}
      description={type.description}
    >
      <Flex ref={ref} align="center" flex={1}>
        <Box>
          <Select id={id} aria-label="Select hour" value={value?.split(':')[0] ?? EMPTY} onChange={handleHoursChange}>
            {[EMPTY, ...HOURS_24].map((h) => (
              <option key={h} value={`${h}`.padStart(2, '0')}>
                {`${h}`.padStart(2, '0')}
              </option>
            ))}
          </Select>
        </Box>
        <Box paddingX={1}>
          <Text>:</Text>
        </Box>
        <Box>
          <Select aria-label="Select minutes" value={value?.split(':')[1] ?? EMPTY} onChange={handleMinutesChange}>
            {[EMPTY, ...MINUTES].map((m) => (
              <option key={m} value={`${m}`.padStart(2, '0')}>
                {`${m}`.padStart(2, '0')}
              </option>
            ))}
          </Select>
        </Box>
        <Box paddingLeft={2}>
          <Button icon={ResetIcon} text="Clear" onClick={handleReset} />
        </Box>
      </Flex>
    </FormField>
  )
})

export default TimeInput
