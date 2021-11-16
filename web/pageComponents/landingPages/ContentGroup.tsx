import styled from 'styled-components'
import { Card, Heading } from '@components'
import Image from '../shared/Image'

import type { SubMenuGroupData } from '../../types/types'

const { Header, Action, Arrow, CardLink, Media } = Card

const StyledContentGroup = styled.div`
  margin: var(--space-3xLarge) 0;
`

const TempGroup = styled.div`
  --min: 15ch;
  --row-gap: 2rem;
  --column-gap: 1rem;
  padding: 0 var(--layout-paddingHorizontal-small);
  margin: 0 auto;
  max-width: var(--maxViewportWidth);
  display: grid;
  /* grid-template-columns: repeat(auto-fit, min); */
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--min)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);
`
const ContentGroupHeader = styled.div`
  padding: 0 var(--layout-paddingHorizontal-medium) var(--space-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

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

type ContentGroupType = {
  group: SubMenuGroupData
}

const ContentGroup = ({ group }: ContentGroupType) => {
  const { label, links } = group
  return (
    <StyledContentGroup>
      {label && (
        <ContentGroupHeader>
          <Heading size="xl" level="h2">
            {label}
          </Heading>
        </ContentGroupHeader>
      )}
      <TempGroup>
        {links.map((link) => {
          const { id, label, image } = link
          return (
            <CardLink key={id}>
              <StyledCard>
                <Media>
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
          )
        })}
      </TempGroup>
    </StyledContentGroup>
  )
}

export default ContentGroup
