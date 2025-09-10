'use client'
import { IFrameData } from '../../types/index'
import IFrame from '../IFrameBlock/IFrameBlock'
import GridTextBlock from './GridTextBlock'
import { GridTeaser } from './GridTeaser'
import GridFigure from './GridFigure'
import { FigureData } from '../../pageComponents/topicPages/Figure'
import { VideoPlayer } from '@/core/VideoJsPlayer/VideoPlayer'
import { VideoPlayerBlockProps } from '../VideoPlayerBlock/VideoPlayerBlock'

export type RowType = 'span3' | 'span2and1' | 'threeColumns' | undefined

export const mapGridContent = (data: any, rowType?: RowType): React.ReactNode => {
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
      return (
        //@ts-ignore: TODO
        <VideoPlayer key={data.id} {...(data as VideoPlayerBlockProps)} />
      )
    }
    default:
      return null
  }
}
