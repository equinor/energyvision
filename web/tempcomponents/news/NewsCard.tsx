import { Card, FormattedDate } from '@components'
import { default as NextLink } from 'next/link'
import Img from 'next/image'
import { imageProps } from '../../common/helpers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { NewsCardData } from '../../types/types'

const { Title, Header, Action, Arrow, Media, CardLink, Text, Eyebrow } = Card

type NewsCardProp = {
  data: NewsCardData
}

const NewsCard = ({ data }: NewsCardProp) => {
  const { slug, title, ingress, publishDateTime, heroImage } = data

  // TODO: handle drafts better
  if (!slug || !title || !ingress || !publishDateTime || !heroImage) return null

  return (
    <NextLink href={`/news/${slug}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <CardLink>
        <Card>
          <Media>
            <Img {...imageProps(heroImage?.image, 400, 0.56)} alt={heroImage.alt} />
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
}

export default NewsCard
