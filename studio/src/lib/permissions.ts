/* eslint-disable import/no-unresolved */
import userStore from 'part:@sanity/base/user'

import { CurrentUser } from '@sanity/types/dist/dts'

export enum PERMISSIONS {
  ACCESS_SETTINGS = 'ACCESS_SETTINGS',
  ACCESS_LOCAL_NEWS_TAGS = 'ACCESS_LOCAL_NEWS_TAGS',
}

const ROLES: RolesType = {
  ACCESS_SETTINGS: ['administrator', 'developer', 'editor'],
  ACCESS_LOCAL_NEWS_TAGS: ['administrator', 'developer'],
}

type RolesType = {
  [K in PERMISSIONS]: string[]
}

export const getCurrentUserRoles = () => {
  const user = getCurrentUser()
  if (!user) return []
  return user.roles.map((role) => role.name)
}

export const hasPermission = (permission: PERMISSIONS) => {
  const userRoles = getCurrentUserRoles()
  return userRoles.some((role) => ROLES[permission]?.includes(role))
}

const getCurrentUser = () => {
  let userDetails: CurrentUser | undefined
  userStore.me.subscribe((user: CurrentUser) => {
    userDetails = user.id ? user : undefined
  })

  return userDetails
}
