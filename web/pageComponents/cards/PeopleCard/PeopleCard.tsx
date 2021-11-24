import { CSSProperties } from 'react'
import { Card, Heading } from '@components'
import styled from 'styled-components'
import type { PeopleCardData } from '../../../types/types'
import Image from '../../shared/Image'
import CV from './CV'

const { Media, Text, StyledPortraitCard, StyledLandscapeCard } = Card

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
  max-height: 200px;
  max-width: 200px;
  /*  Somewhat complicated, but we need slightly different styles here,
  and the images don't calculate correct if we use grid or flex */
  ${StyledLandscapeCard} & {
    /*  Don't set padding on the landscape card because of the Event card */
    margin-top: var(--space-medium);
    @media (min-width: 450px) {
      margin: var(--space-medium);
      margin-right: 0;
    }
  }
  ${StyledPortraitCard} & {
    margin: var(--space-medium) auto 0 auto;
  }
`

const TextContent = styled(Text)`
  height: var(--text-height, auto);
  ${StyledLandscapeCard} & {
    margin-bottom: var(--space-medium);
    display: grid;
    place-content: center;
    @media (min-width: 450px) {
      margin: var(--space-medium) 0;
    }
  }
`
const StyledMedia = styled(Media)`
  ${StyledLandscapeCard} & {
    display: grid;
    place-content: center;
  }
`

const CardContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

type PeopleCardProp = {
  data: PeopleCardData
  hasSectionTitle: boolean
  orientation?: 'portrait' | 'landscape'
}

const PeopleCard = ({ data, hasSectionTitle, orientation = 'portrait', ...rest }: PeopleCardProp) => {
  const { name, image, title, department, isLink, phone, email, cv } = data

  return (
    <StyledCard
      orientation={orientation}
      style={
        {
          '--height': 'auto',
          '--card-padding': '0 0 var(--space-medium) 0',
        } as CSSProperties
      }
      {...rest}
    >
      <StyledMedia>
        <ImageContainer>
          {/*   @TODO Final size adjustments */}

          {image && <RoundedImage image={image} maxWidth={200} aspectRatio={1} layout="intrinsic" />}
        </ImageContainer>
      </StyledMedia>
      <TextContent style={{ '--text-height': orientation === 'portrait' ? '100%' : 'auto' } as CSSProperties}>
        <CardContent>
          <div>
            <Name size="sm" level={hasSectionTitle ? 'h3' : 'h2'}>
              {name}
            </Name>

            {title && <Detail>{title}</Detail>}
            {department && <Detail>{department}</Detail>}
          </div>
          <Contact>
            {isLink && cv ? (
              <CV data={cv} />
            ) : (
              <>
                {email && <ContactLink href={`mailto:${email}`}>{email}</ContactLink>}
                {phone && <ContactLink href={`tel:${phone}`}>{phone}</ContactLink>}
              </>
            )}
          </Contact>
        </CardContent>
      </TextContent>
    </StyledCard>
  )
}

export default PeopleCard
