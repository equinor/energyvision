export const chunkArray = (array: any[], chunkSize: number) => {
  const chunkedArray = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize))
  }
  return chunkedArray
}
