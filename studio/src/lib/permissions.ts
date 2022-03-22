/* eslint-disable import/no-unresolved */
import userStore from 'part:@sanity/base/user'

import { CurrentUser } from '@sanity/types/dist/dts'

export enum PERMISSIONS {
  ACCESS_SETTINGS = 'ACCESS_SETTINGS',
  ACCESS_LOCAL_NEWS_TAGS = 'ACCESS_LOCAL_NEWS_TAGS',
}

const ROLES: RolesType = {
  ACCESS_SETTINGS: ['administrator'],
  ACCESS_LOCAL_NEWS_TAGS: ['administrator'],
}

type RolesType = {
  [K in PERMISSIONS]: string[]
}

export const hasPermission = (permission: PERMISSIONS) => {
  const user = getCurrentUser()
  if (!user) return false
  const userRoles = user.roles.map((role) => role.name)

  return userRoles.some((role) => ROLES[permission]?.includes(role))
}

const getCurrentUser = () => {
  let userDetails: CurrentUser | undefined
  userStore.me.subscribe((user: CurrentUser) => {
    userDetails = user.id ? user : undefined
  })

  return userDetails
}
