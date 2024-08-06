import { ComponentProps } from '../../pageComponents/pageTemplates/shared/SharedPageContent'
import { FigureData, IFrameData, VideoPlayerData } from '../../types/types'
import IFrame from '../../pageComponents/topicPages/IFrame'
import { VideoJsComponent } from '../../pageComponents/shared/VideoPlayer'
import GridTextBlock from './GridTextBlock'
import { GridTeaser } from './GridTeaser'
import GridFigure from './GridFigure'

export type RowType = 'span3' | 'span2and1' | 'threeColumns' | undefined

export const mapGridContent = (data: ComponentProps, rowType?: RowType, isMobile?: boolean): React.ReactNode => {
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
      return (
        <VideoJsComponent
          key={data.id}
          {...(data as VideoPlayerData)}
          className={`${isMobile ? '' : 'h-full sm:w-full'}`}
        />
      )
    }
    default:
      return null
  }
}
