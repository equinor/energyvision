import type { IFrameData } from '../../types/index'
import { BackgroundContainer, FigureCaption } from '@components'
import CoreIFrame from '../shared/iframe/IFrame'
import IngressText from '../shared/portableText/IngressText'
import TitleText from '../shared/portableText/TitleText'
import RichText from '../shared/portableText/RichText'
import { twMerge } from 'tailwind-merge'
import TranscriptAndActions from '../../pageComponents/shared/TranscriptAndActions'

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
        {title && <TitleText className="pt-0 pr-0 pb-8 pl-0 text-left" value={title} />}
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
              <RichText value={description} />
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
      </div>
    </BackgroundContainer>
  )
}

export default IFrame
