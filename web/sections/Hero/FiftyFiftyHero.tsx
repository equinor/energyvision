import { Image } from '@/core/Image/Image'
import { ResourceLink } from '@/core/Link'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import { getLocaleFromName } from '@/sanity/localization'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { HeroType } from '@/types'

export const FiftyFiftyHero = ({
  title,
  ingress,
  link: action,
  background,
  figure,
  isBigTitle,
}: HeroType) => {
  const url = action && getUrlFromAction(action)
  //@ts-ignore: Todo
  const { bg, dark } = getBgAndDarkFromBackground({ background })

  return (
    <section className={`${bg} ${dark ? 'dark' : ''}`}>
      <div className='mx-auto grid min-h-[350px] md:grid-cols-2'>
        {/* Image Section */}
        {figure && (
          <div className='relative min-h-[350px] md:order-2'>
            <Image grid='sm' image={figure.image} fill />
          </div>
        )}

        {/* Content Section */}
        <div className='flex max-w-full flex-col justify-center gap-8 px-layout-sm py-16 md:min-h-[450px] md:justify-self-end md:px-12 xl:pr-4xl xl:pl-layout-sm'>
          {title && (
            <Blocks
              value={title}
              as='h2'
              variant={isBigTitle ? '2xl' : 'xl'}
              blockClassName={`max-w-[1186px] ${isBigTitle ? 'font-normal' : 'font-medium'}`}
            />
          )}

          {ingress && !isBigTitle && (
            <Blocks value={ingress} blockClassName='hidden md:block' />
          )}

          {action && !isBigTitle && (
            <ResourceLink
              href={url as string}
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
