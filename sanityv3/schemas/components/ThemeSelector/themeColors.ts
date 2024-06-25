import { defaultColors } from '../../defaultColors'

//Keep in sync with web/pageComponents/shared/textTeaser/theme
export const themeColors = [
  { title: 'White', value: 0 },
  { title: 'Moss Green Light', value: 1 },
  { title: 'Spruce Wood', value: 2 },
  { title: 'Mist Blue', value: 3 },
  { title: 'Mid Yellow', value: 4 },
  { title: 'Mid Orange', value: 5 },
  { title: 'Mid Blue 1', value: 6 },
  { title: 'Mid Blue 2', value: 7 },
  { title: 'Mid Blue 3', value: 8 },
  { title: 'Mid Green', value: 9 },
  { title: 'Mist Blue 2', value: 10 },
  { title: 'Black text', value: 11 },
  { title: 'White text', value: 12 },
]

//Keep in sync with web/pageComponents/shared/textTeaser/theme
export const getColorForTheme = (pattern: number) => {
  switch (pattern) {
    case 1:
      return {
        background: {
          value: defaultColors[1].value,
          key: defaultColors[1].key,
        },
        highlight: {
          value: defaultColors[8].value,
          key: defaultColors[8].key,
        },
      }
    case 2:
      return {
        background: {
          value: defaultColors[2].value,
          key: defaultColors[2].key,
        },
        highlight: {
          value: defaultColors[8].value,
          key: defaultColors[8].key,
        },
      }
    case 3:
      return {
        background: {
          value: defaultColors[3].value,
          key: defaultColors[3].key,
        },
        highlight: {
          value: defaultColors[8].value,
          key: defaultColors[8].key,
        },
      }
    case 4:
      return {
        background: {
          value: defaultColors[4].value,
          key: defaultColors[4].key,
        },
        highlight: {
          value: defaultColors[8].value,
          key: defaultColors[8].key,
        },
      }
    case 5:
      return {
        background: {
          value: defaultColors[5].value,
          key: defaultColors[5].key,
        },
        highlight: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 6:
      return {
        background: {
          value: defaultColors[6].value,
          key: defaultColors[6].key,
        },
        highlight: {
          value: defaultColors[5].value,
          key: defaultColors[5].key,
        },
      }
    case 7:
      return {
        background: {
          value: defaultColors[6].value,
          key: defaultColors[6].key,
        },
        highlight: {
          value: defaultColors[4].value,
          key: defaultColors[4].key,
        },
      }
    case 8:
      return {
        background: {
          value: defaultColors[6].value,
          key: defaultColors[6].key,
        },
        highlight: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
      }
    case 9:
      return {
        background: {
          value: defaultColors[7].value,
          key: defaultColors[7].key,
        },
        highlight: {},
      }
    case 10:
      return {
        background: {
          value: defaultColors[3].value,
          key: defaultColors[3].key,
        },
        highlight: {
          value: defaultColors[6].value,
          key: defaultColors[6].key,
        },
      }
    case 11:
      return {
        background: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
        highlight: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 12:
      return {
        background: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
        highlight: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
      }

    case 0:
    default:
      return {
        background: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
        highlight: {
          value: defaultColors[8].value,
          key: defaultColors[8].key,
        },
      }
  }
}
