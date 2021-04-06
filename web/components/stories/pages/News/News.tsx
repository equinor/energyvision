/* eslint-disable */
import React from 'react'
import { Card } from '@components'
import { ImagePlaceholder, RatioBox, CardLink, Wrapper } from '../../components/helpers/styles'
import { data } from './data'
import styled from 'styled-components'
const { Media, Header, Text, Title, Arrow, Action, Eyebrow } = Card

const StyledMain = styled.main`
  max-width: 60rem;
  margin: 0 auto;
`

export const News = () => (
  <StyledMain>
    <h1>News list</h1>
    <Wrapper>
      {data.map((item) => {
        return (
          <CardLink href="#" key={item.id}>
            <Card>
              <Media>
                <RatioBox>
                  <ImagePlaceholder />
                </RatioBox>
              </Media>
              <Header>
                <Eyebrow>{item.eyebrow}</Eyebrow>
                <Title level="h3">{item.title}</Title>
              </Header>
              <Text>{item.lead}</Text>
              <Action>
                <Arrow />
              </Action>
            </Card>
          </CardLink>
        )
      })}
    </Wrapper>
  </StyledMain>
)
