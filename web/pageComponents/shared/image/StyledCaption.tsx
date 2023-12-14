import { BackgroundColours, CaptionData } from '../../../types'
import styled from 'styled-components'
import { Caption } from './Caption'
import { getColorOnContainer, getContainerColor } from '@components'

type CaptionProps = CaptionData & { background?: BackgroundColours }

const CaptionWithPadding = styled(Caption)<{ $bgColor?: BackgroundColours }>`
  max-width: var(--maxViewportWidth);
  padding: 0 var(--layout-paddingHorizontal-small);
  margin-left: auto;
  margin-right: auto;
  color: var(${({ $bgColor }) => getColorOnContainer($bgColor)});
`
const CaptionWrapper = styled.div<{ background?: BackgroundColours }>`
  display: inline-block;
  width: 100%;
  ${({ background }) => {
    // Captions's background color is defined by its following component
    const bgColor = background && {
      background: `var(${getContainerColor(background)})`,
    }
    return { ...bgColor }
  }}
`

export const StyledCaption = ({ attribution, caption, background }: CaptionProps) => {
  return caption || attribution ? (
    <CaptionWrapper background={background}>
      <CaptionWithPadding $bgColor={background} attribution={attribution} caption={caption} />
    </CaptionWrapper>
  ) : (
    <></>
  )
}

export default StyledCaption
