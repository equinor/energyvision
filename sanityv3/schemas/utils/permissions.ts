import { Role, useCurrentUser } from 'sanity'

export function userHasRole(roles: string[]) {
  const user = useCurrentUser()

  if (!user || !roles) return false

  // Check if user has any of the specified roles
  return roles.some((role) => user.roles.some((userRole: Role) => userRole.name === role))
}
