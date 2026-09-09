import type {
  ThemeSelectorColor,
  ThemeSelectorValue,
} from '../../components/ThemeSelector';
import { defaultColors } from '../../defaultColors';

export const tabsThemeColors = [
  { title: 'Mist Blue', value: 0 },
  { title: 'Mid Orange', value: 1 },
  { title: 'Moss Green Light', value: 2 },
  { title: 'White with grey cards', value: 3 },
];

//Keep in sync with web/sections/TabBlock/tabsThemes
export const getColorForTabTheme = (
  color: ThemeSelectorValue,
): ThemeSelectorColor => {
  switch (color.value) {
    case 1:
      return {
        background: {
          value: defaultColors[10].value,
          key: defaultColors[10].key,
        },
        foreground: {
          value: defaultColors[5].value,
          key: defaultColors[5].key,
        },
      };
    case 2:
      return {
        background: {
          value: defaultColors[11].value,
          key: defaultColors[11].key,
        },
        foreground: {
          value: defaultColors[7].value,
          key: defaultColors[7].key,
        },
      };
    case 3:
      return {
        background: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
        foreground: {
          value: defaultColors[13].value,
          key: defaultColors[13].key,
        },
      };
    default:
      return {
        background: {
          value: defaultColors[3].value,
          key: defaultColors[3].key,
        },
        foreground: {
          value: defaultColors[0].value,
          key: defaultColors[0].key,
        },
      };
  }
};
