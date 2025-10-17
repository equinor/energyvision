import { getUrlFromAction } from '../../../common/helpers'
import Image, { getPxLgSizes, getPxSmSizes } from '../../../core/SanityImage/SanityImage'
import type { DesignOptions, ImageWithAlt, LinkData } from '../../../types/index'
import { ResourceLink } from '../../../core/Link'
import { getLocaleFromName } from '../../../lib/localization'
import { Typography } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { PortableTextBlock } from '@portabletext/types'

export type TeaserData = {
  type: string
  id: string
  title: PortableTextBlock[]
  text: PortableTextBlock[]
  overline?: string
  isBigText?: boolean
  image: ImageWithAlt
  actions?: LinkData[]
  designOptions: DesignOptions & {
    imagePosition?: 'left' | 'right'
    imageSize?: 'full' | 'small'
    containImage?: boolean
  }
}

type TeaserProps = {
  data: TeaserData
  anchor?: string
}

const Teaser = ({ data, anchor }: TeaserProps) => {
  const { title, overline, text, image, actions, designOptions, isBigText } = data
  const { imageSize = 'full', imagePosition, containImage = false } = designOptions
  const useFlexCol = useMediaQuery(`(max-width: 1023px)`)
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  if ([title, overline, text, image?.asset, actions].every((i) => !i)) {
    return null
  }

  // Svg can be "pictures"/illustrations and small svgs...
  const imageElement = (
    <div
      className={`relative ${imageSize === 'small' ? 'm-18 flex items-center justify-center' : 'h-auto min-h-[25rem] w-full'}`}
    >
      <Image
        image={image}
        fill
        sizes={getPxLgSizes()}
        maxWidth={1100}
        className={`${containImage ? 'object-contain' : ''}`}
      />
    </div>
  )

  return (
    <article id={anchor} className={`${bg} ${dark ? 'dark' : ''} flex flex-col lg:grid lg:grid-cols-2`}>
      {(imagePosition === 'left' || useFlexCol) && imageElement}
      <div
        className={`max-w-text pt-8 pb-10 lg:pt-18 lg:pb-22 ${imagePosition === 'left' ? 'pr-8 pl-8 lg:pr-44' : 'pr-8 pl-8 lg:pl-44'}`}
      >
        {isBigText ? (
          text && <Blocks value={text} variant="h2" />
        ) : (
          <>
            {overline ? (
              <hgroup className="mb-1">
                <Typography variant="overline">{overline}</Typography>
                {title && <Blocks value={title} as="h2" variant="xl" />}
              </hgroup>
            ) : (
              <>{title && <Blocks value={title} as="h2" variant="xl" />}</>
            )}
            {text && <Blocks variant="ingress" value={text} />}
          </>
        )}
        {actions && (
          <div className="flex flex-col gap-8">
            {actions?.map((action, idx) => {
              const url = action && getUrlFromAction(action)
              return (
                <ResourceLink
                  href={url as string}
                  {...(action.link?.lang && { hrefLang: getLocaleFromName(action.link?.lang) })}
                  type={action.type}
                  key={action.id || idx}
                  variant="fit"
                  extension={action.extension}
                  showExtensionIcon
                >
                  {`${action.label}`}
                </ResourceLink>
              )
            })}
          </div>
        )}
      </div>
      {imagePosition === 'right' && !useFlexCol && imageElement}
    </article>
  )
}

export default Teaser
