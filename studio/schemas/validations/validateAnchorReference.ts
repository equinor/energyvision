export const validateAnchorReference = (value: string): true | string[] => {
  const errors: string[] = []

  if (/^#/.test(value)) {
    errors.push('Anchor reference should not start with the # symbol.')
  }

  // Only allow letters, numbers, hyphens, and underscores
  const regex = /^[A-Za-z0-9_-]*$/
  if (!regex.test(value)) {
    errors.push('Anchor reference may only contain letters, numbers, hyphens, and underscores.')
  }

  // No whitespace allowed
  if (/\s/.test(value)) {
    errors.push('Anchor reference may not contain whitespace. Use hyphens (-) to separate words.')
  }

  if (errors.length > 0) return errors

  return true
}
