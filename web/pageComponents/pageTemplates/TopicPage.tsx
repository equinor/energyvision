import { Breadcrumbs } from '@core/Breadcrumbs'
import { toPlainText } from '@portabletext/react'
import useSharedTitleStyles from '../../lib/hooks/useSharedTitleStyles'
import { HeroTypes, type TopicPageSchema } from '../../types/index'
import Seo from '../shared/Seo'
import { SharedBanner } from './shared/SharedBanner'
import { PageContent } from './shared/SharedPageContent'
import SharedTitle from './shared/SharedTitle'

type TopicPageProps = {
  data: TopicPageSchema
}

const TopicPage = ({ data }: TopicPageProps) => {
  const titleStyles = useSharedTitleStyles(data?.hero?.type, data?.content?.[0])
  const { breadcrumbs } = data
  const showSharedTitle =
    data?.hero?.type !== HeroTypes.DEFAULT && !data?.isCampaign && data?.hero?.type !== HeroTypes.BACKGROUND_IMAGE
  return (
    <>
      <Seo
        seoAndSome={data?.seoAndSome}
        slug={data?.slug}
        heroImage={data?.hero?.figure?.image}
        pageTitle={data?.title}
      />
      <main>
        {data.isCampaign ? (
          <h1 className="sr-only">{toPlainText(data.title)}</h1>
        ) : (
          <SharedBanner title={data.title} hero={data.hero} captionBg={titleStyles.background?.backgroundColor} />
        )}
        {breadcrumbs?.enableBreadcrumbs && (
          <Breadcrumbs
            background={titleStyles.background}
            slug={data?.slug}
            useCustomBreadcrumbs={breadcrumbs?.useCustomBreadcrumbs}
            defaultBreadcrumbs={breadcrumbs?.defaultBreadcrumbs}
            customBreadcrumbs={breadcrumbs?.customBreadcrumbs}
            className={data?.hero?.type === HeroTypes.DEFAULT ? 'pt-0' : ''}
          />
        )}

        {showSharedTitle && <SharedTitle sharedTitle={data.title} background={titleStyles.background} />}
        <PageContent data={data} titleBackground={titleStyles} />
      </main>
    </>
  )
}

export default TopicPage
