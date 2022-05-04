/* eslint-disable import/no-unresolved */
import userStore from 'part:@sanity/base/user'

import { CurrentUser } from '@sanity/types/dist/dts'

export const getCurrentUserRoles = () => {
  const user = getCurrentUser()
  return (!user) ? [] : user.roles.map((role) => role.name)
}

const getCurrentUser = () => {
  let userDetails: CurrentUser | undefined
  userStore.me.subscribe((user: CurrentUser) => {
    userDetails = user.id ? user : undefined
  })

  return userDetails
}
