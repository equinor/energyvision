// ISO dates are hard to type in ts apparently
export const formatDate = (isoDate: any): string => {
  const date = new Date(isoDate)
  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  } as const
  const formattedDate = date.toLocaleDateString('no-NB', options) || ''
  return formattedDate
}
