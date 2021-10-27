import { SchemaType } from '../../types'

export const validateStaticUrl = (value: string, context: SchemaType.ValidationContext) => {
  // This is not a static link
  if (!context.parent?.isStatic) return true
  if (context.parent?.isStatic && value === undefined) {
    return 'A link is required'
  }
  if (value.startsWith('/no/') || value.startsWith('/en/')) {
    return `Please don't add the language information`
  }
  if (value.endsWith('.html')) {
    return `Please remove .html`
  }
  if (!value.startsWith('/')) {
    return `The link must start with a forward slash (/)`
  }
  return true
}
