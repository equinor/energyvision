import styled from 'styled-components'
import type { IFrameData } from '../../types/types'
import { BackgroundContainer, FigureCaption } from '@components'
import CoreIFrame from '../shared/iframe/IFrame'
import { ButtonLink } from '../shared/ButtonLink'
import IngressText from '../shared/portableText/IngressText'
import TitleText from '../shared/portableText/TitleText'
import RichText from '../shared/portableText/RichText'

const StyledHeading = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
  text-align: left;
`

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
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
  anchor,
  data: { title, ingress, frameTitle, url, description, cookiePolicy = 'none', designOptions, action },
  ...rest
}: {
  data: IFrameData
  anchor?: string
}) => {
  if (!url) return null

  const { height, aspectRatio, background } = designOptions

  return (
    <BackgroundContainer background={{ backgroundColor: background }} {...rest} id={anchor}>
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
