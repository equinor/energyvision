import { CaptionData } from '../../../types'
import styled from 'styled-components'
import { Caption } from './Caption'

const CaptionWrapper = styled.div`
  margin: 0 auto;
  padding: 0 var(--layout-paddingHorizontal-small);
  max-width: var(--maxViewportWidth);
`

export const StyledCaption = ({ caption, attribution }: CaptionData) => {
  return (
    <CaptionWrapper>
      <Caption attribution={attribution} caption={caption} />
    </CaptionWrapper>
  )
}

export default StyledCaption
