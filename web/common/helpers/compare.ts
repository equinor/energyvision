export const localeCompareUndefined = (a: any, b: any) => {
  if (a === undefined && b === undefined) return 0
  else if (a === undefined) return -1
  else if (b === undefined) return 1
  else return b - a
}
