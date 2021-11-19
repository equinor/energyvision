import { CSSProperties } from 'react'
import { Card, Heading, Button } from '@components'
import styled from 'styled-components'
import type { PeopleCardData } from '../../types/types'
import Image from '../shared/Image'

const { Media, Text } = Card

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
  padding: var(--space-4) 0;
  color: var(--moss-green-100);
  font-size: var(--typeScale-0);
  font-weight: var(--fontWeight-medium);
  text-decoration: none;
  display: block;
  &:hover {
    text-decoration: underline;
  }
`

const RoundedImage = styled(Image)`
  border-radius: 50%;
`
const ImageContainer = styled.div`
  max-width: 200px;
  margin: var(--space-medium) auto 0 auto;
`

const StyledMedia = styled(Media)`
  flex-basis: var(--media-width, auto);
`

type PeopleCardProp = {
  data: PeopleCardData
  hasSectionTitle: boolean
  direction?: 'portrait' | 'landscape'
}

const PeopleCard = ({ data, hasSectionTitle, direction = 'portrait', ...rest }: PeopleCardProp) => {
  const { name, image, title, department, isLink, phone, email } = data

  return (
    <StyledCard
      orientation={direction}
      style={
        {
          '--height': 'auto',
          '--card-padding': '0 0 var(--space-medium) 0',
        } as CSSProperties
      }
      {...rest}
    >
      <StyledMedia style={{ '--media-width': '200px' } as CSSProperties}>
        <ImageContainer>
          {/*   @TODO Final size adjustments */}
          {image && <RoundedImage image={image} maxWidth={200} aspectRatio={1} layout="responsive" sizes="200px" />}
        </ImageContainer>
      </StyledMedia>
      <Text>
        <div>
          <Name size="sm" level={hasSectionTitle ? 'h3' : 'h2'}>
            {name}
          </Name>
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
