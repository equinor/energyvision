import { toPlainText } from 'next-sanity'
import { twMerge } from 'tailwind-merge'
import { BackgroundContainer } from '@/core/Backgrounds'
import { Image } from '@/core/Image/Image'
import { Typography } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'
import type { TextBlockData } from '@/types/index'
import CallToActions from '../CallToActions'

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

  const isLongTitle = title && toPlainText(title).length > 30

  const contentAlignmentClassNames = {
    center: 'items-start text-start px-layout-lg',
    right: `items-start text-start px-layout-lg xl:items-end xl:text-end ${isLongTitle ? 'xl:max-w-[52dvw]' : 'xl:max-w-[45dvw]'} xl:ml-auto xl:pr-layout-sm xl:pl-0`,
    left: `items-start text-start px-layout-lg xl:items-start ${isLongTitle ? 'xl:max-w-[52dvw]' : 'xl:max-w-[45dvw]'}  xl:mr-auto xl:pl-layout-sm xl:pr-0`,
    'bottom-left':
      'items-start text-start px-layout-lg xl:mr-auto xl:pl-layout-sm xl:pr-0',
    'bottom-center':
      'items-start text-start px-layout-lg xl:pl-layout-sm xl:pr-0',
  }

  let backgroundImageContentClassNames = `justify-center py-14`

  const contentAlignment =
    designOptions?.background?.backgroundImage?.contentAlignment

  if (contentAlignment) {
    backgroundImageContentClassNames = twMerge(
      backgroundImageContentClassNames,
      `${contentAlignmentClassNames[contentAlignment]}`,
    )
  }

  let bgContainerOptions = designOptions

  if (useBrandTheme) {
    bgContainerOptions = {
      background: {
        type: 'backgroundColor',
        backgroundUtility: 'white-100',
        dark: false,
      },
    }
  }

  const contentElements = (
    <>
      {ingress && <Blocks variant='ingress' value={ingress} />}
      {text && <Blocks value={text} variant='body' />}
      {callToActions && (
        <CallToActions callToActions={callToActions} splitList={splitList} />
      )}
    </>
  )

  return (
    <BackgroundContainer
      {...bgContainerOptions}
      id={anchor}
      className={twMerge(
        designOptions?.background?.type === 'backgroundImage' &&
          backgroundImageContentClassNames,
        designOptions?.background?.type !== 'backgroundImage' &&
          `px-layout-sm lg:px-layout-lg`,
        className,
      )}
    >
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
      {(ingress || text || callToActions) &&
        (contentAlignment === 'right' ? (
          <div
            className={`flex flex-col ${
              contentAlignment === 'right' ? 'items-end' : ''
            }`}
          >
            {contentElements}
          </div>
        ) : (
          contentElements
        ))}
    </BackgroundContainer>
  )
}

export default TextBlock
