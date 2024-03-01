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
      return { background: defaultColors[1].value, highlight: defaultColors[8].value }
    case 2:
      return { background: defaultColors[2].value, highlight: defaultColors[8].value }
    case 3:
      return { background: defaultColors[3].value, highlight: defaultColors[8].value }
    case 4:
      return { background: defaultColors[4].value, highlight: defaultColors[8].value }
    case 5:
      return { background: defaultColors[5].value, highlight: defaultColors[8].value }
    case 6:
      return { background: defaultColors[6].value, highlight: defaultColors[5].value }
    case 7:
      return { background: defaultColors[6].value, highlight: defaultColors[4].value }
    case 8:
      return { background: defaultColors[7].value, highlight: defaultColors[8].value }

    case 0:
    default:
      return { background: defaultColors[0].value, highlight: defaultColors[8].value }
  }
}
