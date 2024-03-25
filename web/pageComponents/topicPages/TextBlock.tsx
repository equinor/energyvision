import { Eyebrow, BackgroundContainer } from '@components'
import { Heading } from '../../core/Typography'
import IngressText from '../shared/portableText/IngressText'
import Image, { Ratios } from '../shared/SanityImage'
import styled from 'styled-components'
import type { TextBlockData } from '../../types/types'
import CallToActions from './CallToActions'
import Blocks from '../../pageComponents/shared/portableText/Blocks'

export const StyledTextBlockWrapper = styled(BackgroundContainer)<{ id: string | undefined }>`
  ${({ id }) =>
    id && {
      scrollMarginTop: 'var(--topbar-height)',
    }}
`

const StyledTextBlock = styled.section`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

type TextBlockProps = {
  data: TextBlockData
  anchor?: string
}

const TextBlock = ({ data, anchor }: TextBlockProps) => {
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
  } = data
  /* Don't render the component if it only has an eyebrow */
  if (!title && !ingress && !text && (!callToActions || callToActions.length === 0)) return null

  return (
    <StyledTextBlockWrapper {...designOptions} id={anchor || data.anchor}>
      <StyledTextBlock className={`flex flex-col gap-6`}>
        {isBigText ? (
          title && <Heading value={title} as="h2" variant="2xl" />
        ) : (
          <>
            {image?.asset && (
              <div className="w-[300px]">
                <Image image={image} maxWidth={300} aspectRatio={Ratios.NINE_TO_SIXTEEN} className="object-cover" />
              </div>
            )}
            {overline ? (
              <hgroup className="flex flex-col gap-2 mb-1">
                <Eyebrow>{overline}</Eyebrow>
                {title && <Heading value={title} as="h2" variant="xl" />}
              </hgroup>
            ) : (
              <>{title && <Heading value={title} as="h2" variant="xl" className="mb-2" />}</>
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
      </StyledTextBlock>
    </StyledTextBlockWrapper>
  )
}

export default TextBlock
