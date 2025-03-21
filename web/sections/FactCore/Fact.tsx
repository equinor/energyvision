import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import type { BackgroundColours, ImageWithAlt } from '../../types/index'
import { urlFor } from '../../common/helpers'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { Typography } from '@core/Typography'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { BackgroundContainer, BackgroundContainerProps } from '@components/Backgrounds'
import { ColorKeyTokens } from '../../styles/colorKeyToUtilityMap'
import Image from '../../pageComponents/shared/SanityImage'

type FactImagePosition = 'left' | 'right';

type FactboxProps = {
  title: string
  content: []
  background: { title: string; value: string; key?: string; dark?: boolean }
  image: ImageWithAlt
  imagePosition: FactImagePosition
  dynamicHeight: boolean
  isSingleColumn?: boolean
}

type BlockProps = {
  isInline: boolean
  value: FactboxProps
  className?: string
} & PortableTextBlock

export type FactProps = {
  background?: string
  backgroundUtility?: string
  dark?: boolean
  imagePosition?: FactImagePosition
  useTwoColumns?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Fact = (block: BlockProps) => {
  const { value, className } = block
  const { title, content, background, image, imagePosition, isSingleColumn } = value

  const bgTitle = (background ? background?.title : 'White') as BackgroundColours
  if (!content || content.length === 0) {
    return null
  }

  const imageSrc = image && image.asset ? urlFor(image).size(1200, 800).auto('format').toString() : false

  const plainText = content ? toPlainText(content as PortableTextBlock[]) : ''

  const hasColumns = !imageSrc && !isSingleColumn && plainText.length > 800
  const hasImage = imageSrc ? true : false
  const hasBgColor = bgTitle !== 'White'

  const ImageComponent = ({ imagePosition = 'left' }: { imagePosition?: FactImagePosition }) => (
    <div
      className={`${
        imagePosition === 'right' ? 'lg:col-start-2 lg:row-start-1' : ''
      } relative w-full h-[400px] lg:h-auto`}
    >
      {imageSrc && <Image image={image} fill />}
    </div>
  )
  const TextComponent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardMedia(
    { children, ...rest },
    ref,
  ) {
    return (
      <div ref={ref} className="text-pretty" {...rest}>
        {children}
      </div>
    )
  })

  const ContentComponent = () => {
    const contentClassNames = `
    ${!hasColumns && !hasImage ? 'px-layout-lg max-w-viewport mx-auto' : ''}
    ${hasColumns && !hasImage ? 'px-layout-sm' : ''}
    ${
      hasImage
        ? `${imagePosition === 'right' ? `lg:col-start-1 lg:row-start-1 pl-layout-sm pr-24` : 'pr-layout-sm pl-24'}`
        : ''
    }
    ${hasBgColor ? `${hasImage ? 'pt-12 pb-24 lg:py-24' : 'py-24'}` : 'pt-0 pb-24'}
    `

    return (
      <div className={twMerge(contentClassNames, className)}>
        {title && (
          <Typography as="h2" variant="h3">
            {title}
          </Typography>
        )}
        <TextComponent>
          <Blocks
            value={content}
            className={`prose ${hasColumns ? 'max-w-none lg:columns-2 lg:[column-gap:theme(spacing.24)]' : ''}`}
          />
        </TextComponent>
      </div>
    )
  }

  const FactBoxComponent = forwardRef<HTMLDivElement, FactProps>(function FactBox(
    { background = 'White', backgroundUtility = 'white-100', dark, children, ...rest },
    ref,
  ) {
    const bgProps: BackgroundContainerProps = {
      background: {
        dark: dark,
        backgroundUtility: backgroundUtility as keyof ColorKeyTokens,
        backgroundColor: background as BackgroundColours,
        type: 'backgroundColor',
      },
    }

    return (
      <BackgroundContainer {...rest} className={twMerge(`w-full flex mt-24 mb-24`, className)} {...bgProps} ref={ref}>
        <div
          className={twMerge(
            `w-full flex flex-col justify-center ${
              hasImage ?? hasColumns
                ? `lg:grid grid-rows-1 ${
                    imagePosition === 'right' ? 'lg:grid-cols-[60%_40%]' : 'lg:grid-cols-[40%_60%]'
                  }`
                : ''
            }`,
            className,
          )}
        >
          {children}
        </div>
      </BackgroundContainer>
    )
  })

  return (
    // <FactBox
    <FactBoxComponent
      background={background?.title}
      backgroundUtility={background?.key}
      dark={background?.dark}
    >
      <ImageComponent />
      <ContentComponent />
    </FactBoxComponent>
  )
}
