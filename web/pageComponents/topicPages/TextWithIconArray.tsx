import { TextWithIcon, BackgroundContainer } from '@components'
import { urlFor } from '../../common/helpers'
import styled from 'styled-components'
import Img from 'next/image'

import IngressText from '../shared/portableText/IngressText'
import type { TextWithIconArrayData, TextWithIconItem, ImageWithAlt } from '../../types/index'
import { twMerge } from 'tailwind-merge'

const Container = styled.div<{ items: number }>`
  --max-content-width: 1440px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(calc(13 * var(--space-medium)), calc(18 * var(--space-medium))));
  grid-gap: var(--space-xxLarge);
  max-width: var(--max-content-width);

  @media (min-width: 750px) {
    grid-template-columns: ${({ items }) => (items === 2 || items === 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)')};
  }

  @media (min-width: 1300px) {
    ${({ items }) =>
      items === 4 && {
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}
  }
`

const { Title, Media, Text } = TextWithIcon

type TextWithIconArrayProps = {
  data: TextWithIconArrayData
  anchor?: string
  className?: string
}

const getImgSrc = (img: ImageWithAlt): string => urlFor(img).size(150, 150).auto('format').toString() || ''

const TextWithIconArray = ({ data, anchor, className }: TextWithIconArrayProps) => {
  const { designOptions, group } = data

  if (!group) return null

  return (
    <BackgroundContainer {...designOptions} id={anchor} renderFragmentWhenPossible>
      <Container items={group.length} className={twMerge(`pb-page-content px-6 mx-auto`, className)}>
        {group.map((item: TextWithIconItem) => {
          const { icon, title, text, id } = item
          const altTag = icon?.isDecorative ? '' : icon?.alt || ''
          return (
            <TextWithIcon key={id}>
              {icon && icon.asset && (
                <Media>
                  <Img
                    src={getImgSrc(icon)}
                    width="150"
                    height="150"
                    alt={altTag}
                    role={icon?.isDecorative ? 'presentation' : undefined}
                    style={{ width: '150px', height: '150px', margin: 'auto' }}
                  />
                </Media>
              )}
              {title && <Title>{title}</Title>}
              {text && (
                <Text>
                  <IngressText value={text} centered={true} />
                </Text>
              )}
            </TextWithIcon>
          )
        })}
      </Container>
    </BackgroundContainer>
  )
}

export default TextWithIconArray
