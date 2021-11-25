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
  font-weight: var(--fontWeight-medium);
  margin-bottom: var(--space-small);
  text-align: center;
  ${StyledLandscapeCard} & {
    @media (min-width: 450px) {
      text-align: left;
    }
  }
`

const Detail = styled.span`
  font-size: var(--typeScale-0);
  display: block;
  ${StyledLandscapeCard} & {
    @media (min-width: 650px) {
      /* If we have two details, one for title and one for department, 
      put them on one line, separate with comma */
      display: inline-block;
      :nth-of-type(2):before {
        content: ',';
        margin-right: var(--space-xSmall);
      }
    }
  }
`

const Contact = styled.div`
  margin-top: var(--space-medium);
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
  box-sizing: content-box;
  height: 120px;
  width: 120px;
  /*  Somewhat complicated, but we need slightly different styles here,
  and the images don't calculate correct if we use grid or flex */
  ${StyledLandscapeCard} & {
    /*  Don't set padding on the landscape card itself because of the Event card */
    padding-top: var(--space-medium);
    @media (min-width: 450px) {
      padding: var(--space-medium) 0 var(--space-medium) var(--space-medium);
    }
  }
  ${StyledPortraitCard} & {
    padding: var(--space-medium) var(--space-medium) 0 var(--space-medium);
    margin: 0 auto;
    @media (min-width: 450px) {
      height: 150px;
      width: 150px;
    }
  }

  @media (min-width: 850px) {
    height: 200px;
    width: 200px;
  }
`

const TextContent = styled(Text)`
  height: var(--text-height, auto);
  ${StyledLandscapeCard} & {
    /* Turn off the default padding in the Text component */
    --text-spacing: 0;
    margin-bottom: var(--space-medium);
    display: grid;
    align-content: center;
    @media (min-width: 450px) {
      margin: var(--space-medium) var(--space-medium) var(--space-medium) 0;
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
  text-align: center;
  ${StyledLandscapeCard} & {
    @media (min-width: 450px) {
      text-align: left;
    }
  }
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
