import { ResourceLink } from '@core/Link'
import { Heading } from '@core/Typography'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers'
import Image, { getPxSmSizes } from '../../core/SanityImage/SanityImage'
import { getLocaleFromName } from '../../lib/localization'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import type { ImageWithAlt, LinkData } from '../../types'
import type { InfoPanelImageVariant, InfoPanelKeyInfo } from './TabsBlock.types'

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
        `relative grid grid-cols-1 grid-rows-[auto_auto] gap-12 px-layout-sm pt-12 pb-page-content lg:px-16 ${
          imageVariant === 'sideImage' ? `items-start gap-12` : 'lg:grid-cols-auto-2'
        }`,
        className,
      )}
    >
      {image?.asset && imageVariant === 'backgroundImage' && (
        <Image
          sizes={getPxSmSizes()}
          aria-hidden
          image={image}
          fill
          className="z-[0] col-span-2 row-span-2 object-center"
        />
      )}
      <div
        className={`relative flex flex-col lg:row-start-1 lg:row-end-1 ${
          imageVariant === 'sideImage' ? 'grid grid-cols-1 gap-y-6 lg:grid-cols-2' : 'z-10'
        }`}
      >
        <div className="order-2 flex flex-col lg:order-1">
          {title && <Heading value={title} variant="h2" className={`text-lg lg:text-lg`} />}
          {text && <Blocks value={text} className={`text-sm`} />}
          {action && url && (
            <ResourceLink
              href={url}
              {...(action.link?.lang && {
                locale: getLocaleFromName(action.link?.lang),
              })}
              type={action.type}
              file={{
                ...action?.file,
                label: action?.label,
              }}
              showExtensionIcon={true}
              variant="fit"
              className="mt-2"
            >
              {`${action?.label}`}
            </ResourceLink>
          )}
        </div>
        {image?.asset && imageVariant === 'sideImage' && (
          <div className="relative order-1 aspect-video w-full rounded-md lg:order-2 lg:aspect-5/4">
            <Image image={image} fill className="rounded-md" />
          </div>
        )}
      </div>
      {keyInfo && (
        <div
          className={`grid auto-rows-min grid-cols-2 gap-x-10 gap-y-6 lg:row-start-2 lg:row-end-2 lg:flex lg:flex-wrap ${
            imageVariant === 'sideImage' ? '' : 'z-10'
          }`}
        >
          {keyInfo?.map((item) => {
            return (
              <div key={item?.id} className="text-balance">
                <div className="font-semibold text-md">{item?.title}</div>
                <div className="font-semibold text-lg">{item?.keyFigure}</div>
                <div className="text-base">{item?.explanation}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})

export default TabsInfoPanelItem
