import type { CaptionData } from 'types/index'
import { FigureCaption } from '@components'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export const Caption = ({ caption, attribution, className }: CaptionData & HTMLAttributes<HTMLElement>) => {
  return caption || attribution ? (
    <FigureCaption className={className}>
      {caption && <FigureCaption.Caption>{caption}</FigureCaption.Caption>}
      {attribution && <FigureCaption.Attribution>{attribution}</FigureCaption.Attribution>}
    </FigureCaption>
  ) : null
}

export default Caption
