import { Heading, Card, FormattedDate } from '@components'
import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import Img from 'next/image'
import { imageProps } from '../../common/helpers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { NewsCard } from '../../types/types'

const { Title, Header, Action, Arrow, Media, CardLink, Text, Eyebrow } = Card

const TempWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

type LatestNewsProp = {
  data: NewsCard[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  return (
    <>
      <Heading size="xl" level="h2" center>
        {/* @TODO: Localization, where does this text come from */}
        Latest news
      </Heading>
      <TempWrapper>
        {data.map((newsItem: NewsCard) => {
          const { slug, title, id, ingress, publishDateTime, heroImage } = newsItem
          return (
            <NextLink href={`/news/${slug}`} key={id}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <CardLink>
                <Card>
                  <Media>
                    <Img {...imageProps(heroImage.image, 400, 0.56)} alt={heroImage.alt} />
                  </Media>
                  <Header>
                    <Eyebrow>
                      <FormattedDate datetime={publishDateTime} />
                    </Eyebrow>
                    <Title>{title}</Title>
                  </Header>
                  <Text>
                    <SimpleBlockContent blocks={ingress}></SimpleBlockContent>
                  </Text>
                  <Action>
                    <Arrow />
                  </Action>
                </Card>
              </CardLink>
            </NextLink>
          )
        })}
      </TempWrapper>
    </>
  )
}

export default LatestNews
