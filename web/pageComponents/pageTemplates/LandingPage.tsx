import styled from 'styled-components'
import type { LandingPageSchema } from '../../types/index'
import IngressText from '../shared/portableText/IngressText'
import ContentGroup from '../landingPages/ContentGroup'
import Seo from '../../pageComponents/shared/Seo'
import { Typography } from '@core/Typography'

const HeroBanner = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-medium) var(--space-xLarge)
    var(--layout-paddingHorizontal-medium);
`

const Intro = styled.div`
  --max-width: calc(40 * var(--space-medium));
  padding: 0 var(--layout-paddingHorizontal-medium);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  /* While I don't love this, we need to restrict the width of the paragraph */
  & p {
    max-width: var(--layout-maxContent-narrow);
  }
`

const TOCList = styled.div``

type LandingPageProps = {
  data: LandingPageSchema
}

const LandingPage = ({ data }: LandingPageProps) => {
  const { title, ingress, subGroups = [] } = data

  return (
    <>
      <Seo seoAndSome={data?.seoAndSome} slug={data?.slug} pageTitle={data?.title} />
      <main>
        <HeroBanner>
          {title && (
            <Typography className="max-w-[1186px] mx-auto" as="h1" variant="3xl">
              {title}
            </Typography>
          )}
        </HeroBanner>
        {ingress && (
          <Intro>
            <IngressText value={ingress} />
          </Intro>
        )}
        <TOCList>
          {subGroups?.map((group) => {
            return <ContentGroup key={group.id} group={group} />
          })}
        </TOCList>
      </main>
    </>
  )
}

export default LandingPage
