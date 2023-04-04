import styled from 'styled-components'
import useSharedTitleStyles from '../../lib/hooks/useSharedTitleStyles'
import { HeroTypes, TopicPageSchema } from '../../types/types'
import Seo from '../shared/Seo'
import { SharedBanner } from './shared/SharedBanner'
import { PageContent } from './shared/SharedPageContent'
import SharedTitle from './shared/SharedTitle'
import { Breadcrumbs } from '../topicPages/Breadcrumbs'
import { Flags } from '../../common/helpers/datasetHelpers'

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
type TopicPageProps = {
  data: TopicPageSchema
}

const TopicPage = ({ data }: TopicPageProps) => {
  const titleStyles = useSharedTitleStyles(data?.hero?.type, data?.content?.[0])

  return (
    <>
      <Seo
        seoAndSome={data?.seoAndSome}
        slug={data?.slug}
        heroImage={data?.hero?.figure?.image}
        pageTitle={data?.title}
      />
      <TopicPageLayout>
        <SharedBanner title={data.title} hero={data.hero} />

        {Flags.IS_DEV && data.enableBreadcrumbs && (
          <Breadcrumbs
            slug={data?.slug}
            useCustomBreadcrumbs={data?.useCustomBreadcrumbs}
            defaultBreadcrumbs={data?.defaultBreadcrumbs}
            customBreadcrumbs={data?.customBreadcrumbs}
          />
        )}

        {data.hero.type !== HeroTypes.DEFAULT && <SharedTitle title={data.title} styles={titleStyles} />}
        <PageContent data={data} />
      </TopicPageLayout>
    </>
  )
}

export default TopicPage
