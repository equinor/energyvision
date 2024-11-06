import { useRouter } from 'next/router'
import { PageContent } from '../../pageComponents/pageTemplates/shared/SharedPageContent'
import SharedTitle from '../../pageComponents/pageTemplates/shared/SharedTitle'
import { HeroTypes, MagazinePageSchema } from '../../types/index'
import { SharedBanner } from '../../pageComponents/pageTemplates/shared/SharedBanner'
import Teaser from '../../pageComponents/shared/Teaser'
import Seo from '../../pageComponents/shared/Seo'
import useSharedTitleStyles from '../../lib/hooks/useSharedTitleStyles'
import MagazineTagBar from '@sections/MagazineTags/MagazineTagBar'

type MagazinePageProps = {
  data: MagazinePageSchema
}

const MagazinePage = ({ data }: MagazinePageProps) => {
  const router = useRouter()
  const parentSlug =
    (router.locale !== router.defaultLocale ? `/${router.locale}` : '') +
    router.asPath.substring(router.asPath.indexOf('/'), router.asPath.lastIndexOf('/'))

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
              <ul className="flex items-center divide-x-2 divide-energy-red-100">
                {tags.map((tag: string) => {
                  return (
                    <span
                      key={`magazine_tag_key_${tag}`}
                      className="inline-block text-sm font-medium pl-3 pr-3 first:pl-0 lg:text-xs"
                    >
                      {tag}
                    </span>
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
