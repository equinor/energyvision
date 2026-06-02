import type { PortableTextBlock } from 'next-sanity'
import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import type { Figure } from '@/core/Image/imageUtilities'
import ResourceLink from '@/core/Link/ResourceLink'
import type { TypographyVariants } from '@/core/Typography'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import { getLocaleFromName } from '@/sanity/helpers/localization'
import type { ColorKeys } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions, LinkData } from '@/types'

export type FiftyFiftyHeroProps = {
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  displayTextVariant?: 'none' | 'base' | 'lg' | 'xl'
  link?: LinkData
  heroLink?: LinkData
  background?: ColorKeys
  figure?: Figure
  nextSectionDesignOptions?: DesignOptions
} & HTMLAttributes<HTMLElement>

export const FiftyFiftyHero = ({
  title,
  displayTextVariant = 'none',
  ingress,
  link,
  heroLink,
  background,
  figure,
  className = '',
}: FiftyFiftyHeroProps) => {
  const heroUrl = heroLink && getUrlFromAction(heroLink)
  const url = link && getUrlFromAction(link)
  const action = heroLink ?? link

  const typographyVariant = {
    base: 'h2_base',
    lg: 'h2_lg',
    xl: 'h2_xl',
  }

  return (
    <section className={twMerge(`flex flex-col-reverse`, className)}>
      <div className={`${background} grid min-h-[350px] md:grid-cols-2`}>
        {/* Image Section */}
        {figure && (
          <Image
            grid='sm'
            image={figure.image}
            fill
            className='min-h-[350px] md:order-2'
          />
        )}

        {/* Content Section */}
        <div className='flex flex-col justify-center px-layout-sm py-8 md:min-h-[400px] md:justify-self-end lg:py-16 lg:pr-32'>
          {title && (
            <Blocks
              id='mainTitle'
              tabIndex={-1}
              //@ts-ignore
              value={title}
              group={displayTextVariant !== 'none' ? 'display' : `heading`}
              variant={
                displayTextVariant !== 'none'
                  ? (typographyVariant[
                      displayTextVariant
                    ] as TypographyVariants)
                  : `h2`
              }
              as='h1'
              //same as variants h1
              //className={`pb-6 lg:pb-12`}
            />
          )}
          {ingress && (
            <Blocks
              value={ingress}
              variant='ingress'
              className='**:text-base'
            />
          )}

          {action && (heroUrl || url) && (
            <ResourceLink
              file={{
                ...action?.file,
                label: action?.label,
              }}
              href={heroUrl ?? url}
              {...(action.link?.lang && {
                hrefLang: getLocaleFromName(action.link?.lang),
              })}
              type={action.type}
              variant='fit'
              showExtensionIcon
            >
              {action.label}
            </ResourceLink>
          )}
        </div>
      </div>
    </section>
  )
}
