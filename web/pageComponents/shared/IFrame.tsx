import styled from 'styled-components'
import type { IFrameData } from '../../types/types'

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const IFrameContainer = styled.div<{ aspectRatioPadding: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: ${({ aspectRatioPadding }) => aspectRatioPadding};
`

const StyledIFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
`

const calculatePadding = (aspectRatio: string): string => {
  const ratio = aspectRatio.split(':')
  const percentage = (parseInt(ratio[1]) / parseInt(ratio[0])) * 100

  return `${percentage}%`
}

const IFrame = ({ data: { title, url, aspectRatio } }: { data: IFrameData }) => {
  return (
    <Container>
      <IFrameContainer aspectRatioPadding={calculatePadding(aspectRatio)}>
        <StyledIFrame src={url} title={title}></StyledIFrame>
      </IFrameContainer>
    </Container>
  )
}

export default IFrame
