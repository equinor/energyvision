import type { ValidationContext } from '@sanity/types'

export const validateStaticUrl = (value: string, context: ValidationContext) => {
  const { parent } = context as { parent: { isStatic?: boolean } }

  // This is not a static link
  if (!parent?.isStatic) return true

  if (parent?.isStatic && value === undefined) {
    return 'A link is required'
  } else if (value.startsWith('/no/') || value.startsWith('/en/')) {
    return `Please don't add the language information`
  } else if (value.endsWith('.html')) {
    return `Please remove .html`
  } else if (!value.startsWith('/')) {
    return `The link must start with a forward slash (/)`
  } else if (value.match(/([.])/g)) {
    return 'Illegal character (.)'
  } else return true
}
