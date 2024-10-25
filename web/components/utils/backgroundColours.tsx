import type { BackgroundColours } from '../../types/index'

export type StyleVariants =
  | '--bg-default'
  | '--bg-moss-green'
  | '--bg-moss-green-light'
  | '--bg-spruce-wood'
  | '--bg-mist-blue'
  | '--bg-slate-blue'
  | '--bg-mid-green'
  | '--bg-mid-yellow'
  | '--bg-mid-orange'
  | '--bg-mid-blue'
  | '--bg-slate-blue-95'

function isBackgroundColour(title: any): title is BackgroundColours {
  return [
    'White',
    'Moss Green',
    'Moss Green Light',
    'Spruce Wood',
    'Mist Blue',
    'Slate Blue',
    'Mid Green',
    'Mid Yellow',
    'Mid Blue',
    'Mid Orange',
    'Slate Blue 95',
  ].includes(title)
}

function getContainerColor(backgroundTitle?: BackgroundColours) {
  let styleVariant: StyleVariants = '--bg-default'
  if (backgroundTitle && isBackgroundColour(backgroundTitle))
    if (backgroundTitle === 'Slate Blue') {
      styleVariant = '--bg-mid-blue'
    } else if (backgroundTitle === 'White') {
      styleVariant = '--bg-default'
    } else {
      styleVariant = `--bg-${backgroundTitle?.replace(/\s/g, '-').toLowerCase()}` as StyleVariants
    }
  else {
    console.log(backgroundTitle + ' is not the correct background color')
  }
  return styleVariant
}

function getColorOnContainer(backgroundTitle?: BackgroundColours) {
  return isInvertedColor(backgroundTitle) ? '--inverted-text' : '--default-text'
}

function isInvertedColor(background?: BackgroundColours): boolean {
  const color = getContainerColor(background)
  return isInvertedStyle(color)
}

function isInvertedStyle(styleVariant: StyleVariants): boolean {
  return ['--bg-slate-blue', '--bg-mid-blue', '--bg-slate-blue-95'].includes(styleVariant)
}

export { getContainerColor, isInvertedStyle, getColorOnContainer, isInvertedColor }
