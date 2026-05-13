import { Select } from '@sanity/ui'
import { useEffect } from 'react'
import { type StringInputProps, set, unset, useCurrentUser } from 'sanity'

const defaultAllowedRoles = ['administrator', 'developer', 'designer']

export function RoleFilteredSelect(
  props: StringInputProps,
  restrictedValues: string[],
  allowedRoles = defaultAllowedRoles,
) {
  const { schemaType, onChange, value /*, renderDefault */ } = props
  //@ts-ignore: has this
  const currentUser = useCurrentUser()

  const roles = currentUser?.roles.map((r: any) => r.name) || []
  const options = schemaType?.options?.list || []
  const initialValue =
    typeof schemaType?.initialValue === 'string' ? schemaType.initialValue : ''

  useEffect(() => {
    if (!value && initialValue) {
      onChange(set(initialValue))
    }
  }, [initialValue, onChange, value])

  return (
    <Select
      value={value}
      onChange={event => {
        const nextValue = event.currentTarget.value
        onChange(nextValue ? set(nextValue) : unset())
      }}
    >
      {!schemaType?.initialValue && (
        <option value=''>Select an option...</option>
      )}
      {options.map(option => {
        const optionValue = typeof option === 'string' ? option : option.value
        const title = typeof option === 'string' ? option : option.title

        const notAllowed =
          //@ts-ignore
          restrictedValues.includes(optionValue) &&
          !roles.some((role: string) => allowedRoles.includes(role))
        return (
          <option key={optionValue} value={optionValue} disabled={notAllowed}>
            {title}
          </option>
        )
      })}
    </Select>
  )
}
