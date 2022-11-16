import React, { forwardRef, useCallback, useEffect, useState } from 'react'

import { useId } from '@reach/auto-id'

import { ResetIcon } from '@sanity/icons'
import { Marker } from '@sanity/types'
import { FormField } from '@sanity/base/components'
import { Box, Button, Flex, Select, Text, useForwardedRef } from '@sanity/ui'
// eslint-disable-next-line import/no-unresolved
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

export const EMPTY = '--'
export const INVALID_TIME_FORMAT = 'Invalid time format'

const range = (start: number, stop: number, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x: number, y: number) => x + y * step)

const TIMESTEP = 5
const MINUTES = range(0, 60, TIMESTEP)
const HOURS_24 = range(0, 24)
const outgoingValue = ({ hours, minutes }: TimeType) => `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
const isValid = ({ hours, minutes }: TimeType) =>
  hours && minutes && Number.isInteger(Number(hours)) && Number.isInteger(Number(minutes))

const formatTime = (value: string | undefined): TimeType => {
  const time = value && value.includes(':') ? value.split(':') : false

  if (!time) {
    return {
      hours: EMPTY,
      minutes: EMPTY,
    }
  }

  return {
    hours: time[0] || EMPTY,
    minutes: time[1] || EMPTY,
  }
}

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
  const [time, setTime] = useState(formatTime(value))

  const updateValue = useCallback(
    (time: TimeType) => {
      setTime(time)
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
    },
    [onChange],
  )

  const handleHoursChange = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      updateValue({ ...time, hours: event.currentTarget.value })
    },
    [time, updateValue],
  )

  const handleMinutesChange = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      updateValue({ ...time, minutes: event.currentTarget.value })
    },
    [time, updateValue],
  )

  const handleReset = useCallback(() => {
    updateValue({ hours: EMPTY, minutes: EMPTY })
  }, [updateValue])

  const ref = useForwardedRef(forwardedRef)

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
