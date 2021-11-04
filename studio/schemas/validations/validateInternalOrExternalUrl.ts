import type { Reference } from '@sanity/types'

export const validateInternalOrExternalUrl = (
  isStatic: boolean,
  value: string,
  connectedField: string | Reference | undefined,
) => {
  // This is not a static link
  if (isStatic) return true
  if (value && connectedField) {
    return 'Can only have a single link. Choose either an internal or external link.'
  }

  if (!value && !connectedField) {
    return 'You must provide either an internal or external link.'
  }

  if (connectedField && !value) {
    return true
  }

  return true
}
