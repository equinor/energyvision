import type { IFrameData, PortableTextBlock } from '../../types/index'
import { FigureCaption } from '@core/FigureCaption/FigureCaption'
import { BackgroundContainer } from '@core/Backgrounds'
import CoreIFrame from '../shared/iframe/IFrame'
import IngressText from '../shared/portableText/IngressText'
import TranscriptAndActions from '../../pageComponents/shared/TranscriptAndActions'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@core/Typography'
import { toPlainText } from '@portabletext/react'

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
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  return (
    <BackgroundContainer {...restOptions} {...rest} id={anchor} renderFragmentWhenPossible>
      <div className={twMerge(`pb-page-content max-w-viewport mx-auto`, className)}>
        {title && <Typography className="px-0 pt-0 pr-8 pb-4">{plainTitle}</Typography>}
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
              <Blocks value={description || []} />
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
              <Blocks value={description || []} />
            </FigureCaption>
          </>
        )}
        <TranscriptAndActions action={action} transcript={transcript} ariaTitle={frameTitle} />
      </div>
    </BackgroundContainer>
  )
}

export default IFrame
