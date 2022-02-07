import { FigureCaption as FigureCaptionWrapper, FigureCaptionProps, StyledFigCaption } from './FigureCaption'
import { Attribution } from './Attribution'
import { Caption } from './Caption'

type FigureCaptionCompoundProps = typeof FigureCaptionWrapper & {
  Caption: typeof Caption
  Attribution: typeof Attribution
}

const FigureCaption = FigureCaptionWrapper as FigureCaptionCompoundProps

FigureCaption.Caption = Caption
FigureCaption.Attribution = Attribution

export { FigureCaption, StyledFigCaption }
export type { FigureCaptionProps }
