import styled from 'styled-components'
import { useRouter } from 'next/router'
import MagazineTagBar from '../shared/MagazineTagBar'

import { PageContent } from './shared/SharedPageContent'
import { MagazinePageSchema } from '../../types/types'
import { SharedBanner } from './shared/SharedBanner'
import Teaser from '../shared/Teaser'
import Seo from '../../pageComponents/shared/Seo'

const MagazinePageLayout = styled.main`
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

type MagazinePageProps = {
  data: MagazinePageSchema
}

const MagazinePage = ({ data }: MagazinePageProps) => {
  const router = useRouter()
  const parentSlug =
    (router.locale !== router.defaultLocale ? `/${router.locale}` : '') +
    router.asPath.substring(router.asPath.indexOf('/'), router.asPath.lastIndexOf('/'))
  const magazineTags = data?.magazineTags
  const tags = magazineTags?.map((it) => {
    return {
      label: it,
      active: false,
    }
  })

  const { hideFooterComponent, footerComponent } = data

  return (
    <>
      <Seo seoAndSome={data?.seoAndSome} slug={data?.slug} heroImage={data?.heroImage?.image} pageTitle={data?.title} />
      <MagazinePageLayout>
        <SharedBanner data={data} />
        {tags && (
          <MagazineTagBar
            tags={tags}
            defaultActive={false}
            href={parentSlug}
            onClick={(tagValue) => {
              router.push({
                pathname: parentSlug,
                query: {
                  tag: tagValue === 'ALL' ? '' : tagValue,
                },
              })
            }}
          />
        )}
        <PageContent data={data} />
        {!hideFooterComponent && footerComponent?.data && <Teaser data={footerComponent.data} />}
      </MagazinePageLayout>
    </>
  )
}

export default MagazinePage
