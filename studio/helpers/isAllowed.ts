import type { Role } from 'sanity'

const defaultRoles = ['administrator', 'developer', 'designer']
export const isAllowed = (currentUserRoles: any, overrideRoles?: string[]) => {
  const allowedRoles = overrideRoles ? overrideRoles : defaultRoles
  return currentUserRoles?.some((userRole: Role) =>
    allowedRoles?.includes(userRole.name),
  )
}
