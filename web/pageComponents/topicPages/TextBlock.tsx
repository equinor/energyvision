import { Eyebrow, BackgroundContainer } from '@components'
import { Heading } from '../../core/Typography'
import IngressText from '../shared/portableText/IngressText'
import Image, { Ratios } from '../shared/SanityImage'
import styled from 'styled-components'
import type { TextBlockData } from '../../types/index'
//import CallToActions from './CallToActions'
import CallToActions from '../../sections/CallToActions'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { twMerge } from 'tailwind-merge'

export const StyledTextBlockWrapper = styled(BackgroundContainer)<{ id: string | undefined }>`
  ${({ id }) =>
    id && {
      scrollMarginTop: 'var(--topbar-height)',
    }}
`

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
    overrideButtonStyle = false,
    isBigText,
    useBrandTheme = false,
  } = data
  /* Don't render the component if it only has an eyebrow */
  if (!title && !ingress && !text && (!callToActions || callToActions.length === 0)) return null

  const contentClassNames = twMerge(`max-w-viewport pb-page-content px-layout-lg mx-auto`, className)

  const contentAlignment = {
    center: 'items-start text-start px-layout-lg',
    right:
      'items-start text-start px-layout-lg xl:items-end xl:text-end xl:max-w-[45dvw] xl:ml-auto xl:pr-layout-sm xl:pl-0 ',
    left: 'items-start text-start px-layout-lg xl:items-start xl:max-w-[45dvw] xl:mr-auto xl:pl-layout-sm xl:pr-0',
    'bottom-left': 'items-start text-start px-layout-lg xl:mr-auto xl:pl-layout-sm xl:pr-0',
    'bottom-center': 'items-start text-start px-layout-lg xl:pl-layout-sm xl:pr-0',
  }
  let backgroundImageContentClassNames = `
  justify-center
  py-14
  `
  if (designOptions?.background?.backgroundImage?.contentAlignment) {
    backgroundImageContentClassNames = twMerge(
      backgroundImageContentClassNames,
      `
    ${contentAlignment[designOptions?.background?.backgroundImage?.contentAlignment]}`,
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

  const common = `${useBrandTheme ? 'text-energy-red-100' : ''} text-balance`
  const serializerClassnames = {
    largeText: common,
    normal: common,
    twoXLText: common,
    extraLargeText: common,
  }

  return (
    <StyledTextBlockWrapper {...bgContainerOptions} id={anchor} renderFragmentWhenPossible>
      <div
        className={`flex flex-col gap-6 ${
          designOptions?.background?.type === 'backgroundImage' ? backgroundImageContentClassNames : contentClassNames
        }`}
      >
        {isBigText && title && <Heading value={title} as="h2" variant="3xl" />}
        {!isBigText && (
          <>
            {image?.asset && (
              <div className="w-[300px]">
                <Image image={image} maxWidth={300} aspectRatio={Ratios.NINE_TO_SIXTEEN} className="object-cover" />
              </div>
            )}
            {overline ? (
              <hgroup className={`flex flex-col gap-2 mb-1 ${useBrandTheme ? 'text-energy-red-100' : ''}`}>
                <Eyebrow>{overline}</Eyebrow>
                {title && <Heading value={title} as="h2" variant="xl" serializerClassnames={serializerClassnames} />}
              </hgroup>
            ) : (
              <>
                {title && (
                  <Heading
                    value={title}
                    as="h2"
                    variant="xl"
                    serializerClassnames={serializerClassnames}
                    className={`mb-2`}
                  />
                )}
              </>
            )}
            {ingress && <IngressText value={ingress} />}
          </>
        )}
        {text && <Blocks value={text} className={`${callToActions ? 'mb-4' : ''}`} />}

        {callToActions && (
          <CallToActions
            callToActions={callToActions}
            overrideButtonStyle={overrideButtonStyle}
            splitList={splitList}
          />
        )}
      </div>
    </StyledTextBlockWrapper>
  )
}

export default TextBlock
