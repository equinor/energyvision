import styled from 'styled-components'
import type { IFrameData } from '../../types/types'
import { BackgroundContainer } from '@components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer, IngressBlockRenderer, BlockRenderer } from '../../common/serializers'
import RequestConsentContainer from './RequestConsentContainer'
import { ButtonLink } from './ButtonLink'

const StyledHeading = styled(TitleBlockRenderer)`
  padding: var(--iframe-titlePadding, 0 0 var(--space-large) 0);
  text-align: var(--iframe-titleAlign, left);
`

const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-3xLarge) var(--layout-paddingHorizontal-large));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const DescriptionContainer = styled.div`
  margin-top: var(--space-medium);
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

const IFrame = ({
  data: { title, ingress, description, action, frameTitle, url, cookiePolicy = 'none', designOptions },
  ...rest
}: {
  data: IFrameData
}) => {
  if (!url) return null

  const { height, aspectRatio, background } = designOptions
  const containerPadding = height ? `${height}px` : calculatePadding(aspectRatio)

  console.log('action', action)

  return (
    <BackgroundContainer background={background} {...rest}>
      <Container>
        {title && (
          <SimpleBlockContent
            blocks={title}
            serializers={{
              types: {
                block: (props) => <StyledHeading {...props} />,
              },
            }}
          />
        )}
        {ingress && (
          <SimpleBlockContent
            blocks={ingress}
            serializers={{
              types: {
                block: IngressBlockRenderer,
              },
            }}
          />
        )}
        <div className={`cookieconsent-optin-${cookiePolicy}`}>
          <IFrameContainer aspectRatioPadding={containerPadding}>
            <StyledIFrame src={url} title={frameTitle}></StyledIFrame>
          </IFrameContainer>
        </div>
        {cookiePolicy !== 'none' && (
          <div className={`cookieconsent-optout-${cookiePolicy}`}>
            <RequestConsentContainer hasSectionTitle={!!title} />
          </div>
        )}
        {description && (
          <SimpleBlockContent
            blocks={description}
            serializers={{
              types: {
                block: BlockRenderer,
              },
              container: DescriptionContainer,
            }}
            renderContainerOnSingleChild
          />
        )}
        {action && action.label && <ButtonLink action={action} />}
      </Container>
    </BackgroundContainer>
  )
}

export default IFrame
