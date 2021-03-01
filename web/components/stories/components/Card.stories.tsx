/* eslint-disable */
import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'
import styled from 'styled-components'
import { Card, CardProps } from '@components'
import { Typography } from '@equinor/eds-core-react'

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

const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`
export default {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    Media: Card.Media,
    Title: Card.Text,
    Action: Card.Action,
    Header: Card.Header,
    TailoredTitle: Card.Title,
    Arrow: Card.Arrow,
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
          <Card.Title eyebrow="Overline">Dolor sit amet</Card.Title>
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
          <Card.Title level="h3" eyebrow="September 24, 2020">
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
    // The story now contains a description
    storyDescription: `An example using EDS Card component. Apart from the arrow positioning aligned at the bottom, it is EDS default card. I use the "info" variant
      to highlight the padding from EDS`,
  },
}
