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

export default {
  title: 'Components/Card',
  component: Card,
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
  <Card style={{ maxWidth: '20rem' }}>
    <Card.Media>
      <RatioBox>
        <ImagePlaceholder />
      </RatioBox>
    </Card.Media>
    <Card.Eyebrow>Overline</Card.Eyebrow>
    <Card.Title>Meet the coolest robots working in energy</Card.Title>
    <Card.Content>
      Lorem excepteur cillum exercitation cillum deserunt exercitation non in velit in id veniam. Deserunt culpa
      proident est fugiat Lorem eu qui eiusmod. Labore aliquip enim est magna eu dolore dolor occaecat dolor laboris
      laborum. Occaecat cupidatat minim aute esse velit sint. Sunt non cupidatat cillum irure.
    </Card.Content>
    <Card.Action>--&gt;</Card.Action>
  </Card>
)

NewsCard.storyName = 'News card'

NewsCard.parameters = {
  docs: {
    // The story now contains a description
    storyDescription: 'News cards should always have a date',
  },
}
