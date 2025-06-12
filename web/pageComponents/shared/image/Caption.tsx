import { FigureCaption } from '@core/FigureCaption/FigureCaption'
import { CaptionData } from '../../../types'
import { BackgroundContainer, BackgroundContainerProps } from '@core/Backgrounds'

type CaptionProps = CaptionData & BackgroundContainerProps

export const Caption = ({ attribution, caption, background }: CaptionProps) => {
  return caption || attribution ? (
    <BackgroundContainer className={'inline-block w-full'} background={background} backgroundStyle="none">
      {caption || attribution ? (
        <FigureCaption className={'max-w-viewport mx-auto pt-0 px-layout-sm pb-8'}>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      ) : (
        <></>
      )}
    </BackgroundContainer>
  ) : (
    <></>
  )
}
