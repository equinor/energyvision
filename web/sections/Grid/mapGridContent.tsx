import HlsVideoPlayer, {
  type AspectRatioVariants,
  getThumbnailRatio,
  type HlsVideoPlayerProps,
} from '@core/HlsVideoPlayer/HlsVideoPlayer'
import { urlFor } from '../../common/helpers'
import type { ComponentProps } from '../../pageComponents/pageTemplates/shared/SharedPageContent'
import type { FigureData } from '../../pageComponents/topicPages/Figure'
import type { IFrameData, VideoPlayerData } from '../../types/index'
import IFrame from '../IFrameBlock/IFrameBlock'
import GridFigure from './GridFigure'
import { GridTeaser } from './GridTeaser'
import GridTextBlock from './GridTextBlock'

export type RowType = 'span3' | 'span2and1' | 'threeColumns' | undefined

export const mapGridContent = (data: ComponentProps, rowType?: RowType, isMobile?: boolean): React.ReactNode => {
  //@ts-ignore:so many types
  switch (data?.type) {
    case 'gridTextBlock':
      return <GridTextBlock key={data.id} data={data as any} rowType={rowType} />
    case 'gridTeaser':
      return <GridTeaser key={data.id} data={data as any} rowType={rowType} />
    case 'figure':
      return <GridFigure key={data.id} data={data as FigureData} />
    case 'iframe':
      return <IFrame key={data.id} data={data as IFrameData} />
    case 'videoPlayer': {
      const { width: w, height: h } = getThumbnailRatio('21:9')
      const videoData = data as VideoPlayerData
      const posterUrl = videoData?.video?.thumbnail
        ? urlFor(videoData?.video?.thumbnail).width(w).height(h)?.url()
        : undefined

      const videoProps: HlsVideoPlayerProps = {
        src: videoData?.video?.url,
        poster: posterUrl,
        title: videoData?.video?.title,
        aspectRatio: videoData?.designOptions?.aspectRatio as AspectRatioVariants,
      }
      return (
        <div className="relative w-full h-full aspect-[21/9]">
          <HlsVideoPlayer key={data.id} {...videoProps} className={`${isMobile ? '' : 'h-full sm:w-full'}`} />
        </div>
      )
    }
    default:
      return null
  }
}
