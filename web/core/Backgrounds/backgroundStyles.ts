import { BackgroundStyle } from './ColouredContainer'

export const getBackgroundClassesByStyles = (backgroundStyle: BackgroundStyle): string => {
  switch (backgroundStyle) {
    case 'none':
      return ''
    default:
      return 'max-w-viewport px-layout-lg mx-auto'
  }
}
