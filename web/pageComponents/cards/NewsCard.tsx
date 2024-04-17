import { FormattedDate } from '@components'
import Card from '@sections/cards/Card'
import type { CardData } from '../../types/types'
import { Ratios } from '../shared/SanityImage'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import Blocks from '../../pageComponents/shared/portableText/Blocks'

type NewsCardProp = {
  data: CardData
  fitToContent?: boolean
}

const NewsCard = ({ data, fitToContent = false, ...rest }: NewsCardProp) => {
  const { slug, title, ingress, publishDateTime, heroImage } = data

  const image = useSanityLoader(heroImage.image, 400, Ratios.NINE_TO_SIXTEEN)

  return (
    <Card
      href={slug}
      {...(heroImage && {
        imageUrl: image.src,
      })}
      className="basis-0 grow min-w-[var(--card-minWidth)] max-w-[var(--card-maxWidth)]"
    >
      <Card.Content>
        <Card.Header
          title={title as string}
          {...(publishDateTime && {
            eyebrow: <FormattedDate datetime={publishDateTime} uppercase />,
          })}
        />
        {ingress && <Blocks value={ingress} className="line-clamp-5" />}
      </Card.Content>
    </Card>
  )

  /*   return (
    <StyledLink href={slug} prefetch={false} {...rest}>
      <StyledCard
        style={
          {
            '--height': fitToContent ? 'auto' : '100%',
          } as CSSProperties
        }
      >
        <Media>
          {heroImage && (
            <Image
              image={heroImage.image}
              maxWidth={400}
              aspectRatio={Ratios.NINE_TO_SIXTEEN}
              sizes="(min-width: 1780px) calc(-1.72vw + 401px), (min-width: 1340px) calc(17.86vw + 58px), 276px"
            />
          )}
        </Media>
        <Header>
          {publishDateTime && (
            <Eyebrow>
              <FormattedDate
                datetime={publishDateTime}
                style={{ textTransform: 'uppercase', marginBottom: 'var(--space-xSmall)' }}
              />
            </Eyebrow>
          )}
          <StyledTitle>
            <>{title}</>
          </StyledTitle>
        </Header>
        {ingress && (
          <StyledWrapper>
            <RichText
              value={ingress}
              components={{
                block: {
                  normal: ({ children }) => {
                    return <StyledIngress>{children}</StyledIngress>
                  },
                  smallText: ({ children }) => {
                    return <StyledIngress>{children}</StyledIngress>
                  },
                },
              }}
            ></RichText>
          </StyledWrapper>
        )}
        <Action>
          <Arrow />
        </Action>
      </StyledCard>
    </StyledLink>
  ) */
}

export default NewsCard
