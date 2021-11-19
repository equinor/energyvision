import { CSSProperties } from 'react'
import { Card, Heading, Button } from '@components'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'
import type { PeopleCardData } from '../../types/types'
import Image from '../shared/Image'

const { Header, Media, Text } = Card

const StyledCard = styled(Card)`
  height: var(--height);
`

const Name = styled(Heading)`
  text-align: center;
  font-weight: var(--fontWeight-medium);
  margin-bottom: var(--space-small);
`

const Detail = styled.span`
  font-size: var(--typeScale-0);
  text-align: center;
  display: block;
`

const Contact = styled.div`
  margin-top: var(--space-medium);
  text-align: center;
`
const ContactLink = styled.a`
  color: var(--moss-green-100);
  font-size: var(--typeScale-0);
  font-weight: var(--fontWeight-medium);
  text-decoration: none;
  display: block;
`

const RoundedImage = styled(Image)`
  border-radius: 50%;
`
const Test = styled.div`
  max-width: 50%;
  margin: var(--space-medium) auto 0 auto;
`

type PeopleCardProp = {
  data: PeopleCardData
  fitToContent?: boolean
}

const PeopleCard = ({ data, ...rest }: PeopleCardProp) => {
  console.log(data)
  const { name, image, title, department, isLink, phone, email } = data

  return (
    <StyledCard
      style={
        {
          '--height': 'auto',
          '--card-padding': '0 0 var(--space-medium) 0',
        } as CSSProperties
      }
      {...rest}
    >
      <Media>
        <Test>
          {image && (
            <RoundedImage
              image={image}
              maxWidth={400}
              aspectRatio={1}
              layout="responsive"
              sizes="(max-width: 360px) 315px,(max-width: 600px) 550px,(max-width: 700px) 310px,450px"
            />
          )}
        </Test>
      </Media>
      <Text>
        <div>
          <Name size="sm">{name}</Name>
          {title && <Detail>{title}</Detail>}
          {department && <Detail>{department}</Detail>}
          {isLink ? (
            <Contact>
              <Button variant="outlined">A link wip</Button>
            </Contact>
          ) : (
            <Contact>
              {email && <ContactLink href={`mailto:${email}`}>{email}</ContactLink>}
              {phone && <ContactLink href={`tel:${phone}`}>{phone}</ContactLink>}
            </Contact>
          )}
        </div>
      </Text>
    </StyledCard>
  )
}

export default PeopleCard
