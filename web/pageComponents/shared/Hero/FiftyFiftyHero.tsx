import Image from '../SanityImage'
import { Heading } from '@core/Typography'
import type { HeroType } from '../../../types/index'
import { BackgroundContainer } from '@components'
import { ResourceLink } from '@core/Link'
import Blocks from '../portableText/Blocks'
import { getUrlFromAction } from '../../../common/helpers'
import { getLocaleFromName } from '../../../lib/localization'

export const FiftyFiftyHero = ({
  title,
  ingress,
  link: action,
  background,
  figure,
  isBigTitle,
}: HeroType) => {
  const url = action && getUrlFromAction(action)

  return (
    <BackgroundContainer background={{ backgroundColor: background }}>
      <div className="mx-auto grid max-w-[1440px] min-h-[350px] md:grid-cols-2">
        {/* Image Section */}
        {figure && (
          <div className="relative min-h-[350px] md:order-2">
            <Image maxWidth={4096} sizes="(max-width: 800px) 100vw, 800px" image={figure.image} fill priority />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col justify-center gap-8 px-4 py-24 max-w-full md:min-h-[450px] md:justify-self-end md:px-16 xl:px-4 xl:pr-32">
          {title && (
            <Heading
              value={title}
              variant={isBigTitle ? '2xl' : 'xl'}
              className={`max-w-[1186px] ${isBigTitle ? 'font-normal' : 'font-medium'}`}
            />
          )}

          {ingress && !isBigTitle && <Blocks value={ingress} className="hidden md:block" />}

          {action && !isBigTitle && (
            <ResourceLink
              href={url as string}
              {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
              type={action.type}
            >
              {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
            </ResourceLink>
          )}
        </div>
      </div>
    </BackgroundContainer>
  )
}
