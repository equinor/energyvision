import React, { forwardRef } from 'react'

import { useId } from '@reach/auto-id'
import { Select, TextInput, useForwardedRef } from '@sanity/ui'
import { FormField } from 'sanity'
import timezones from '../../helpers/timezones'
// eslint-disable-next-line import/no-unresolved
import { PatchEvent, set, unset } from 'sanity'

type Props = {
  value?: string
  markers: any[]
  presence: any
  onChange: (event: any) => void
  readOnly?: boolean
  type: {
    name: string
    title: string
    description?: string
    placeholder?: string
  }
}

const TimezoneInput = forwardRef((props: Props, forwardedRef: React.ForwardedRef<HTMLSelectElement>) => {
  const { presence, type, readOnly, markers, value, onChange } = props
  const ref = useForwardedRef(forwardedRef)
  const id = useId()

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    onChange(createPatchFrom(event.currentTarget.value))
  }

  const createPatchFrom = (value: string) => PatchEvent.from(value === '' ? unset() : set(value))

  return (
    <FormField
      __unstable_markers={markers}
      __unstable_presence={presence}
      inputId={id}
      title={type.title}
      description={type.description}
    >
      {readOnly ? (
        <TextInput readOnly value={value} />
      ) : (
        <Select id={id} value={value} ref={ref} onChange={handleChange}>
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, ' ')}
            </option>
          ))}
        </Select>
      )}
    </FormField>
  )
})

export default TimezoneInput
