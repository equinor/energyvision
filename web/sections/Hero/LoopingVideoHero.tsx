import dynamic from 'next/dynamic'
import type { PortableTextBlock } from 'next-sanity'
import type { ReactNode } from 'react'
import type { Image } from '@/core/Image/imageUtilities'
import { twMerge } from '@/lib/twMerge/twMerge'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions } from '@/types'

export type LoopingVideoRatio = '1:2' | 'narrow' // Typo in Sanity value, should be 2:1

export type LoopingVideoData = {
  title: string
  poster: Image
  src: string
  ratio: LoopingVideoRatio
  containVideo?: boolean
}

export type LoopingVideoHeroProps = {
  title?: PortableTextBlock[]
  nextSectionDesignOptions?: DesignOptions
  video: LoopingVideoData
  className?: string
  breadcrumbsComponent?: ReactNode
}

const VideoPlayer = dynamic(() => import('@/core/VideoJsPlayer/VideoPlayer'))

export const LoopingVideoHero = ({
  title,
  video,
  nextSectionDesignOptions,
  className = '',
  breadcrumbsComponent,
}: LoopingVideoHeroProps) => {
  const { ratio } = video
  const { bg: nextCompBg, dark: nextCompDark } = getBgAndDarkFromBackground(
    nextSectionDesignOptions,
  )

  const aspect: Record<string, any> = {
    narrow: '10:3',
    tall: '21:9',
    '1:2': '2:1', // Typo in Sanity value, should look through dataset in prod for use and migrate or change to 2:1
  }

  return (
    <>
      <VideoPlayer
        variant='fullwidth'
        aspectRatio={aspect[ratio ?? 'narrow']}
        {...video}
        autoPlay
        muted
        loop
      />
      <div className={twMerge(nextCompBg, nextCompDark && 'dark')}>
        {breadcrumbsComponent && breadcrumbsComponent}
        <Blocks
          //@ts-ignore
          value={title}
          id='mainTitle'
          tabIndex={-1}
          as='h1'
          variant='h1'
          className={twMerge(
            `mx-auto max-w-content px-layout-sm lg:px-layout-lg`,
            !breadcrumbsComponent && 'pt-4 lg:pt-6',
            className,
          )}
        />
      </div>
    </>
  )
}
