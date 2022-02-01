export const validateAnchorReference = (value: string): string | true => {
  if (/^#/.test(value)) {
    return 'Anchor reference should not start with the # symbol.'
  }

  // No whitespace allowed
  if (/\s/.test(value)) {
    return 'Anchor reference may not contain whitespace. Use hyphens (-) to separate words.'
  }

  // Only allow letters, numbers, hyphens, and underscores
  const regex = /^[A-Za-z0-9_-]*$/
  if (!regex.test(value)) {
    return 'Anchor reference may only contain letters, numbers, hyphens, and underscores.'
  }

  return true
}
