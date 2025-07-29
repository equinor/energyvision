'use client'

import { HeroTypes, MagazinePageSchema } from '../../types/index'
import Teaser from '../../sections/teasers/Teaser/Teaser'
import Seo from '../../pageComponents/shared/Seo'
import useSharedTitleStyles from '../../lib/hooks/useSharedTitleStyles'
import MagazineTagBar from '@/sections/MagazineTags/MagazineTagBar'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { SharedBanner } from '../shared/SharedBanner'
import SharedTitle from '../shared/SharedTitle'
import { PageContent } from '../shared/SharedPageContent'

type MagazinePageProps = {
  data: MagazinePageSchema
}

const MagazinePage = ({ data }: MagazinePageProps) => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const parentSlug = locale + pathname.substring(pathname.indexOf('/'), pathname.lastIndexOf('/'))

  const { hideFooterComponent, footerComponent, tags } = data

  const titleStyles = useSharedTitleStyles(data?.hero?.type, data?.content?.[0])

  const handleClickTag = (tagValue: string) => {
    if (tagValue === 'ALL') {
      delete router.query.filter
      router.push({
        pathname: parentSlug,
      })
    } else {
      router.push({
        pathname: parentSlug,
        query: {
          tag: tagValue,
        },
      })
    }
  }

  return (
    <>
      <Seo
        seoAndSome={data?.seoAndSome}
        slug={data?.slug}
        heroImage={data?.hero?.figure?.image}
        pageTitle={data?.title}
      />
      <main>
        <SharedBanner
          title={data?.title}
          hero={data?.hero}
          hideImageCaption={true}
          {...(data.hero.type === HeroTypes.DEFAULT && {
            tags: tags,
          })}
        />
        {data?.magazineTags && <MagazineTagBar tags={data?.magazineTags} href={parentSlug} onClick={handleClickTag} />}
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
    </>
  )
}

export default MagazinePage
