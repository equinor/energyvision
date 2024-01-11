import { Card, Heading } from '@components'
import { outlineTemplate, Tokens } from '@utils'
import { CSSProperties } from 'react'
import styled from 'styled-components'
import Image, { Ratios } from '../../../pageComponents/shared/SanityImage'
import type { PeopleCardData } from '../../../types/types'
import CV from './CV'
import { SocialProfileJsonLd } from 'next-seo'
import { urlFor } from '../../../common/helpers'

const { Media, Text, StyledPortraitCard, StyledLandscapeCard } = Card
const { outline } = Tokens

const StyledCard = styled(Card)`
  height: var(--height);

  /*   justify-self: center; */
  ${StyledLandscapeCard}& {
    /*  A litte bit messy, but the landscape version for people
  doesn't look good before it actually breaks into to columns
  if we doesn't restrict the width */
    max-width: 300px;
    margin: 0 auto;
    /* 520 is where it breaks into an actual landscape layout */
    @media (min-width: 520px) {
      max-width: none;
    }
  }
`

const Name = styled(Heading)`
  font-weight: var(--fontWeight-medium);
  margin-bottom: var(--space-small);
  text-align: center;
  ${StyledLandscapeCard} & {
    @media (min-width: 520px) {
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
      display: inline;
      :not(:only-of-type):after {
        content: ',';
        margin-right: var(--space-xSmall);
      }
      :last-of-type:after {
        content: '';
        margin-right: 0;
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
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
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
    @media (min-width: 520px) {
      padding: var(--space-medium) 0 var(--space-medium) var(--space-large);
    }
  }
  ${StyledPortraitCard} & {
    padding: var(--space-medium) var(--space-medium) var(--space-medium) var(--space-medium);
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
    margin-bottom: var(--space-medium);
    display: grid;
    align-content: center;
    @media (min-width: 520px) {
      /* Turn off the default padding in the Text component */
      --text-spacing: 0;
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
  max-width: 250px;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  ${StyledLandscapeCard} & {
    @media (min-width: 520px) {
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
  const { name, image, title, department, isLink, phone, email, cv, enableStructuredMarkup } = data

  return (
    <>
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
            {image && <RoundedImage image={image} maxWidth={400} aspectRatio={Ratios.ONE_TO_ONE} quality={100} />}
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
      {enableStructuredMarkup && (
        <SocialProfileJsonLd
          type="Person"
          name={name}
          jobTitle={title}
          url=""
          sameAs={['']}
          worksFor={{
            type: 'Organization',
            name: 'Equinor',
            url: 'https://www.equinor.com',
          }}
          image={image ? urlFor(image).url : undefined}
          telephone={phone}
          email={email}
        />
      )}
    </>
  )
}

export default PeopleCard
