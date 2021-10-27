import styled from 'styled-components'
import type { IFrameData } from '../../types/types'
import { Heading, BackgroundContainer } from '@components'
import SimpleBlockContent from '../../common/SimpleBlockContent'

const StyledHeading = styled(Heading)`
  padding: 0 0 var(--space-large) 0;
`

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

const IFrame = ({ data: { title, frameTitle, url, designOptions }, ...rest }: { data: IFrameData }) => {
  if (!url) return null

  const { height, aspectRatio, background } = designOptions
  const containerPadding = height ? `${height}px` : calculatePadding(aspectRatio)

  return (
    <BackgroundContainer background={background} {...rest}>
      <Container>
        {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: ({ children }) => (
                  <StyledHeading size="xl" level="h2">
                    {children}
                  </StyledHeading>
                ),
              },
            }}
          />
        )}
        <IFrameContainer aspectRatioPadding={containerPadding}>
          <StyledIFrame src={url} title={frameTitle}></StyledIFrame>
        </IFrameContainer>
      </Container>
    </BackgroundContainer>
  )
}

export default IFrame
