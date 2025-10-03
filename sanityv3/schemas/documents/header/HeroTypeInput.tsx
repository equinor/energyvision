import { Select } from '@sanity/ui'
import { useCallback } from 'react'
import { Role, set, StringInputProps, TitledListValue, useCurrentUser, userHasRole } from 'sanity'

export default function HeroTypeInput(props: StringInputProps) {
  const { value, onChange, schemaType } = props
  //@ts-ignore CurrentUser has roles in types...
  const { roles } = useCurrentUser()

  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLSelectElement>) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  const allowedRoles = ['administrator', 'developer', 'designer']
  const herotypes = (schemaType?.options?.list as Array<TitledListValue<'string'>>)?.filter((option) => {
    //@ts-ignore: works despite ts
    if (option?.value === 'loopingVideo') {
      return roles.some((userRole: Role) => allowedRoles.includes(userRole.name))
    }
    return true
  })

  return (
    <Select onChange={handleChange} value={value}>
      {herotypes?.map((herotype) => (
        <option key={herotype.value} value={herotype.value}>
          {herotype.title}
        </option>
      ))}
    </Select>
  )
}
