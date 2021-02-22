/* eslint-disable */
import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'
import styled from 'styled-components'
import { Card, CardProps } from '@components'
import { Typography } from '@equinor/eds-core-react'

// const { CardHeader, CardHeaderTitle, CardActions, CardMedia } = EDSCard

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

const StyledEDSCard = styled(Card)`
  height: 100%;
  grid-template-rows: auto auto auto 1fr;
  &:hover {
    cursor: pointer;
  }
`

const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`

const AnimatedSVG = styled.svg`
  ${StyledEDSCard}:hover & {
    transform: translateX(18px);
  }
`

export default {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    Media: Card.Media,
    Title: Card.Title,
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

export const EdsNewsCard: Story<CardProps> = () => (
  <Wrapper>
    <CardLink href="#">
      <StyledEDSCard>
        <Card.Media>
          <RatioBox>
            <ImagePlaceholder />
          </RatioBox>
        </Card.Media>
        <Card.Header>
          <Card.Title>
            <Typography variant="overline" as="span">
              Overline
            </Typography>
            <Typography variant="h3">Dolor sit amet</Typography>
          </Card.Title>
        </Card.Header>
        <Typography variant="ingress">
          Lorem <strong>excepteur</strong> cillum exercitation cillum deserunt exercitation non in velit in id veniam.
          Deserunt culpa proident est fugiat Lorem eu qui <i>eiusmod</i>. Labore aliquip enim est magna CO
          <sub>2</sub> eu dolore dolor occaecat dolor laboris laborum.
        </Typography>
        <Card.Action>
          <AnimatedSVG width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.7383 16L25.9997 9L18.7383 2"
              stroke="#FF1243"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M1 9H25.6369" stroke="#FF1243" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </AnimatedSVG>
        </Card.Action>
      </StyledEDSCard>
    </CardLink>
    <CardLink href="#">
      <StyledEDSCard>
        <Card.Media>
          <RatioBox>
            <ImagePlaceholder />
          </RatioBox>
        </Card.Media>
        <Card.Header>
          <Card.Title>
            <Typography variant="overline" as="span">
              September 24, 2020
            </Typography>
            <Typography variant="h3">
              Dogger Bank wind farm places record-breaking turbine order boosting local jobs
            </Typography>
          </Card.Title>
        </Card.Header>
        <Typography variant="ingress">
          Dogger Bank Wind Farm and GE Renewable Energy have today, 22 September, announced contracts confirming the
          13MW Haliade-X turbine for the Dogger Bank A and Dogger Bank B phases of the world’s largest offshore wind
          farm.
        </Typography>
        <Card.Action>
          <AnimatedSVG width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.7383 16L25.9997 9L18.7383 2"
              stroke="#FF1243"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M1 9H25.6369" stroke="#FF1243" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </AnimatedSVG>
        </Card.Action>
      </StyledEDSCard>
    </CardLink>
  </Wrapper>
)

EdsNewsCard.storyName = 'EDS news card'

EdsNewsCard.parameters = {
  docs: {
    // The story now contains a description
    storyDescription:
      'An example using EDS Card component. Apart from the arrow positioning aligned at the bottom, it is "as is"',
  },
}
