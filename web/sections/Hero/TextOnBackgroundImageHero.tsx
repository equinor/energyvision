'use client'
import type { HTMLAttributes } from 'react'
import { mapSanityImageRatio } from '@/core/Image/Image'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import Blocks from '@/portableText/Blocks'
import { resolveImage } from '@/sanity/lib/utils'
import type { HeroData } from './HeroBlock'

type TextOnBackgroundImageHeroProps = {
  background?: string
} & HeroData &
  HTMLAttributes<HTMLElement>

export const TextOnBackgroundImageHero = ({
  figure,
  title,
  ingress,
  backgroundGradient,
  backdropStyle,
}: TextOnBackgroundImageHeroProps) => {
  const { image } = figure || {}
  console.log('ingress', ingress)
  const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)

  const { url } = resolveImage({
    image,
    aspectRatio: mapSanityImageRatio('10:3'),
    grid: 'full',
    isLargerDisplays,
    useFitMax: true,
  })

  const ingressElement = ingress && <Blocks value={ingress} variant='body' />
  const titleElement = title && (
    <Blocks value={title} id='mainTitle' variant='h1' />
  )
  //black-blue-center-gradient
  const paddingClass = backdropStyle ? '' : ''
  return (
    <div
      className={`
        ${backdropStyle ? 'py-20 pr-[10vw] pl-layout-sm lg:pr-[25vw] lg:pl-layout-md' : 'px-layout-sm max-lg:py-11 lg:px-layout-lg'}bg-center bg-cover bg-no-repeat`}
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      {backdropStyle ? (
        <div className='relative flex rounded-card'>
          <div className='z-1 px-8 py-6'>
            {titleElement}
            {ingressElement}
          </div>
          <div className='backdrop-glass z-0 h-full w-full' />
        </div>
      ) : (
        <>
          {titleElement}
          {ingressElement}
        </>
      )}
    </div>
  )
}
