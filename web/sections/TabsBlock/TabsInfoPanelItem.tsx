import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { ResourceLink } from '@/core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../sanity/localization'
import Blocks from '../../portableText/Blocks'
import Image, { getPxSmSizes } from '../../core/SanityImage/SanityImage'
import { ImageWithAlt, LinkData } from '../../types'
import { InfoPanelImageVariant, InfoPanelKeyInfo } from './TabsBlock.types'

type TabsInfoPanelItemProps = {
  theme?: number
  image?: ImageWithAlt
  imageVariant?: InfoPanelImageVariant
  title?: PortableTextBlock[]
  text?: PortableTextBlock[]
  keyInfo?: InfoPanelKeyInfo[]
  action?: LinkData
  className?: string
}

const TabsInfoPanelItem = forwardRef<HTMLDivElement, TabsInfoPanelItemProps>(function TabsInfoPanelItem(
  { image, imageVariant, title, text, keyInfo, action, className = '' },
  ref,
) {
  const url = action ? getUrlFromAction(action) : undefined
  return (
    <div
      ref={ref}
      className={twMerge(
        `relative ${
          imageVariant === 'sideImage'
            ? `flex flex-col-reverse items-start gap-12 px-8 py-12 lg:grid lg:grid-cols-2 lg:px-16`
            : ''
        }`,
        className,
      )}
    >
      {image?.asset && imageVariant === 'backgroundImage' && (
        <Image sizes={getPxSmSizes()} aria-hidden image={image} fill className="z-[1] object-center" />
      )}
      <div
        className={`relative flex flex-col ${
          imageVariant === 'sideImage' ? '' : 'z-10 px-8 pt-12 pb-16 lg:grid lg:grid-cols-2 lg:px-12 lg:pt-16 lg:pb-40'
        } gap-x-12 gap-y-12 lg:gap-x-20`}
      >
        <div>
          <div className="flex flex-col gap-4">
            {title && <Blocks value={title} as="h3" variant="h5" />}
            {text && <Blocks group="paragraph" variant="small" value={text} />}
          </div>
          {action && url && (
            <ResourceLink
              href={url}
              {...(action.link?.lang && { hrefLang: getLocaleFromName(action.link?.lang) })}
              type={action.type}
              extension={action.extension}
              showExtensionIcon={true}
              variant="fit"
              className="mt-12"
            >
              {`${action?.label}`}
            </ResourceLink>
          )}
        </div>
        {keyInfo && (
          <div className={`grid grid-cols-1 ${keyInfo?.length % 2 ? 'xl:grid-cols-1' : 'xl:grid-cols-2'} gap-6`}>
            {keyInfo?.map((item) => {
              return (
                <div key={item?.id}>
                  <div className="text-sm font-semibold">{item?.title}</div>
                  <div className="text-md font-semibold">{item?.keyFigure}</div>
                  <div className="text-xs">{item?.explanation}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {image?.asset && imageVariant === 'sideImage' && (
        <div className="relative aspect-video w-full rounded-md lg:aspect-5/4">
          <Image image={image} fill className="rounded-md" />
        </div>
      )}
    </div>
  )
})

export default TabsInfoPanelItem
