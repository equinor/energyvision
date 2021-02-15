/* eslint-disable */
import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'
import styled from 'styled-components'
import { Card, CardProps } from '@components'

const ImagePlaceholder = styled.div`
  background-color: hsl(0, 0%, 86%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
`

const RatioBox = styled.div`
  position: relative;
  height: 0;
  display: block;
  width: 100%;
  padding-bottom: 56.25%;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 2rem;
`

export default {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    Media: Card.Media,
    Eyebrow: Card.Eyebrow,
    Title: Card.Title,
    Content: Card.Content,
    Action: Card.Action,
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

export const Default: Story<CardProps> = (args) => <Card>Some default example</Card>

Default.storyName = 'Default'

export const NewsCard: Story<CardProps> = (args) => (
  <Wrapper>
    <a href="#">
      <Card>
        <Card.Media>
          <RatioBox>
            <ImagePlaceholder />
          </RatioBox>
        </Card.Media>
        <Card.Eyebrow>Overline</Card.Eyebrow>
        <Card.Title>Dolor sit amet</Card.Title>
        <Card.Content>
          <p>
            Lorem <strong>excepteur</strong> cillum exercitation cillum deserunt exercitation non in velit in id veniam.
            Deserunt culpa proident est fugiat Lorem eu qui <i>eiusmod</i>. Labore aliquip enim est magna CO
            <sub>2</sub> eu dolore dolor occaecat dolor laboris laborum.
          </p>
        </Card.Content>
        <Card.Action>--&gt;</Card.Action>
      </Card>
    </a>
    <a href="#">
      <Card>
        <Card.Media>
          <RatioBox>
            <ImagePlaceholder />
          </RatioBox>
        </Card.Media>
        <Card.Eyebrow>September 24, 2020</Card.Eyebrow>
        <Card.Title>Dogger Bank wind farm places record-breaking turbine order boosting local jobs</Card.Title>
        <Card.Content>
          <p>
            Dogger Bank Wind Farm and GE Renewable Energy have today, 22 September, announced contracts confirming the
            13MW Haliade-X turbine for the Dogger Bank A and Dogger Bank B phases of the world’s largest offshore wind
            farm.
          </p>
        </Card.Content>
        <Card.Action>--&gt;</Card.Action>
      </Card>
    </a>
  </Wrapper>
)

NewsCard.storyName = 'News card'

NewsCard.parameters = {
  docs: {
    // The story now contains a description
    storyDescription: 'News cards should always have a date',
  },
}
