/* eslint-disable */
import React, { CSSProperties } from 'react'
import { Story, Meta } from '@storybook/react'
import styled from 'styled-components'
import { AspectImagePlaceholder, RatioBox, Wrapper, CardLink } from '@stories'
import { Card, CardProps, Text, ButtonLink, BackgroundContainer } from '@components'

export default {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    Title: Card.Title,
    Media: Card.Media,
    Text: Card.Text,
    Action: Card.Action,
    Header: Card.Header,
    Arrow: Card.Arrow,
    Eyebrow: Card.Eyebrow,
  },
  parameters: {
    docs: {
      description: {
        component: `A Card displays content related to a single subject and
        acts as an entry point to more detailed information. <br />
        🚧 &nbsp; v1 with focus on news listing cards
        `,
      },
    },
  },
} as Meta

export const Default: Story<CardProps> = (args) => (
  <Wrapper>
    <Card {...args}>
      <Card.Media>
        <RatioBox>
          <AspectImagePlaceholder />
        </RatioBox>
      </Card.Media>
      <Card.Header>
        <Card.Title>Dolor sit amet</Card.Title>
      </Card.Header>
      <Card.Text>
        <Text>
          Lorem <strong>excepteur</strong> cillum exercitation cillum deserunt exercitation non in velit in id veniam.
          Deserunt culpa proident est fugiat Lorem eu qui <i>eiusmod</i>. Labore aliquip enim est magna CO
          <sub>2</sub> eu dolore dolor occaecat dolor laboris laborum.
        </Text>
      </Card.Text>
    </Card>
  </Wrapper>
)

Default.storyName = 'Default'

export const NewsCard: Story<CardProps> = () => (
  <Wrapper>
    <CardLink href="#">
      <Card>
        <Card.Media>
          <RatioBox>
            <AspectImagePlaceholder />
          </RatioBox>
        </Card.Media>
        <Card.Header>
          <Card.Eyebrow>Overline</Card.Eyebrow>
          <Card.Title>Dolor sit amet</Card.Title>
        </Card.Header>
        <Card.Text>
          <Text>
            Lorem <strong>excepteur</strong> cillum exercitation cillum deserunt exercitation non in velit in id veniam.
            Deserunt culpa proident est fugiat Lorem eu qui <i>eiusmod</i>. Labore aliquip enim est magna CO
            <sub>2</sub> eu dolore dolor occaecat dolor laboris laborum.
          </Text>
        </Card.Text>
        <Card.Action>
          <Card.Arrow />
        </Card.Action>
      </Card>
    </CardLink>
    <CardLink href="#">
      <Card>
        <Card.Media>
          <RatioBox>
            <AspectImagePlaceholder />
          </RatioBox>
        </Card.Media>
        <Card.Header>
          <Card.Eyebrow>September 24, 2020</Card.Eyebrow>
          <Card.Title level="h3">
            Dogger Bank wind farm places record-breaking turbine order boosting local jobs
          </Card.Title>
        </Card.Header>
        <Card.Text>
          <Text>
            Dogger Bank Wind Farm and GE Renewable Energy have today, 22 September, announced contracts confirming the
            13MW Haliade-X turbine for the Dogger Bank A and Dogger Bank B phases of the world’s largest offshore wind
            farm.
          </Text>
        </Card.Text>
        <Card.Action>
          <Card.Arrow />
        </Card.Action>
      </Card>
    </CardLink>
  </Wrapper>
)

NewsCard.storyName = 'News card'

NewsCard.parameters = {
  docs: {
    storyDescription: `A news card should always have an overline/eyebrow with publishing date.`,
  },
}
export const PromoTile: Story<CardProps> = () => (
  <Wrapper>
    <Card type="promo">
      <Card.Media>
        <RatioBox aspect="80%">
          <AspectImagePlaceholder />
        </RatioBox>
      </Card.Media>
      <Card.Header>
        <Card.Title>Find out what its like to work in Equinor</Card.Title>
      </Card.Header>
      <Card.Action>
        <ButtonLink>Find out more</ButtonLink>
      </Card.Action>
    </Card>

    <Card type="promo">
      <Card.Media>
        <RatioBox aspect="80%">
          <AspectImagePlaceholder />
        </RatioBox>
      </Card.Media>
      <Card.Header>
        <Card.Title level="h3">Are you a student? Check out your future dream job</Card.Title>
      </Card.Header>
      <Card.Action>
        <ButtonLink>Check it out</ButtonLink>
      </Card.Action>
    </Card>
  </Wrapper>
)

PromoTile.storyName = 'Promo tile'

PromoTile.parameters = {
  docs: {
    storyDescription: `A promo tile should always be in pairs. <br />
    ⚠️ &nbsp; Showcases the issue of too long texts in buttons`,
  },
}

export const Landscape: Story<CardProps> = () => {
  const FakeImage = styled.div`
    height: 200px;
    width: 200px;
    background-color: grey;
  `
  return (
    <Wrapper>
      <Card
        orientation="landscape"
        style={
          {
            '--height': 'auto',
            '--card-padding': '0 0 var(--space-medium) 0',
          } as CSSProperties
        }
      >
        <Card.Media>
          <FakeImage />
        </Card.Media>

        <Card.Text>Text Text Text Text Text</Card.Text>
      </Card>
    </Wrapper>
  )
}

Landscape.storyName = 'Landscape mode'

Landscape.parameters = {
  docs: {
    storyDescription: `Cards for event and people could be in landscape mode. <br />
    The people and event cards don't have a header. They consists of two children (image + text/text + text)
    so the landscape mode doesn't work with news and promo cards.
    `,
  },
}
export const PromoTileWithDifferentLength: Story<CardProps> = () => (
  <Wrapper>
    <Card type="promo">
      <Card.Media>
        <RatioBox aspect="80%">
          <AspectImagePlaceholder />
        </RatioBox>
      </Card.Media>
      <Card.Header>
        <Card.Title>Find out what its like to work in Equinor and what we can offer</Card.Title>
      </Card.Header>
      <Card.Action>
        <ButtonLink>More about Equinor work life</ButtonLink>
      </Card.Action>
    </Card>

    <Card type="promo">
      <Card.Media>
        <RatioBox aspect="80%">
          <AspectImagePlaceholder />
        </RatioBox>
      </Card.Media>
      <Card.Header>
        <Card.Title level="h3">Check out your future dream job</Card.Title>
      </Card.Header>
      <Card.Action>
        <ButtonLink>Check it out</ButtonLink>
      </Card.Action>
    </Card>
  </Wrapper>
)

PromoTileWithDifferentLength.storyName = 'Promo tile with different title length'

PromoTileWithDifferentLength.parameters = {
  docs: {
    storyDescription: `If the title wraps on different numbers of lines, the buttons align to the bottom.`,
  },
}
export const PromoTileWithoutImage: Story<CardProps> = () => (
  <Wrapper>
    <Card type="promo" textOnly>
      <Card.Header>
        <Card.Title>Our summer internship Shaping the future of energy - and your future too!</Card.Title>
      </Card.Header>
      <Card.Action>
        <ButtonLink>Find out more</ButtonLink>
      </Card.Action>
    </Card>

    <Card type="promo">
      <Card.Media>
        <RatioBox aspect="80%">
          <AspectImagePlaceholder />
        </RatioBox>
      </Card.Media>
      <Card.Header>
        <Card.Title level="h3">Check out your future dream job</Card.Title>
      </Card.Header>
      <Card.Action>
        <ButtonLink>Check it out</ButtonLink>
      </Card.Action>
    </Card>
  </Wrapper>
)

PromoTileWithoutImage.storyName = 'Promo tile without image'

PromoTileWithoutImage.parameters = {
  docs: {
    storyDescription: `A promo tile doesn't need to have an image. If that is the case, the promo tile has more top spacing.`,
  },
}
export const CardWithBackground: Story<CardProps> = () => (
  <Wrapper>
    <BackgroundContainer background="Moss Green Light">
      <Card type="promo" textOnly>
        <Card.Header>
          <Card.Title>Our summer internship Shaping the future of energy - and your future too!</Card.Title>
        </Card.Header>
        <Card.Action>
          <ButtonLink>Find out more</ButtonLink>
        </Card.Action>
      </Card>
    </BackgroundContainer>
    <BackgroundContainer background="Slate Blue">
      <Card type="promo" textOnly>
        <Card.Header>
          <Card.Title>Our summer internship Shaping the future of energy - and your future too!</Card.Title>
        </Card.Header>
        <Card.Action>
          <ButtonLink>Find out more</ButtonLink>
        </Card.Action>
      </Card>
    </BackgroundContainer>
    <BackgroundContainer background="Spruce Wood">
      <Card type="promo" textOnly>
        <Card.Header>
          <Card.Title>Our summer internship Shaping the future of energy - and your future too!</Card.Title>
        </Card.Header>
        <Card.Action>
          <ButtonLink>Find out more</ButtonLink>
        </Card.Action>
      </Card>
    </BackgroundContainer>
    <BackgroundContainer background="Moss Green Light">
      <Card type="promo" textOnly>
        <Card.Header>
          <Card.Title>Our summer internship Shaping the future of energy - and your future too!</Card.Title>
        </Card.Header>
        <Card.Action>
          <ButtonLink>Find out more</ButtonLink>
        </Card.Action>
      </Card>
    </BackgroundContainer>
    <BackgroundContainer background="Mist Blue">
      <Card type="promo" textOnly>
        <Card.Header>
          <Card.Title level="h3">Check out your future dream job</Card.Title>
        </Card.Header>
        <Card.Action>
          <ButtonLink>Check it out</ButtonLink>
        </Card.Action>
      </Card>
    </BackgroundContainer>
  </Wrapper>
)

CardWithBackground.storyName = 'Cards with background colour'
PromoTileWithoutImage.parameters = {
  docs: {
    storyDescription: `At the moment, background colours only apply to promo tiles.`,
  },
}
