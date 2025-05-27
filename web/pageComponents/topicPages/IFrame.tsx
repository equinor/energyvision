import type { IFrameData } from '../../types/index'
import { FigureCaption } from '@core/FigureCaption/FigureCaption'
import { BackgroundContainer } from '@core/Backgrounds'
import CoreIFrame from '../shared/iframe/IFrame'
import IngressText from '../shared/portableText/IngressText'
import TitleText from '../shared/portableText/TitleText'
import RichText from '../shared/portableText/RichText'
import TranscriptAndActions from '../../pageComponents/shared/TranscriptAndActions'
import { twMerge } from 'tailwind-merge'

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
    <BackgroundContainer {...restOptions} {...rest} id={anchor} renderFragmentWhenPossible>
      <div className={twMerge(`pb-page-content max-w-viewport px-layout-lg mx-auto`, className)}>
        {title && <TitleText className="px-0 pt-0 pr-8 " value={title} />}
        {ingress && (
          <div className="mb-8">
            <IngressText value={ingress}></IngressText>
          </div>
        )}
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
              <RichText value={description || []} />
            </FigureCaption>
          </figure>
        ) : (
          <>
          <CoreIFrame
            frameTitle={frameTitle}
            url={url}
            cookiePolicy={cookiePolicy}
            aspectRatio={aspectRatio}
            height={height}
            hasSectionTitle={!!title}
          />
          <FigureCaption size="medium">
            <RichText value={description || []} />
          </FigureCaption>
        </>
      )}
      <TranscriptAndActions action={action} transcript={transcript} ariaTitle={frameTitle} />
      </div>
    </BackgroundContainer>
  )
}

export default IFrame
