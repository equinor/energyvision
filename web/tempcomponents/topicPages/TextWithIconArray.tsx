import { TextWithIcon, BackgroundContainer } from '@components'
import { urlFor } from '../../common/helpers'
import Img from 'next/image'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { IngressBlockRenderer } from '../../common/serializers'
import type { TextWithIconArrayData, TextWithIconItem, ImageWithAlt } from '../../types/types'

const Container = styled.div`
  --max-content-width: 1440px;

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 18rem));
  grid-gap: var(--space-xxLarge);
  padding: var(--space-xxLarge) 0;
  margin: auto;
  max-width: var(--max-content-width);
`

const { Title, Media, Text } = TextWithIcon

type TextWithIconArrayProps = {
  data: TextWithIconArrayData
}

const getImgSrc = (img: ImageWithAlt): string => urlFor(img).size(150, 150).auto('format').toString() || ''

const TextWithIconArray = ({ data }: TextWithIconArrayProps) => {
  const { designOptions, group } = data

  return (
    <BackgroundContainer background={designOptions.background}>
      <Container>
        {group.map((item: TextWithIconItem) => (
          <TextWithIcon key={item.id}>
            {item.icon && item.icon.asset && (
              <Media>
                <Img src={getImgSrc(item.icon)} width="150" height="150" alt={item.icon.alt} />
              </Media>
            )}
            {item.title && <Title>{item.title}</Title>}
            {item.text && (
              <Text>
                <SimpleBlockContent
                  blocks={item.text}
                  serializers={{
                    types: {
                      block: ({ children, node }) => IngressBlockRenderer({ children, node, centered: true }),
                    },
                  }}
                ></SimpleBlockContent>
              </Text>
            )}
          </TextWithIcon>
        ))}
      </Container>
    </BackgroundContainer>
  )
}

export default TextWithIconArray
