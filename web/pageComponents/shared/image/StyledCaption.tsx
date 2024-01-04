import { CaptionData } from '../../../types'
import styled from 'styled-components'
import { Caption } from './Caption'
import { BackgroundContainer, BackgroundContainerProps } from '@components'

type CaptionProps = CaptionData & BackgroundContainerProps

const CaptionWithPadding = styled(Caption)`
  max-width: var(--maxViewportWidth);
  padding: 0 var(--layout-paddingHorizontal-small) var(--space-xLarge) var(--layout-paddingHorizontal-small);
  margin-left: auto;
  margin-right: auto;
`
const CaptionWrapper = styled(BackgroundContainer)`
  display: inline-block;
  width: 100%;
`

export const StyledCaption = ({ attribution, caption, background }: CaptionProps) => {
  return caption || attribution ? (
    <CaptionWrapper background={background}>
      <CaptionWithPadding attribution={attribution} caption={caption} />
    </CaptionWrapper>
  ) : (
    <></>
  )
}

export default StyledCaption
