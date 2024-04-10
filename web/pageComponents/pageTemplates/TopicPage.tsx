import styled from 'styled-components'
import useSharedTitleStyles from '../../lib/hooks/useSharedTitleStyles'
import { HeroTypes, TopicPageSchema } from '../../types/types'
import Seo from '../shared/Seo'
import { SharedBanner } from './shared/SharedBanner'
import { PageContent } from './shared/SharedPageContent'
import SharedTitle from './shared/SharedTitle'
import { Breadcrumbs } from '../topicPages/Breadcrumbs'

const TopicPageLayout = styled.main`
  /* The neverending spacing story... If two sections with the same background colour
  follows each other we want less spacing */
  .background--bg-mid-blue + .background--bg-mid-blue,
  .background--bg-default + .background--bg-default,
  .background--bg-moss-green + .background--bg-moss-green,
  .background--bg-moss-green-light + .background--bg-moss-green-light,
  .background--bg-spruce-wood + .background--bg-spruce-wood,
  .background--bg-mist-blue + .background--bg-mist-blue,
  .background--bg-slate-blue + .background--bg-slate-blue,
  .background--bg-mid-yellow + .background--bg-mid-yellow,
  .background--bg-mid-orange + .background--bg-mid-orange,
  .background--bg-mid-green + .background--bg-mid-green {
    /* The teaser component uses an article element, so lets avoid that.
    Would be more robust if we add a container for the padding :/ */
    > section,
    > figure,
    > ol,
    > h1,
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
  const { breadcrumbs } = data
  return (
    <>
      <Seo
        seoAndSome={data?.seoAndSome}
        slug={data?.slug}
        heroImage={data?.hero?.figure?.image}
        pageTitle={data?.title}
      />
      <TopicPageLayout>
        <SharedBanner title={data.title} hero={data.hero} captionBg={titleStyles.background?.backgroundColor} />
        {breadcrumbs && breadcrumbs?.enableBreadcrumbs && (
          <Breadcrumbs
            background={titleStyles.background}
            slug={data?.slug}
            useCustomBreadcrumbs={breadcrumbs?.useCustomBreadcrumbs}
            defaultBreadcrumbs={breadcrumbs?.defaultBreadcrumbs}
            customBreadcrumbs={breadcrumbs?.customBreadcrumbs}
            containerStyles={{
              hasTopMargin: data.hero.type !== 'default',
            }}
          />
        )}

        {data.hero.type !== HeroTypes.DEFAULT && (
          <SharedTitle sharedTitle={data.title} background={titleStyles.background} />
        )}
        <PageContent data={data} />
      </TopicPageLayout>
    </>
  )
}

export default TopicPage
