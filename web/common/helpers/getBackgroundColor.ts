import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'

const getBgClassName = (token?: keyof ColorKeyTokens): string => {
  const map = token && colorKeyToUtilityMap[token]
  return map ? `${map.background} ${map.dark ? 'dark' : ' '}` : ''
}

export default getBgClassName
