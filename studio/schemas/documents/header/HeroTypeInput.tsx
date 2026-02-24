import { Select } from '@sanity/ui'
import { useCallback } from 'react'
import {
  type Role,
  type StringInputProps,
  set,
  type TitledListValue,
  useCurrentUser,
} from 'sanity'

const restrictedHeroTypes = ['loopingVideo', 'noHero']

export default function HeroTypeInput(props: StringInputProps) {
  const { value, onChange, schemaType } = props
  const { options } = schemaType
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
  const herotypes = (options?.list as Array<TitledListValue<'string'>>)?.filter(
    option => {
      //@ts-ignore: works despite ts
      if (restrictedHeroTypes.includes(option?.value)) {
        return roles.some((userRole: Role) =>
          allowedRoles.includes(userRole.name),
        )
      }
      return true
    },
  )

  return (
    <div>
      <Select onChange={handleChange} value={value}>
        {herotypes?.map(herotype => {
          return (
            <option key={herotype.value} value={herotype.value}>
              {herotype.title}
            </option>
          )
        })}
      </Select>
    </div>
  )
}
