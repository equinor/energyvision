import { userHasRole } from './permissions'

export function shouldShowFieldBasedOnRole(fieldRoles: string[]) {
  // Roles that should see the field (e.g., ['admin', 'editor'])
  return userHasRole(fieldRoles)
}
