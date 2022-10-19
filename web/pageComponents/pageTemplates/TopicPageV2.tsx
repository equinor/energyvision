import styled from 'styled-components'
import { PageContent } from './shared/SharedPageContent'
import { TopicPageSchema } from '../../types/types'
import { SharedBanner } from './shared/SharedBanner'
import Seo from '../../pageComponents/shared/Seo'
import TitleText from '../shared/portableText/TitleText'

const TopicPageLayout = styled.main`
  /* The neverending spacing story... If two sections with the same background colour
  follows each other we want less spacing */
  .background-one + .background-one,
  .background-two + .background-two,
  .background-three + .background-three,
  .background-four + .background-four,
  .background-five + .background-five,
  .background-none + .background-none,
  .background-image + .background-none {
    /* The teaser component uses an article element, so lets avoid that.
    Would be more robust if we add a container for the padding :/ */
    > section,
    > figure,
    > div:first-child {
      /*  padding-top: calc(var(--space-3xLarge) / 2); */
      padding-top: 0;
    }
  }
`
const TitleWrapper = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large);
`

const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

type TopicPageProps = {
  data: TopicPageSchema
}

const TopicPage = ({ data }: TopicPageProps) => {
  return (
    <>
      <Seo seoAndSome={data?.seoAndSome} slug={data?.slug} heroImage={data?.heroImage?.image} pageTitle={data?.title} />
      <TopicPageLayout>
        <SharedBanner data={data} />
        {data.hero.type !== 'default' && (
          <TitleWrapper>{data.title && <StyledHeading value={data.title} level="h1" size="2xl" />}</TitleWrapper>
        )}
        <PageContent data={data} />
      </TopicPageLayout>
    </>
  )
}

export default TopicPage
