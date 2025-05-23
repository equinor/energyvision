import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { ResourceLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { Heading } from '@core/Typography'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import Image from '../../pageComponents/shared/SanityImage'
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
        `relative 
        ${
          imageVariant === 'sideImage'
            ? `flex 
            flex-col-reverse 
            lg:grid 
            lg:grid-cols-2 
            gap-12 
            items-start 
            px-8
            lg:px-16
            py-12`
            : ''
        }`,
        className,
      )}
    >
      {image?.asset && imageVariant === 'backgroundImage' && (
        <Image aria-hidden image={image} fill className="z-[1] object-center" />
      )}
      <div
        className={`relative 
          flex 
          flex-col 
          ${
            imageVariant === 'sideImage'
              ? ''
              : 'lg:grid lg:grid-cols-2 px-8 lg:px-12 pt-12 pb-16 lg:pt-16 lg:pb-40 z-10'
          }
           gap-x-12 lg:gap-x-20 gap-y-12 `}
      >
        <div>
          <div className="flex flex-col gap-4">
            {title && <Heading value={title} as="h3" variant="h5" className={``} />}
            {text && <Blocks value={text} className={`text-sm`} />}
          </div>
          {action && url && (
            <ResourceLink
              href={url}
              {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
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
        <div className="w-full relative rounded-md aspect-video lg:aspect-5/4">
          <Image image={image} fill className="rounded-md" />
        </div>
      )}
    </div>
  )
})

export default TabsInfoPanelItem
