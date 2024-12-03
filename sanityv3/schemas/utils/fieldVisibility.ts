import { Role } from 'sanity'

export function shouldShowFieldBasedOnRole(userRoles: Role[], fieldRoles: string[]) {
  // Roles that should see the field (e.g., ['admin', 'editor'])
  return fieldRoles.some((role) => userRoles.some((userRole: Role) => userRole.name === role))
}
