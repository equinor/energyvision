import { BackgroundColours, CaptionData } from '../../../types'
import styled from 'styled-components'
import { Caption } from './Caption'
import { getBackgroundByColorName } from '@components'

type CaptionProps = CaptionData & { background?: BackgroundColours }

const CaptionWithPadding = styled(Caption)`
  max-width: var(--maxViewportWidth);
  padding: 0 var(--layout-paddingHorizontal-small);
  margin-left: auto;
  margin-right: auto;
`
const CaptionWrapper = styled.div<{ background?: BackgroundColours }>`
  display: inline-block;
  width: 100%;
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
      <CaptionWithPadding attribution={attribution} caption={caption} />
    </CaptionWrapper>
  )
}

export default StyledCaption
