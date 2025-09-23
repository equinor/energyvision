'use client'
import { HeroTypes, MagazinePageSchema } from '../../types/index'
import Teaser from '../../sections/teasers/Teaser/Teaser'
import useSharedTitleStyles from '../../lib/hooks/useSharedTitleStyles'
import { SharedBanner } from '../shared/SharedBanner'
import SharedTitle from '../shared/SharedTitle'
import { PageContent } from '../shared/SharedPageContent'
import MagazineTagBar from '@/sections/MagazineTags/MagazineTagBar'

type MagazinePageProps = {
  data: MagazinePageSchema
}

const MagazinePage = ({ data }: MagazinePageProps) => {
  const { hideFooterComponent, footerComponent } = data || {}
  const tags = (data?.tags as string[] | undefined) ?? []
  const heroType = data?.hero?.type
  const titleStyles = useSharedTitleStyles(heroType, data?.content?.[0])

  return (
    <main className="flex flex-col [:not(:has(.sticky-menu))]:pt-topbar">
      <SharedBanner
        title={data?.title}
        hero={data?.hero}
        hideImageCaption={true}
        {...(heroType === HeroTypes.DEFAULT ? { tags } : {})}
      />
      {data?.magazineTags && <MagazineTagBar tags={data?.magazineTags} />}
      {heroType !== HeroTypes.DEFAULT && <SharedTitle sharedTitle={data?.title} background={titleStyles.background} />}
      {heroType !== HeroTypes.DEFAULT && (
        <div className="mx-auto px-layout-lg pb-6">
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-y-4 divide-x-2 divide-energy-red-100">
              {tags.map((tag) => (
                <li
                  key={`magazine_tag_key_${tag}`}
                  className="inline-block pr-3 pl-3 text-sm font-medium whitespace-nowrap first:pl-0 lg:text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <PageContent data={data} />
      {!hideFooterComponent && footerComponent?.data && <Teaser data={footerComponent.data} />}
    </main>
  )
}

export default MagazinePage
