import type { BackgroundColours } from '../../types/types'

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

function getContainerColor(backgroundTitle?: BackgroundColours) {
  let styleVariant: StyleVariants = '--bg-default'
  if (backgroundTitle === 'White') {
    styleVariant = '--bg-default'
  } else {
    styleVariant = `--bg-${backgroundTitle?.replace(/\s/g, '-').toLowerCase()}` as StyleVariants
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
  return ['--bg-slate-blue', '--bg-mid-blue'].includes(styleVariant)
}

export { getContainerColor, isInvertedStyle, getColorOnContainer, isInvertedColor }
