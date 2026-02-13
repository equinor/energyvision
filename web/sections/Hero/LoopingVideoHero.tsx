'use client'
import type { PortableTextBlock } from 'next-sanity'
import { VideoPlayer } from '@/core/VideoJsPlayer/VideoPlayer'
import { twMerge } from '@/lib/twMerge/twMerge'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions, ImageWithAlt } from '@/types'

export type LoopingVideoRatio = '1:2' | 'narrow' // Typo in Sanity value, should be 2:1

export type LoopingVideoData = {
  title: string
  poster: ImageWithAlt
  src: string
  ratio: LoopingVideoRatio
  containVideo?: boolean
}

export type LoopingVideoHeroProps = {
  title?: PortableTextBlock[]
  nextSectionDesignOptions?: DesignOptions
  video: LoopingVideoData
  className?: string
}

export const LoopingVideoHero = ({
  title,
  video,
  nextSectionDesignOptions,
  className = '',
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
      <Blocks
        //@ts-ignore
        value={title}
        id='mainTitle'
        as='h1'
        variant='h1'
        blockClassName={twMerge(
          `pt-4 lg:pt-6 px-layout-sm lg:px-layout-lg ${nextCompBg} ${nextCompDark ? nextCompDark : ''}`,
          className,
        )}
      />
    </>
  )
}
