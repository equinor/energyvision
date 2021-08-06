/* eslint-disable */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { AspectImagePlaceholder, RatioBox, Wrapper, CardLink } from './helpers/styles'
import { Card, CardProps, Text, Link } from '@components'

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
        <Link variant="buttonLink">Find out more about Equinor work life</Link>
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
        <Link variant="buttonLink">Check it out</Link>
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
        <Link variant="buttonLink">More about Equinor work life</Link>
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
        <Link variant="buttonLink">Check it out</Link>
      </Card.Action>
    </Card>
  </Wrapper>
)

PromoTileWithDifferentLength.storyName = 'Promo tile with different title lenght'

PromoTileWithDifferentLength.parameters = {
  docs: {
    storyDescription: `If the title wraps on different numbers of lines, the buttons align to the bottom.`,
  },
}
export const PromoTileWithoutImage: Story<CardProps> = () => (
  <Wrapper>
    <Card type="promo">
      <Card.Header>
        <Card.Title>Our summer internship Shaping the future of energy - and your future too!</Card.Title>
      </Card.Header>
      <Card.Action>
        <Link variant="buttonLink">Find out more</Link>
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
        <Link variant="buttonLink">Check it out</Link>
      </Card.Action>
    </Card>
  </Wrapper>
)

PromoTileWithoutImage.storyName = 'Promo tile without image'

PromoTileWithoutImage.parameters = {
  docs: {
    storyDescription: `If the title wraps on different numbers of lines, the buttons align to the bottom.`,
  },
}
