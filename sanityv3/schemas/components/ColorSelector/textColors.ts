export const textColors = [
  { title: 'Mid Yellow', value: '#FFF5B8' },
  { title: 'Mid Orange', value: '#F8D1AF' },
  { title: 'Red', value: '#D6434D' },
]

export const isValidTextColor = (textColor: String, backgroundColor: String): Boolean => {
  switch (backgroundColor) {
    case 'Mid Blue':
      return textColor === 'Mid Yellow' || textColor === 'Mid Orange'
    case 'Mid Orange':
      return textColor === 'Red'
    default:
      return false
  }
}
