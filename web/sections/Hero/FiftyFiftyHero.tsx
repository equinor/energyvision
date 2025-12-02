import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import { ResourceLink } from '@/core/Link'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import { getLocaleFromName } from '@/sanity/localization'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions } from '@/types'
import type { HeroData } from './HeroBlock'

type FiftyFiftyHeroProps = {
  nextSectionDesignOptions?: DesignOptions
} & HeroData &
  HTMLAttributes<HTMLElement>

export const FiftyFiftyHero = ({
  title,
  heroTitle,
  ingress,
  link,
  heroLink,
  background,
  nextSectionDesignOptions,
  figure,
  isBigTitle,
  className = '',
}: FiftyFiftyHeroProps) => {
  const heroUrl = heroLink && getUrlFromAction(heroLink)
  const url = link && getUrlFromAction(link)
  const action = heroLink ?? link

  const { bg: nextCompBg, dark: nextCompDark } = getBgAndDarkFromBackground(
    nextSectionDesignOptions,
  )

  return (
    <section className={twMerge(`flex flex-col-reverse`, className)}>
      <Blocks
        //@ts-ignore
        value={title}
        id='mainTitle'
        variant='h1'
        blockClassName={`py-11 px-layout-sm lg:px-layout-lg ${nextCompBg} ${nextCompDark ? nextCompDark : ''}`}
      />
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
        <div className='flex max-w-full flex-col justify-center gap-8 px-layout-sm py-16 md:min-h-[450px] md:justify-self-end md:px-12 xl:pr-4xl xl:pl-layout-sm'>
          {heroTitle && (
            <Blocks
              value={heroTitle}
              as='h2'
              variant={isBigTitle ? '2xl' : 'xl'}
              blockClassName={`max-w-[1186px] ${isBigTitle ? 'font-normal' : 'font-medium'}`}
            />
          )}

          {ingress && !isBigTitle && (
            <Blocks value={ingress} blockClassName='hidden md:block' />
          )}

          {action && (heroUrl || url) && !isBigTitle && (
            <ResourceLink
              href={heroUrl ?? url}
              {...(action.link?.lang && {
                hrefLang: getLocaleFromName(action.link?.lang),
              })}
              type={action.type}
              extension={action.extension}
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
