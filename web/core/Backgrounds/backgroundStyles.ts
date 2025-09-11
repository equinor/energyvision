import { BackgroundStyle } from './ColouredContainer'

export const getBackgroundClassesByStyles = (backgroundStyle: BackgroundStyle): string => {
  switch (backgroundStyle) {
    case 'none':
      return ''
    case 'wide':
      return ' mx-auto'
    default:
      return ' px-layout-lg mx-auto'
  }
}
