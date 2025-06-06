import styled from 'styled-components'
import type { IFrameData } from '../../types/index'
import { FigureCaption } from '@core/FigureCaption/FigureCaption'
import { BackgroundContainer } from '@core/Backgrounds'
import CoreIFrame from '../shared/iframe/IFrame'
import IngressText from '../shared/portableText/IngressText'
import TitleText from '../shared/portableText/TitleText'
import TranscriptAndActions from '../../pageComponents/shared/TranscriptAndActions'
import Blocks from '../../pageComponents/shared/portableText/Blocks'

const StyledHeading = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
  text-align: left;
`

const Figure = styled.figure`
  margin: 0;
`

const Ingress = styled.div`
  margin-bottom: var(--space-large);
`

const IFrame = ({
  anchor,
  data: { title, ingress, frameTitle, url, description, cookiePolicy = ['none'], designOptions, action, transcript },
  className,
  ...rest
}: {
  data: IFrameData
  anchor?: string
  className?: string
}) => {
  if (!url) return null

  const { height, aspectRatio, ...restOptions } = designOptions
  return (
    <BackgroundContainer {...restOptions} {...rest} id={anchor} className={className} renderFragmentWhenPossible>
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
            <Blocks value={description} />
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
      <TranscriptAndActions action={action} transcript={transcript} ariaTitle={frameTitle} />
    </BackgroundContainer>
  )
}

export default IFrame
