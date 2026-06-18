export const removeWhiteSpace = (input: string) => {
  if (typeof input == 'undefined' || input == null) {
    return null
  } else {
    return input.replace(/\s/g, '')
  }
}
