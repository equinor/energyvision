import styled from 'styled-components'
import { useRouter } from 'next/router'
import MagazineTagBar from '../shared/MagazineTagBar'
import { PageContent } from './shared/SharedPageContent'
import SharedTitle from './shared/SharedTitle'
import { HeroTypes, MagazinePageSchema } from '../../types/types'
import { SharedBanner } from './shared/SharedBanner'
import Teaser from '../shared/Teaser'
import Seo from '../../pageComponents/shared/Seo'
import useSharedTitleStyles from '../../lib/hooks/useSharedTitleStyles'

const MagazinePageLayout = styled.main`
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
    > div:first-child {
      /*  padding-top: calc(var(--space-3xLarge) / 2); */
      padding-top: 0;
    }
  }
`
type MagazinePageProps = {
  data: MagazinePageSchema
}

const MagazinePage = ({ data }: MagazinePageProps) => {
  const router = useRouter()
  const parentSlug =
    (router.locale !== router.defaultLocale ? `/${router.locale}` : '') +
    router.asPath.substring(router.asPath.indexOf('/'), router.asPath.lastIndexOf('/'))
  const magazineTags = data?.magazineTags
  const tags = magazineTags?.map((it) => ({
    label: it,
    active: false,
  }))

  const { hideFooterComponent, footerComponent } = data

  const titleStyles = useSharedTitleStyles(data?.hero?.type, data?.content?.[0])

  const handleClickTag = (tagValue: string) => {
    router.push({
      pathname: parentSlug,
      query: {
        tag: tagValue === 'ALL' ? '' : tagValue,
      },
    })
  }

  return (
    <>
      <Seo
        seoAndSome={data?.seoAndSome}
        slug={data?.slug}
        heroImage={data?.hero?.figure?.image}
        pageTitle={data?.title}
      />
      <MagazinePageLayout>
        <SharedBanner title={data?.title} hero={data?.hero} hideImageCaption={true} />
        {tags && <MagazineTagBar tags={tags} defaultActive={false} href={parentSlug} onClick={handleClickTag} />}
        {data.hero.type !== HeroTypes.DEFAULT && <SharedTitle title={data.title} styles={titleStyles} />}
        <PageContent data={data} />
        {!hideFooterComponent && footerComponent?.data && <Teaser data={footerComponent.data} />}
      </MagazinePageLayout>
    </>
  )
}

export default MagazinePage
