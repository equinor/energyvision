import { ResourceLink } from '@core/Link'
import { Heading } from '@core/Typography'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import { useIntl } from 'react-intl'
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers'
import Image, {
  getObjectPositionForImage,
  getPxSmSizes,
  type ObjectPositions,
} from '../../core/SanityImage/SanityImage'
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
  backgroundPosition?: ObjectPositions
  action?: LinkData
  className?: string
  keyInfoTitle?: string
}

const TabsInfoPanelItem = forwardRef<HTMLDivElement, TabsInfoPanelItemProps>(function TabsInfoPanelItem(
  { image, imageVariant, backgroundPosition, title, text, keyInfo, action, keyInfoTitle, className = '' },
  ref,
) {
  const url = action ? getUrlFromAction(action) : undefined
  const intl = useIntl()

  const keyFiguresElement = (
    <div
      className={`${imageVariant === 'backgroundImage' ? 'z-[11] row-start-2 row-end-2' : ''} ${
        imageVariant === 'bannerImage' ? 'col-span-1 row-start-2 row-end-2' : ''
      } ${imageVariant === 'sideImage' ? 'lg:pt-14 order-2 lg:order-1' : ''}`}
    >
      <div className="sr-only">
        {keyInfoTitle
          ? keyInfoTitle
          : intl.formatMessage({
              id: 'keyFigures',
              defaultMessage: 'Key figures',
            })}
      </div>
      <div
        className={`gap-x-10 gap-y-6 ${
          imageVariant !== 'backgroundImage'
            ? `grid auto-rows-min ${keyInfo && keyInfo?.length % 2 ? 'grid-cols-1' : 'grid-cols-2'}`
            : 'flex flex-wrap'
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
    </div>
  )

  return (
    <div
      ref={ref}
      className={twMerge(
        `relative flex flex-col gap-12 lg:grid lg:grid-cols-[60%_40%] lg:grid-rows-[auto_auto] ${
          imageVariant === 'sideImage' ? `items-start gap-12` : ''
        }`,
        className,
      )}
    >
      {image?.asset && (
        <div
          className={`w-full h-auto ${
            imageVariant === 'bannerImage' ? 'relative col-span-full row-span-1 aspect-4/3 lg:aspect-[21/9]' : ''
          } ${imageVariant === 'backgroundImage' ? 'absolute inset-0 z-[0] col-span-full row-span-full' : ''} ${
            imageVariant === 'sideImage' ? 'relative aspect-4/3 lg:aspect-[2/1]' : ''
          }`}
        >
          <Image
            sizes={getPxSmSizes()}
            aria-hidden
            image={image}
            fill
            className={`${imageVariant === 'sideImage' ? 'rounded-md' : ''} ${
              backgroundPosition ? getObjectPositionForImage(backgroundPosition) : ''
            }`}
          />
        </div>
      )}
      {imageVariant === 'sideImage' && keyInfo && keyInfo?.length > 0 && keyFiguresElement}
      <div
        className={`flex flex-col ${
          imageVariant === 'backgroundImage' ? 'z-[10] pt-14 row-start-1 row-end-1' : `row-start-2 row-end-2`
        } ${
          imageVariant === 'sideImage'
            ? 'order-1 lg:order-2 col-span-full'
            : `${keyInfo && keyInfo?.length > 0 ? 'col-span-1' : ''}`
        }`}
      >
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
      {imageVariant !== 'sideImage' && keyInfo && keyInfo?.length > 0 && keyFiguresElement}
    </div>
  )
})

export default TabsInfoPanelItem
