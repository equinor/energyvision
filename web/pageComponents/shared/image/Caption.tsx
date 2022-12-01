import type { CaptionData } from 'types/types'
import { FigureCaption } from '@components'

export const Caption = ({ caption, attribution }: CaptionData) => {
  return caption || attribution ? (
    <FigureCaption>
      {caption && <FigureCaption.Caption>{caption}</FigureCaption.Caption>}
      {attribution && <FigureCaption.Attribution>{attribution}</FigureCaption.Attribution>}
    </FigureCaption>
  ) : null
}

export default Caption
