import { type StringInputProps, useCurrentUser } from 'sanity'

const defaultAllowedRoles = ['administrator', 'designer', 'developer']

export function RoleFilteredSelect(
  props: StringInputProps,
  restrictedValues: string[],
  allowedRoles = defaultAllowedRoles,
) {
  const { schemaType, renderDefault } = props
  //@ts-ignore: has this
  const currentUser = useCurrentUser()

  const roles = currentUser?.roles.map((r: any) => r.name) || []
  //@ts-ignore: null check
  const filteredList = schemaType?.options?.list.filter((option: any) => {
    const value = typeof option === 'string' ? option : option.value
    if (
      restrictedValues.includes(value) &&
      !roles.some((role: string) => allowedRoles.includes(role))
    ) {
      return false
    }
    return true
  })

  return renderDefault({
    ...props,
    schemaType: {
      ...schemaType,
      options: { ...schemaType.options, list: filteredList },
    },
  })
}
