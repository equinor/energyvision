import { CaptionData } from '../../../types'
import { Caption } from './Caption'
import { BackgroundContainer, BackgroundContainerProps } from '@components'

type CaptionProps = CaptionData & BackgroundContainerProps

export const StyledCaption = ({ attribution, caption, background }: CaptionProps) => {
  return caption || attribution ? (
    <BackgroundContainer className={'inline-block w-full'} background={background}>
      <Caption
        className={'max-w-viewport mx-auto pt-0 px-layout-sm pb-8'}
        attribution={attribution}
        caption={caption}
      />
    </BackgroundContainer>
  ) : (
    <></>
  )
}

export default StyledCaption
