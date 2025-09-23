import { BackgroundContainer } from '@/core/Backgrounds'
import { Typography } from '../../core/Typography'
import Image, { getSmallerThanPxLgSizes } from '../../core/SanityImage/SanityImage'
import type { TextBlockData } from '../../types/index'
import CallToActions from '../CallToActions'
import { twMerge } from 'tailwind-merge'
import Blocks from '@/portableText/Blocks'

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
    isBigText,
    useBrandTheme = false,
  } = data
  /* Don't render the component if it only has an eyebrow */
  if (!title && !ingress && !text && (!callToActions || callToActions.length === 0)) return null

  const contentAlignment = {
    center: 'items-start text-start px-layout-lg',
    right:
      'items-start text-start px-layout-lg xl:items-end xl:text-end xl:max-w-[45dvw] xl:ml-auto xl:pr-layout-sm xl:pl-0 ',
    left: 'items-start text-start px-layout-lg xl:items-start xl:max-w-[45dvw] xl:mr-auto xl:pl-layout-sm xl:pr-0',
    'bottom-left': 'items-start text-start px-layout-lg xl:mr-auto xl:pl-layout-sm xl:pr-0',
    'bottom-center': 'items-start text-start px-layout-lg xl:pl-layout-sm xl:pr-0',
  }
  let backgroundImageContentClassNames = `justify-center py-14`
  if (designOptions?.background?.backgroundImage?.contentAlignment) {
    backgroundImageContentClassNames = twMerge(
      backgroundImageContentClassNames,
      `${contentAlignment[designOptions?.background?.backgroundImage?.contentAlignment]}`,
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

  return (
    <BackgroundContainer
      {...bgContainerOptions}
      id={anchor}
      className={twMerge(
        designOptions?.background?.type === 'backgroundImage' && backgroundImageContentClassNames,
        designOptions?.background?.type !== 'backgroundImage' && `px-layout-sm lg:px-layout-lg`,
        className,
      )}
    >
      {isBigText && title && <Blocks value={title} as="h2" variant="2xl" blockClassName="mb-2 leading-cloudy" />}
      {!isBigText && (
        <>
          {image?.asset && (
            <div className="w-[300px]">
              <Image
                image={image}
                maxWidth={300}
                sizes={getSmallerThanPxLgSizes()}
                aspectRatio={'16:9'}
                className="object-cover"
              />
            </div>
          )}
          {overline ? (
            <hgroup className={`mb-1${useBrandTheme ? 'text-energy-red-100' : ''} text-balance`}>
              <Typography variant="overline">{overline}</Typography>
              {title && <Blocks variant="h2" value={title} />}
            </hgroup>
          ) : (
            title && <Blocks value={title} variant="h2" />
          )}
          {ingress && <Blocks variant="ingress" value={ingress} blockClassName="mb-6" />}
        </>
      )}
      <div className="flex flex-col gap-6">
        {text && <Blocks value={text} />}
        {callToActions && <CallToActions callToActions={callToActions} splitList={splitList} />}
      </div>
    </BackgroundContainer>
  )
}

export default TextBlock
