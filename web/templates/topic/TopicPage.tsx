import { toPlainText } from '@portabletext/react'
import useSharedTitleStyles from '../../lib/hooks/useSharedTitleStyles'
import { HeroTypes, TopicPageSchema } from '../../types/index'
import { SharedBanner } from '../shared/SharedBanner'
import SharedTitle from '../shared/SharedTitle'
import { PageContent } from '../shared/SharedPageContent'
import { Breadcrumbs } from '@/core/Breadcrumbs/Breadcrumbs'

type TopicPageProps = {
  data: TopicPageSchema
}

const TopicPage = ({ data }: TopicPageProps) => {
  const titleStyles = useSharedTitleStyles(data?.hero?.type, data?.content?.[0])
  const { breadcrumbs } = data

  return (
    <main className="flex flex-col [:not(:has(.sticky-menu))]:pt-topbar">
      {data.isCampaign ? (
        <h1 className="sr-only">{toPlainText(data.title)}</h1>
      ) : (
        <SharedBanner title={data.title} hero={data.hero} captionBg={titleStyles.background?.backgroundColor} />
      )}
      {breadcrumbs && breadcrumbs?.enableBreadcrumbs && (
        <Breadcrumbs
          designOptions={{ background: titleStyles.background ?? {} }}
          slug={data?.slug}
          useCustomBreadcrumbs={breadcrumbs?.useCustomBreadcrumbs}
          defaultBreadcrumbs={breadcrumbs?.defaultBreadcrumbs}
          customBreadcrumbs={breadcrumbs?.customBreadcrumbs}
          className={data?.hero?.type === HeroTypes.DEFAULT ? 'pt-0' : ''}
        />
      )}

      {data?.hero?.type !== HeroTypes.DEFAULT && !data?.isCampaign && (
        <SharedTitle sharedTitle={data.title} background={titleStyles.background} />
      )}
      {<PageContent data={data} titleBackground={titleStyles} />}
    </main>
  )
}

export default TopicPage
