import { ColorKeyTokens } from '../styles/colorKeyToUtilityMap'
import { ImageBackground } from './imageTypes'

export type BackgroundColours =
  | 'White'
  | 'Moss Green'
  | 'Moss Green Light'
  | 'Spruce Wood'
  | 'Mist Blue'
  | 'Slate Blue'
  | 'Mid Green'
  | 'Mid Yellow'
  | 'Mid Blue'
  | 'Mid Orange'
  | 'Slate Blue 95'

export type BackgroundTypes = 'colorlist' | 'backgroundImage'

export type ContentAlignmentTypes = 'left' | 'right' | 'center'

export type DesignOptions = {
  background: {
    type?: BackgroundTypes
    backgroundImage?: ImageBackground
    backgroundUtility?: keyof ColorKeyTokens
  }
}
