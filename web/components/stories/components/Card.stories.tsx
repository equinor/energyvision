/* eslint-disable */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ImagePlaceholder, RatioBox, Wrapper, CardLink } from './helpers/styles'
import { Card, CardProps } from '@components'

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
        component: `A <code>Card</code> displays content related to a single subject and 
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
          <ImagePlaceholder />
        </RatioBox>
      </Card.Media>
      <Card.Header>
        <Card.Title>Dolor sit amet</Card.Title>
      </Card.Header>
      <Card.Text>
        Lorem <strong>excepteur</strong> cillum exercitation cillum deserunt exercitation non in velit in id veniam.
        Deserunt culpa proident est fugiat Lorem eu qui <i>eiusmod</i>. Labore aliquip enim est magna CO
        <sub>2</sub> eu dolore dolor occaecat dolor laboris laborum.
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
            <ImagePlaceholder />
          </RatioBox>
        </Card.Media>
        <Card.Header>
          <Card.Eyebrow>Overline</Card.Eyebrow>
          <Card.Title>Dolor sit amet</Card.Title>
        </Card.Header>
        <Card.Text>
          Lorem <strong>excepteur</strong> cillum exercitation cillum deserunt exercitation non in velit in id veniam.
          Deserunt culpa proident est fugiat Lorem eu qui <i>eiusmod</i>. Labore aliquip enim est magna CO
          <sub>2</sub> eu dolore dolor occaecat dolor laboris laborum.
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
            <ImagePlaceholder />
          </RatioBox>
        </Card.Media>
        <Card.Header>
          <Card.Eyebrow>September 24, 2020</Card.Eyebrow>
          <Card.Title level="h3">
            Dogger Bank wind farm places record-breaking turbine order boosting local jobs
          </Card.Title>
        </Card.Header>
        <Card.Text>
          Dogger Bank Wind Farm and GE Renewable Energy have today, 22 September, announced contracts confirming the
          13MW Haliade-X turbine for the Dogger Bank A and Dogger Bank B phases of the world’s largest offshore wind
          farm.
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
