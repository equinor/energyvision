import { TextWithIcon, BackgroundContainer } from '@components'
import { imageProps } from '../../common/helpers'
import Img from 'next/image'
import styled from 'styled-components'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { IngressBlockRenderer } from '../../common/serializers'
import type { TextWithIconArrayData, TextWithIconItem } from '../../types/types'

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 18rem));
  grid-gap: var(--space-xxLarge);
  padding: var(--space-xxLarge);
`

const { Title, Media, Text } = TextWithIcon

type TextWithIconArrayProps = {
  data: TextWithIconArrayData
}

const TextWithIconArray = ({ data }: TextWithIconArrayProps) => {
  const { designOptions, group } = data

  return (
    <BackgroundContainer background={designOptions.background}>
      <Container>
        {group.map((item: TextWithIconItem) => (
          <TextWithIcon key={item.id}>
            {item.icon && item.icon.asset && (
              <Media>
                <Img {...imageProps(item.icon.asset, 400, 1)} alt={item.icon.alt} layout="intrinsic" />
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
