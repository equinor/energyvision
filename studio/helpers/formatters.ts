export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export function shortenWithEllipsis(string: string, maxLength: number): string {
  if (string.length <= maxLength) {
    return string
  }
  return string.slice(0, maxLength) + '...'
}
