import styled from 'styled-components'
import type { IFrameData } from '../../types/types'
import { BackgroundContainer, FigureCaption } from '@components'
import CoreIFrame from '../shared/iframe/IFrame'
import { ButtonLink } from '../shared/ButtonLink'
import IngressText from '../../common/portableText/IngressText'
import TitleText from '../../common/portableText/TitleText'
import RichText from '../../common/portableText/RichText'

const StyledHeading = styled(TitleText)`
  padding: var(--iframe-titlePadding, 0 0 var(--space-large) 0);
  text-align: var(--iframe-titleAlign, left);
`

const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-3xLarge) var(--layout-paddingHorizontal-large));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const Figure = styled.figure`
  margin: 0;
`

const StyledButtonLink = styled(ButtonLink)`
  margin-top: var(--space-xLarge);
`

const Ingress = styled.div`
  margin-bottom: var(--space-large);
`

const IFrame = ({
  data: { title, ingress, frameTitle, url, description, cookiePolicy = 'none', designOptions, action },
  ...rest
}: {
  data: IFrameData
}) => {
  if (!url) return null

  const { height, aspectRatio, background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest}>
      <Container>
        {title && <StyledHeading value={title} />}
        {ingress && (
          <Ingress>
            <IngressText value={ingress}></IngressText>
          </Ingress>
        )}
        {description ? (
          <Figure>
            <CoreIFrame
              frameTitle={frameTitle}
              url={url}
              cookiePolicy={cookiePolicy}
              aspectRatio={aspectRatio}
              height={height}
              hasSectionTitle={!!title}
            />
            <FigureCaption size="medium">
              <RichText value={description} />
            </FigureCaption>
          </Figure>
        ) : (
          <CoreIFrame
            frameTitle={frameTitle}
            url={url}
            cookiePolicy={cookiePolicy}
            aspectRatio={aspectRatio}
            height={height}
            hasSectionTitle={!!title}
          />
        )}
        {action && action.label && <StyledButtonLink action={action} />}
      </Container>
    </BackgroundContainer>
  )
}

export default IFrame
