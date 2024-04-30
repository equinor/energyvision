import { ComponentProps } from '../../pageComponents/pageTemplates/shared/SharedPageContent'
import { FigureData, IFrameData, VideoPlayerData } from '../../types/types'
import Figure from '../../pageComponents/topicPages/Figure'
import IFrame from '../../pageComponents/topicPages/IFrame'
import VideoPlayer from '../../pageComponents/shared/VideoPlayer'
import GridTextBlock from './GridTextBlock'
import { GridTeaser } from './GridTeaser'
import GridFigure from './GridFigure'

export type RowType = 'span3' | 'span2and1' | undefined

export const mapGridContent = (data: ComponentProps, rowType?: RowType): React.ReactNode => {
  switch (data.type) {
    case 'gridTextBlock':
      return <GridTextBlock key={data.id} data={data as any} />
    case 'gridTeaser':
      return <GridTeaser key={data.id} data={data as any} rowType={rowType} />
    case 'figure':
      return <GridFigure key={data.id} data={data as FigureData} />
    case 'iframe':
      return <IFrame key={data.id} data={data as IFrameData} />
    case 'videoPlayer': {
      return (
        <VideoPlayer key={data.id} data={data as VideoPlayerData} className={`p-0 px-0`} bgClassName="" height="100%" />
      )
    }
    default:
      return null
  }
}
