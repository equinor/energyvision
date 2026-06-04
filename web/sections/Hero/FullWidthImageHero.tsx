import type { PortableTextBlock } from 'next-sanity'
import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import type { Figure, ImageRatioKeys } from '@/core/Image/imageUtilities'
import { Picture } from '@/core/Picture/Picture'
import { getDisplayTextVariant } from '@/core/Typography/Typography'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions } from '@/types'
import MagazineTagBar, {
  type MagazineTag,
} from '../MagazineTags/MagazineTagBar'

export type FullWidthImageHeroVariant = 'default' | 'tall' | 'narrow'
/** For heroData */
export type heroRatio = 'tall' | 'narrow'

export type FullWidthImageHeroProps = {
  figure?: Figure
  title?: PortableTextBlock[]
  /* For new or magazine published information */
  subTitle?: ReactNode
  displayTextVariant?: 'none' | 'base' | 'lg' | 'xl'
  /** sanity hero prop, but used to set variant below in heroBlock */
  ratio?: heroRatio
  /* Magazine promoted tagline */
  magazineTags?: MagazineTag[]
  variant?: FullWidthImageHeroVariant
  breadcrumbsComponent?: ReactNode
  nextSectionDesignOptions?: DesignOptions
  figCaptionClassName?: string
} & HTMLAttributes<HTMLElement>

//Magazine hides caption?
export const FullWidthImageHero = ({
  variant = 'default',
  figure,
  title,
  displayTextVariant = 'none',
  magazineTags,
  subTitle,
  nextSectionDesignOptions,
  breadcrumbsComponent,
  figCaptionClassName,
  className = '',
}: FullWidthImageHeroProps) => {
  const { bg: nextCompBg, dark: nextCompDark } = getBgAndDarkFromBackground(
    nextSectionDesignOptions,
  )

  const ratioToVariant: Record<FullWidthImageHeroVariant, ImageRatioKeys> = {
    narrow: '10:3',
    tall: '5:4',
    default: '2:1',
  }

  const variantClassName: Record<FullWidthImageHeroVariant, string> = {
    narrow: ``,
    tall: `4xl:h-[67vh] h-auto w-full h-[43vh] md:h-[53vh] lg:h-[65vh]`,
    default: ``,
  }

  const titleVariant =
    displayTextVariant !== 'none'
      ? getDisplayTextVariant(displayTextVariant)
      : `h1`

  return (
    <div className={`${nextCompBg} ${nextCompDark ? nextCompDark : ''}`}>
      <div className='mx-auto max-w-fullwidth'>
        {figure?.image && (
          <Picture
            image={figure.image}
            desktopAspectRatio={ratioToVariant[variant]}
            figCaptionClassName={twMerge(
              `${nextCompBg ? nextCompBg : ''} ${nextCompDark ? nextCompDark : ''}`,
              figCaptionClassName,
            )}
            caption={figure?.caption}
            attribution={figure?.attribution}
            className={`${variantClassName[variant]}`}
          />
        )}
      </div>
      <div className='mx-auto max-w-content'>
        {breadcrumbsComponent && breadcrumbsComponent}
        {magazineTags && magazineTags?.length > 0 && (
          <MagazineTagBar tags={magazineTags} className='mt-0' />
        )}
        <Blocks
          //@ts-ignore
          value={title}
          id='mainTitle'
          tabIndex={-1}
          as='h1'
          group={displayTextVariant !== 'none' ? 'display' : `heading`}
          variant={titleVariant}
          /*         blockClassName='pb-0' */
          className={twMerge(
            `w-full px-layout-sm lg:px-layout-lg`,
            !breadcrumbsComponent && 'mt-8 lg:mt-10',
            className,
          )}
        />
        {subTitle && subTitle}
      </div>
    </div>
  )
}
