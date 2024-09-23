import styled from 'styled-components'
import type { IFrameData } from '../../../types/index'
import { BackgroundContainer } from '@components'
import TitleText from '../portableText/TitleText'
import IFrame from './IFrame'

const StyledHeading = styled(TitleText)`
  padding: var(--iframe-titlePadding, 0 0 var(--space-large) 0);
  text-align: var(--iframe-titleAlign, left);
`

const Container = styled.div`
  padding: var(--iframe-innerPadding, var(--space-3xLarge) var(--layout-paddingHorizontal-large));
  max-width: var(--iframe-maxWidth, var(--maxViewportWidth));
  margin: auto;
`

const BasicIFrame = ({ data, ...rest }: { data: IFrameData }) => {
  const { title, frameTitle, url, cookiePolicy = ['none'], designOptions } = data || {}
  if (!url) return null

  const { height, aspectRatio, background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest}>
      <Container>
        {title && <StyledHeading value={title} />}
        <IFrame
          frameTitle={frameTitle}
          url={url}
          cookiePolicy={cookiePolicy}
          aspectRatio={aspectRatio}
          height={height}
          hasSectionTitle={!!title}
        />
      </Container>
    </BackgroundContainer>
  )
}

export default BasicIFrame
