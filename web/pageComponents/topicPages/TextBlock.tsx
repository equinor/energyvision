import { Eyebrow, BackgroundContainer, Text, Heading, List } from '@components'
import IngressText from '../shared/portableText/IngressText'
import RichText from '../shared/portableText/RichText'
import TitleText from '../shared/portableText/TitleText'
import Image, { Ratios } from '../shared/SanityImage'
import styled from 'styled-components'
import type { TextBlockData } from '../../types/types'
import CallToActions from './CallToActions'
import { BlockType, ListType } from '../shared/portableText/helpers/defaultSerializers'
import type { PortableTextBlock } from '@portabletext/types'

export const StyledTextBlockWrapper = styled(BackgroundContainer)<{ id: string | undefined }>`
  ${({ id }) =>
    id && {
      scrollMarginTop: 'var(--topbar-height)',
    }}
`

const Spacer = styled.span`
  display: block;
  height: var(--space-medium);
`

const StyledTextBlock = styled.section`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;

  /* Where exactly should we put these styles */
  /* If the title has an eyebrow we need some tweaks */
  & h2 {
    padding: var(--space-large) 0;
  }
  & h2:first-child {
    padding-top: 0;
  }

  & p:last-child {
    margin-bottom: 0;
  }
`
const StyledList = styled(List)`
  margin-bottom: var(--space-medium);
`

const TextContainer = styled.div`
  margin-bottom: var(--space-medium);
`
const ImgContainer = styled.div`
  width: 300px;
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
  const { background } = designOptions

  return (
    <StyledTextBlockWrapper background={background} id={anchor || data.anchor}>
      <StyledTextBlock>
        {isBigText ? (
          title && (
            <TitleText
              level="h2"
              value={title}
              components={{
                block: {
                  normal: ({ children }: { children: React.ReactNode }) => <Heading size="2xl">{children}</Heading>,
                } as BlockType,
              }}
            />
          )
        ) : (
          <>
            {image?.asset && (
              <ImgContainer>
                <Image image={image} maxWidth={300} aspectRatio={Ratios.NINE_TO_SIXTEEN} />
              </ImgContainer>
            )}
            {overline && <Eyebrow>{overline}</Eyebrow>}
            {title && <TitleText value={title} />}
            {ingress && (
              <IngressText
                value={ingress}
                components={{
                  list: {
                    bullet: ({ children }) => {
                      return (
                        <StyledList>
                          <>{children}</>
                        </StyledList>
                      )
                    },
                    number: ({ children }) => {
                      return (
                        <StyledList>
                          <>{children}</>
                        </StyledList>
                      )
                    },
                  },
                }}
              />
            )}
          </>
        )}
        {text && (
          <TextContainer>
            <RichText
              value={text}
              components={{
                list: {
                  bullet: ({ children }) => {
                    return (
                      <StyledList>
                        <>{children}</>
                      </StyledList>
                    )
                  },
                  number: ({ children }) => {
                    return (
                      <StyledList>
                        <>{children}</>
                      </StyledList>
                    )
                  },
                },
              }}
            ></RichText>
          </TextContainer>
        )}
        {callToActions && callToActions.length === 1 && !overrideButtonStyle && <Spacer />}
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
