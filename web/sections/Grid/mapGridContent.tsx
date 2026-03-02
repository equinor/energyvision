import { ComponentProps } from '../../pageComponents/pageTemplates/shared/SharedPageContent'
import { IFrameData, VideoPlayerData } from '../../types/index'
import IFrame from '../IFrameBlock/IFrameBlock'
//import { VideoJsComponent } from '../../pageComponents/shared/VideoPlayer'
import GridTextBlock from './GridTextBlock'
import { GridTeaser } from './GridTeaser'
import GridFigure from './GridFigure'
import { FigureData } from '../../pageComponents/topicPages/Figure'
import HlsVideoPlayer from '@core/HlsVideoPlayer/HlsVideoPlayer'

export type RowType = 'span3' | 'span2and1' | 'threeColumns' | undefined

export const mapGridContent = (data: ComponentProps, rowType?: RowType, isMobile?: boolean): React.ReactNode => {
  console.log('mapGridContent data.type', data.type)
  console.log('mapGridContent data', data)
  //@ts-ignore:so many types
  switch (data.type) {
    case 'gridTextBlock':
      return <GridTextBlock key={data.id} data={data as any} rowType={rowType} />
    case 'gridTeaser':
      return <GridTeaser key={data.id} data={data as any} rowType={rowType} />
    case 'figure':
      return <GridFigure key={data.id} data={data as FigureData} />
    case 'iframe':
      return <IFrame key={data.id} data={data as IFrameData} />
    case 'videoPlayer': {
      const videoProps = {
        src: data?.video?.url,
        poster: data?.video?.thumbnail,
        title: data?.video?.title,
        aspectRatio: data?.designOptions?.aspectRatio,
      }
      return (
        //@ts-ignore:todo
        <div className="relative w-full h-full aspect-[21/9]">
          <HlsVideoPlayer key={data.id} {...videoProps} className={`${isMobile ? '' : 'h-full sm:w-full'}`} />
        </div>
      )
    }
    default:
      return null
  }
}
