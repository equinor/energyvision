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
import { getColorForTabsTheme } from '../TabsBlock/tabThemes'

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
  let bg = nextCompBg ? nextCompBg : ''
  let dark = nextCompDark ? 'dark' : ''
  //@ts-ignore
  if (nextSectionDesignOptions?.theme >= 0) {
    //@ts-ignore
    bg = getColorForTabsTheme(nextSectionDesignOptions?.theme).backgroundUtility
    dark = ''
  }

  const ratioToVariant: Record<FullWidthImageHeroVariant, ImageRatioKeys> = {
    narrow: '10:3',
    tall: '16:9',
    default: '2:1',
  }

  const titleVariant =
    displayTextVariant !== 'none'
      ? getDisplayTextVariant(displayTextVariant)
      : `h1`

  return (
    <div className={twMerge(bg, dark, className)}>
      <div className='mx-auto max-w-fullwidth'>
        {figure?.image && (
          <Picture
            image={figure.image}
            desktopAspectRatio={ratioToVariant[variant]}
            figCaptionClassName={twMerge(bg, dark, figCaptionClassName)}
            caption={figure?.caption}
            attribution={figure?.attribution}
            className={twMerge(
              'flex',
              variant === 'tall' &&
                `4xl:h-[67vh] h-[43vh] w-full md:h-[53vh] lg:h-[65vh]`,
            )}
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
