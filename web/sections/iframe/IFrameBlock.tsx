import type { IFrameData } from '../../types/index'
import { FigureCaption } from '@core/FigureCaption/FigureCaption'
import { BackgroundContainer } from '@core/Backgrounds'
import CoreIFrame from '@sections/iframe/IFrameTemp'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import TranscriptAndActions from '../Transcript/TranscriptAndActions'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { Heading } from '@core/Typography'

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
      {title && <Heading as="h1" value={title} />}
      {ingress && <IngressText value={ingress}></IngressText>}
      {description ? (
        <figure className="m-0">
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
        </figure>
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
