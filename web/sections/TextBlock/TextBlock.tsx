import { twMerge } from 'tailwind-merge'
import { ImageBackground } from '@/core/Backgrounds/ImageBackground'
import { Image } from '@/core/Image/Image'
import type { Image as ImageType } from '@/core/Image/imageUtilities'
import { Typography } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions, LinkData, PortableTextBlock } from '@/types/index'
import CallToActions from '../CallToActions'

type TextBlockBackgroundType = 'backgroundColor' | 'backgroundImage'

export type TextBlockData = {
  type: string
  id: string
  title: PortableTextBlock[]
  image?: ImageType
  overline?: string
  text: PortableTextBlock[]
  useBrandTheme?: boolean
  ingress: PortableTextBlock[]
  callToActions?: LinkData[]
  splitList?: boolean
  backgroundType?: TextBlockBackgroundType
  designOptions: DesignOptions
}

type TextBlockProps = {
  data: TextBlockData
  anchor?: string
  className?: string
}

const TextBlock = ({ data, anchor, className = '' }: TextBlockProps) => {
  const {
    image,
    overline,
    title,
    ingress,
    text,
    designOptions,
    callToActions,
    splitList,
    useBrandTheme = false,
  } = data

  /* Don't render the component if it only has an eyebrow */
  if (
    !title &&
    !ingress &&
    !text &&
    (!callToActions || callToActions.length === 0)
  )
    return null

  let bgContainerOptions = designOptions

  const textColor = `${useBrandTheme ? 'text-energy-red-100' : ''} text-balance`

  if (useBrandTheme) {
    bgContainerOptions = {
      background: {
        type: 'backgroundColor',
        backgroundUtility: 'white-100',
        dark: false,
      },
    }
  }
  const backgroundType = bgContainerOptions?.background?.type
  const { bg, dark } = getBgAndDarkFromBackground(bgContainerOptions)

  const contentElements = (
    <>
      {ingress && <Blocks variant='ingress' value={ingress} />}
      {text && <Blocks value={text} variant='body' />}
      {callToActions && (
        <CallToActions callToActions={callToActions} splitList={splitList} />
      )}
    </>
  )

  const titleElements = (
    <>
      {/** Thumbnail  */}
      {image?.asset && (
        <Image
          image={image}
          grid='xs'
          aspectRatio='4:3'
          imageClassName='object-contain object-left'
          className='mb-8 aspect-4/3 w-1/2 lg:mb-16 lg:w-1/3'
        />
      )}
      {overline ? (
        <hgroup
          className={`mb-1 ${useBrandTheme ? 'text-energy-red-100' : ''}`}
        >
          <Typography variant='overline'>{overline}</Typography>
          {title && (
            <Blocks
              value={title}
              as='h2'
              group='heading'
              variant='h2'
              useDisplay={true}
              blockClassName={textColor}
            />
          )}
        </hgroup>
      ) : (
        title && (
          <Blocks
            value={title}
            as='h2'
            group='heading'
            variant='h2'
            useDisplay={true}
          />
        )
      )}
    </>
  )

  return backgroundType === 'backgroundImage' &&
    bgContainerOptions?.background?.backgroundImage ? (
    <ImageBackground
      id={anchor}
      {...bgContainerOptions.background.backgroundImage}
    >
      {titleElements}
      {contentElements}
    </ImageBackground>
  ) : (
    <div
      id={anchor}
      className={twMerge(bg && bg, dark ? 'dark' : '', className)}
    >
      <div className='mx-auto max-w-content px-layout-sm lg:px-layout-lg'>
        {titleElements}
        {contentElements}
      </div>
    </div>
  )
}

export default TextBlock
