import { defaultColors } from '../../defaultColors'

// Text teaser colors
export const getColorForTheme = (pattern: number) => {
  switch (pattern) {
    case 1:
      return {
        //moss green light
        background: {
          value: defaultColors[1].value,
          key: defaultColors[1].key,
        },
        //energy red
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
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 3:
      return {
        background: {
          value: defaultColors[3].value,
          key: defaultColors[3].key,
        },
        highlight: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
    case 4:
      return {
        background: {
          value: defaultColors[4].value,
          key: defaultColors[4].key,
        },
        highlight: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
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
    case 13: {
      //black on moss green light
      return {
        background: {
          value: defaultColors[1].value,
          key: defaultColors[1].key,
        },
        highlight: {
          value: defaultColors[9].value,
          key: defaultColors[9].key,
        },
      }
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
