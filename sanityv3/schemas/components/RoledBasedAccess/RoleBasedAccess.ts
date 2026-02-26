import { type Role, useCurrentUser } from 'sanity'

const restrictedComponents = [
  'videoPlayer',
  'videoPlayerCarousel',
  'fullWidthVideo',
  'promoteExternalLinkV2',
  'grid',
  'campaignBanner',
]

export function RolesBasedArrayInput(props: any) {
  const { schemaType, renderDefault, ...restProps } = props

  //get the role of the current user
  //@ts-expect-error CurrentUser has roles in types...
  const { roles } = useCurrentUser()

  const allowedRoles = ['administrator', 'developer', 'designer']
  const hasAccess = roles.some((userRole: Role) => allowedRoles.includes(userRole.name))

  let fieldsArray = schemaType.of
  // Older sanity version doesnt seem to have of property.
  if (typeof schemaType.of === 'undefined') {
    fieldsArray = schemaType.fields
  }
  //if the user has the required roles, return all types. If not, filter some of them out.
  const allowedTypes = hasAccess
    ? fieldsArray
    : fieldsArray?.filter((type: any) => !restrictedComponents.includes(type.name))

  //render the default component and replace the allowed types
  return renderDefault({
    ...restProps,
    schemaType: { ...schemaType, of: allowedTypes },
  })
}
