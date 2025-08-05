'use client'
import { HeroTypes, MagazinePageSchema } from '../../types/index'
import Teaser from '../../sections/teasers/Teaser/Teaser'
import useSharedTitleStyles from '../../lib/hooks/useSharedTitleStyles'
import MagazineTagBar from '@/sections/MagazineTags/MagazineTagBar'
import { SharedBanner } from '../shared/SharedBanner'
import SharedTitle from '../shared/SharedTitle'
import { PageContent } from '../shared/SharedPageContent'

type MagazinePageProps = {
  data: MagazinePageSchema
}

const MagazinePage = ({ data }: MagazinePageProps) => {
  const { hideFooterComponent, footerComponent, tags } = data
  const titleStyles = useSharedTitleStyles(data?.hero?.type, data?.content?.[0])

  return (
      <main>
        <SharedBanner
          title={data?.title}
          hero={data?.hero}
          hideImageCaption={true}
          {...(data.hero.type === HeroTypes.DEFAULT && {
            tags: tags,
          })}
        />
        {data?.magazineTags && <MagazineTagBar tags={data?.magazineTags} />}
        {data.hero.type !== HeroTypes.DEFAULT && (
          <SharedTitle sharedTitle={data.title} background={titleStyles.background} />
        )}
        {data.hero.type !== HeroTypes.DEFAULT && (
          <div className="max-w-viewport px-layout-lg mx-auto pb-6">
            {tags && tags?.length > 0 && (
              <ul className="flex flex-wrap gap-y-4 divide-x-2 divide-energy-red-100">
                {tags.map((tag: string) => {
                  return (
                    <li
                      key={`magazine_tag_key_${tag}`}
                      className="inline-block text-sm font-medium pl-3 pr-3 first:pl-0 lg:text-xs whitespace-nowrap"
                    >
                      {tag}
                    </li>
                  )
                })}
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
