'use client'
import type { HTMLAttributes } from 'react'
import { mapSanityImageRatio } from '@/core/Image/Image'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { twMerge } from '@/lib/twMerge/twMerge'
import Blocks from '@/portableText/Blocks'
import { resolveImage } from '@/sanity/lib/utils'
import type { HeroData } from './HeroBlock'

type TextOnBackgroundImageHeroProps = {
  background?: string
  isMagazineRoom?: boolean
  //On hold for later, creates an backdrop and frames the content with border
  backdropStyle?: boolean
} & HeroData &
  HTMLAttributes<HTMLElement>

export const TextOnBackgroundImageHero = ({
  figure,
  title,
  ingress,
  backgroundGradient,
  backgroundBlur = false,
  backdropStyle = false,
  isMagazineRoom = false,
  className = '',
}: TextOnBackgroundImageHeroProps) => {
  const { image } = figure || {}

  const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)

  const { url } = resolveImage({
    image,
    aspectRatio: mapSanityImageRatio('10:3'),
    grid: 'full',
    isLargerDisplays,
    useFitMax: true,
  })

  console.log('backgroundBlur', backgroundBlur)

  const ingressElement = ingress && <Blocks value={ingress} variant='body' />
  const titleElement = title && (
    <Blocks
      value={title}
      id='mainTitle'
      group='heading'
      variant='h1'
      blockClassName={`${isMagazineRoom && ingress ? '' : 'my-0 lg:my-0'}`}
    />
  )

  return (
    <div
      className={twMerge(
        `relative flex items-center lg:min-h-[28vh] ${backgroundGradient === 'dark' ? 'dark' : ''}
        ${
          backdropStyle
            ? 'py-20 pr-[10vw] pl-layout-sm lg:pr-[25vw] lg:pl-layout-md'
            : `px-layout-sm lg:px-layout-lg ${isMagazineRoom ? 'pt-6 pb-12 lg:pt-12 lg:pb-20' : ''}`
        } bg-center bg-cover bg-no-repeat`,
        className,
      )}
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      {backdropStyle ? (
        <div className='relative flex rounded-card'>
          <div className='z-1 px-8 py-6'>
            {titleElement}
            {isMagazineRoom && ingressElement}
          </div>
          <div className='backdrop-glass z-0 h-full w-full' />
        </div>
      ) : (
        <div className={`z-1 flex max-w-text flex-col justify-center`}>
          {titleElement}
          {isMagazineRoom && ingressElement}
        </div>
      )}
      {(backgroundGradient === 'dark' ||
        backgroundGradient === 'light' ||
        backgroundBlur) && (
        <div
          className={`absolute inset-0 z-0 ${
            backgroundGradient === 'dark' || backgroundGradient === 'light'
              ? `${backgroundGradient === 'dark' ? 'bg-slate-80/20' : 'bg-white-100/20'}`
              : `backdrop-glass-light`
          }`}
        />
      )}
    </div>
  )
}
