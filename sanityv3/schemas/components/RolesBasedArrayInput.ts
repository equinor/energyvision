import { Role, useCurrentUser } from 'sanity'

export function RolesBasedArrayInput(props: any) {
  const { schemaType, renderDefault } = props

  //get the role of the current user
  const { roles } = useCurrentUser()

  const allowedRoles = ['administrator', 'developer', 'designer']
  const hasAccess = roles.some((userRole: Role) => allowedRoles.includes(userRole.name))

  //if the user has the required roles, return all types. If not, filter some of them out.
  const allowedTypes = hasAccess
    ? schemaType.of
    : schemaType.of.filter((type: any) => !['videoPlayer', 'videoPlayerCarousel'].includes(type.name))

  //render the default component and replace the allowed types
  return renderDefault({ ...props, schemaType: { ...schemaType, of: allowedTypes } })
}
