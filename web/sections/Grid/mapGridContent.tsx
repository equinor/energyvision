'use client'
import dynamic from 'next/dynamic'
import type { IFrameData } from '../../types/index'
import type { FigureData } from '../FigureBlock/FigureBlock'
import IFrame from '../IFrameBlock/IFrameBlock'
import type { VideoPlayerBlockProps } from '../VideoPlayerBlock/VideoPlayerBlock'
import GridFigure from './GridFigure'
import { GridTeaser } from './GridTeaser'
import GridTextBlock from './GridTextBlock'

export type RowType = 'span3' | 'span2and1' | 'threeColumns' | undefined

const VideoPlayer = dynamic(() => import('@/core/VideoJsPlayer/VideoPlayer'), {
  ssr: false,
})

export const mapGridContent = (
  data: any,
  rowType?: RowType,
): React.ReactNode => {
  //@ts-ignore:so many types
  switch (data.type) {
    case 'gridTextBlock':
      return (
        <GridTextBlock key={data.id} data={data as any} rowType={rowType} />
      )
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
