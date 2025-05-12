import { BackgroundStyle } from './ColouredContainer'

export const getBackgroundClassesByStyles = (backgroundStyle: BackgroundStyle): string => {
  switch (backgroundStyle) {
    case 'none':
      return ''
    case 'wide':
      return 'max-w-viewport mx-auto'
    default:
      return 'max-w-viewport px-layout-lg mx-auto'
  }
}
