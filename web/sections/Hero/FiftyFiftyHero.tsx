import type { PortableTextBlock } from 'next-sanity'
import type { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import type { Figure } from '@/core/Image/imageUtilities'
import ResourceLink from '@/core/Link/ResourceLink'
import type { TypographyVariants } from '@/core/Typography'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions, LinkData } from '@/types'

export type FiftyFiftyHeroProps = {
  title?: PortableTextBlock[]
  heroTitle?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  displayTextVariant?: 'none' | 'base' | 'lg' | 'xl'
  link?: LinkData
  heroLink?: LinkData
  figure?: Figure
  nextSectionDesignOptions?: DesignOptions
  breadcrumbsComponent?: ReactNode
  designOptions?: DesignOptions
} & HTMLAttributes<HTMLElement>

export const FiftyFiftyHero = ({
  title,
  heroTitle,
  displayTextVariant = 'none',
  ingress,
  link,
  heroLink,
  figure,
  className = '',
  breadcrumbsComponent,
  designOptions,
}: FiftyFiftyHeroProps) => {
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  const heroUrl = heroLink && getUrlFromAction(heroLink)
  const url = link && getUrlFromAction(link)
  const action = heroLink ?? link

  const typographyVariant = {
    base: 'h2_base',
    lg: 'h2_lg',
    xl: 'h2_xl',
  }

  return (
    <>
      <div
        className={twMerge(
          `flex flex-col-reverse ${bg}`,
          dark && `dark`,
          className,
        )}
      >
        <div className={`grid min-h-[350px] md:grid-cols-2 2xl:min-h-[500px]`}>
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
            {heroTitle && (
              <Blocks
                id='mainTitle'
                tabIndex={-1}
                //@ts-ignore
                value={heroTitle}
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
                  hrefLang: action.link?.lang,
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
      </div>
      <div className='mx-auto max-w-content'>
        {breadcrumbsComponent && breadcrumbsComponent}
        <Blocks
          //@ts-ignore
          value={title}
          id='mainTitle'
          tabIndex={-1}
          variant='h1'
          className={twMerge(
            `w-full px-layout-sm lg:px-layout-lg`,
            !breadcrumbsComponent && 'mt-8 lg:mt-10',
            className,
          )}
        />
      </div>
    </>
  )
}
