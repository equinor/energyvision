import { BackgroundStyle } from './ColouredContainer'

export const getBackgroundClassesByStyles = (backgroundStyle: BackgroundStyle): string => {
  switch (backgroundStyle) {
    case 'none': // used for fullwidth images/ videos
      return ''
    case 'wide': // used where titles and content have different padding ex: Promotions, TextWithIconArray
      return ''
    default:
      return 'max-w-viewport px-layout-lg mx-auto'
  }
}
