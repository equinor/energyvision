export const defaultColors = [
  { title: 'White', value: 0 },
  { title: 'Moss Green Light', value: 1 },
  { title: 'Spruce Wood', value: 2 },
  { title: 'Mist Blue', value: 3 },
  { title: 'Mid Yellow', value: 4 },
  { title: 'Mid Orange', value: 5 },
  { title: 'Mid Blue 1', value: 6 },
  { title: 'Mid Blue 2', value: 7 },
  { title: 'Mid Green', value: 8 },
]

export const getColorForTheme = (pattern: number) => {
  switch (pattern) {
    case 1:
      return { background: 'hsl(184, 30%, 96%)', highlight: 'hsl(348, 100%, 54%)' }
    case 2:
      return { background: 'hsl(25, 100%, 94%)', highlight: 'hsl(348, 100%, 54%)' }
    case 3:
      return { background: 'hsl(199, 58%, 90%)', highlight: 'hsl(348, 100%, 54%)' }
    case 4:
      return { background: '#FFF5B8', highlight: 'hsl(348, 100%, 54%)' }
    case 5:
      return { background: '#F8D1AF', highlight: 'hsl(348, 100%, 54%)' }
    case 6:
      return { background: '#49709C', highlight: '#F8D1AF' }
    case 7:
      return { background: '#49709C', highlight: '#FFF5B8' }
    case 8:
      return { background: '#C3E4CE', highlight: 'hsl(348, 100%, 54%)' }

    case 0:
    default:
      return { background: 'hsl(0, 0%, 100%)', highlight: 'hsl(348, 100%, 54%)' }
  }
}
