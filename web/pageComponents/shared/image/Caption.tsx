import type { CaptionData } from 'types/types'
import { FigureCaption } from '@components'

export const Caption = ({ caption, attribution, ...rest }: CaptionData) => {
  return caption || attribution ? (
    <FigureCaption {...rest}>
      {caption && <FigureCaption.Caption>{caption}</FigureCaption.Caption>}
      {attribution && <FigureCaption.Attribution>{attribution}</FigureCaption.Attribution>}
    </FigureCaption>
  ) : null
}

export default Caption
