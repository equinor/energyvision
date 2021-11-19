import { CSSProperties } from 'react'
import { Card } from '@components'
import styled from 'styled-components'
import type { PeopleCardData } from '../../types/types'
import Image from '../shared/Image'

const { Title, Header, Media } = Card

const StyledCard = styled(Card)`
  height: var(--height);
`

type PeopleCardProp = {
  data: PeopleCardData
  fitToContent?: boolean
}

const PeopleCard = ({ data, fitToContent = false }: PeopleCardProp) => {
  console.log(data)
  const { name, image } = data

  return (
    <StyledCard
      style={
        {
          '--height': fitToContent ? 'auto' : '100%',
        } as CSSProperties
      }
    >
      <Media>
        {image && (
          <Image
            image={image}
            maxWidth={400}
            aspectRatio={0.56}
            layout="responsive"
            sizes="(max-width: 360px) 315px,(max-width: 600px) 550px,(max-width: 700px) 310px,450px"
          />
        )}
      </Media>
      <Header>
        <Title>{name}</Title>
      </Header>
    </StyledCard>
  )
}

export default PeopleCard
