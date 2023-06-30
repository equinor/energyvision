import { BackgroundColours, CaptionData } from '../../../types'
import styled from 'styled-components'
import { Caption } from './Caption'
import { getBackgroundByColorName } from '@components'

type CaptionProps = CaptionData & { background?: BackgroundColours }

const CaptionWrapper = styled.div<{ background?: BackgroundColours }>`
  display: flex;
  margin: 0 auto;
  padding: 0 var(--layout-paddingHorizontal-small);
  max-width: var(--maxViewportWidth);

  ${({ background }) => {
    // Captions's background color is defined by its following component
    const bgColor = background && {
      background: getBackgroundByColorName(background),
    }
    return { ...bgColor }
  }}
`

export const StyledCaption = ({ attribution, caption, background }: CaptionProps) => {
  return (
    <CaptionWrapper background={background}>
      <Caption attribution={attribution} caption={caption} />
    </CaptionWrapper>
  )
}

export default StyledCaption
