'use client'
import type { HTMLAttributes } from 'react'
import { ImageBackgroundContainer } from '@/core/Backgrounds/ImageBackgroundContainer'
import Blocks from '@/portableText/Blocks'
import type { ImageWithAlt } from '@/types'
import type { HeroData } from './HeroBlock'

type TextOnBackgroundImageHeroProps = {
  background?: string
} & HeroData &
  HTMLAttributes<HTMLElement>

export const TextOnBackgroundImageHero = ({
  figure,
  title,
  ingress,
}: TextOnBackgroundImageHeroProps) => {
  const { image } = figure || {}
  return (
    <ImageBackgroundContainer
      image={image as ImageWithAlt}
      overrideGradient
      scrimClassName='py-40 lg:py-44 black-blue-center-gradient'
      aspectRatio={'9:16'}
    >
      <div className='px-layout-lg max-lg:py-11'>
        <Blocks value={title} id='mainTitle' variant='h1' />
        <div className='pt-6'>
          {ingress && <Blocks value={ingress} variant='ingress' />}
        </div>
      </div>
    </ImageBackgroundContainer>
  )
}
