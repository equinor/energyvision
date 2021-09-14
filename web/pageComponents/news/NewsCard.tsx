import { Card, FormattedDate } from '@components'
import { default as NextLink } from 'next/link'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { NewsCardData } from '../../types/types'
import Image from '../shared/Image'

const { Title, Header, Action, Arrow, Media, CardLink, Text, Eyebrow } = Card

type NewsCardProp = {
  data: NewsCardData
}

const NewsCard = ({ data }: NewsCardProp) => {
  const { slug, title, ingress, publishDateTime, heroImage } = data
  if (!heroImage) return null

  return (
    <NextLink href={`/news/${slug}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <CardLink>
        <Card>
          <Media>
            {heroImage && <Image image={heroImage.image} maxWidth={400} aspectRatio={0.56} layout="responsive" />}
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
