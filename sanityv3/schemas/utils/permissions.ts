import { Role, useCurrentUser } from 'sanity'

export function userHasRole(roles: string[]) {
  const user = useCurrentUser()
  if (!user || !roles) return false
  // Check if user has any of the specified roles
  return roles.some((role) => user.roles.some((userRole: Role) => userRole.name === role))
}

export function userHasDesignerRole() {
  const user = useCurrentUser()
  if (!user) return false
  console.log('user.roles', user.roles)
  // Check if user has any of the specified roles
  return user.roles.some((userRole: Role) => userRole.name === 'designer')
}
