import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import Image from '../shared/Image'
import { Card, Heading } from '@components'
import type { SubMenuGroupLinkData, MenuLinkData } from '../../types/types'

const { Header, Action, Arrow, CardLink, Media } = Card

type SimpleCardData = {
  data: SubMenuGroupLinkData
}

const RatioBox = styled.div`
  position: relative;
  height: 0;
  display: block;
  width: 100%;
  padding-bottom: 47.5%;
`

const AspectImagePlaceholder = styled.div`
  background-color: var(--ui-background-default);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
`

const StyledCard = styled(Card)`
  grid-gap: var(--space-medium);
`

function getLink(linkData: MenuLinkData, label: string) {
  // Fallback to home page, if this happens it is an error somewhere

  // Sanity should take care of the validation here, and this is temp. until
  // the static pages are migrated
  if (!linkData) {
    console.warn('Missing link data for', label)
    return 'something-wrong'
  }
  const { isStatic, link, staticUrl } = linkData
  if (isStatic) {
    return staticUrl || '/'
  } else {
    return (link && link.slug) || '/'
  }
}

const SimpleCard = ({ data }: SimpleCardData) => {
  const { id, label, image } = data
  return (
    <NextLink key={id} href={getLink(data, label)} passHref>
      <CardLink>
        <StyledCard>
          <Media>
            {/*  If this i static content, we don't have an image so we will just add an empty placeholder instead */}
            {image ? (
              <Image
                image={image}
                maxWidth={400}
                aspectRatio={0.475}
                layout="responsive"
                /* @TODO Fine tune this when the design is finished */
                sizes="(max-width: 360px) 330px,270px"
              />
            ) : (
              <RatioBox>
                <AspectImagePlaceholder />
              </RatioBox>
            )}
          </Media>
          <Header>
            <Heading size="xs">{label}</Heading>
          </Header>
          <Action>
            <Arrow />
          </Action>
        </StyledCard>
      </CardLink>
    </NextLink>
  )
}

export default SimpleCard
