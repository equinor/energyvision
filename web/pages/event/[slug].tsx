import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Layout } from '../../pageComponents/shared/Layout'
import { eventQuery, eventSlugsQuery } from '../../lib/queries/event'
import { usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import { menuQuery } from '../../lib/queries/menu'
import { footerQuery } from '../../lib/queries/footer'
import PageHeader from '../../pageComponents/shared/Header'
import { mapLocaleToLang } from '../../lib/localization'
import { SkipNavContent } from '@reach/skip-nav'
import { TitleBlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import IFrame from '../../pageComponents/shared/IFrame'
import RelatedContent from '../../pageComponents/news/RelatedContent'
import type { AppProps } from 'next/app'
import type { EventSchema } from '../../types/types'

type EventProps = {
  data: {
    event: EventSchema
    slugs: {
      en_GB: string
      nb_NO: string
    }
  }
  preview: boolean
}

export default function Event({ data, preview }: EventProps): JSX.Element {
  const router = useRouter()
  const slug = data?.event?.slug

  if (!data) {
    return <ErrorPage statusCode={418} />
  }

  const {
    data: { event },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = usePreviewSubscription(eventQuery, {
    params: { slug },
    initialData: data,
    enabled: preview || router.query.preview !== null,
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const { title, location, ingress, content, iframe, relatedLinks } = data.event

  return (
    <>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        <main>
          <article>
            {title && (
              <SimpleBlockContent
                blocks={title}
                serializers={{
                  types: {
                    block: (props) => <TitleBlockRenderer level="h1" size="2xl" {...props} />,
                  },
                }}
              />
            )}

            {location && (
              <div>
                <p>{location}</p>
              </div>
            )}

            {ingress && (
              <div>
                <SimpleBlockContent blocks={ingress}></SimpleBlockContent>
              </div>
            )}

            {content && (
              <div>
                <SimpleBlockContent blocks={content}></SimpleBlockContent>
              </div>
            )}

            {iframe && <IFrame data={iframe} />}

            {relatedLinks?.links && relatedLinks.links.length > 0 && (
              <div>
                <RelatedContent data={relatedLinks} />
              </div>
            )}
          </article>
        </main>
      )}
    </>
  )
}

// eslint-disable-next-line react/display-name
Event.getLayout = (page: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { preview, data } = props
  const slugs = data?.slugs

  return (
    <Layout footerData={data?.footerData} preview={preview}>
      <PageHeader slugs={slugs} data={data?.menuData} />

      <SkipNavContent />
      {page}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale = 'en' }) => {
  const { event } = await getClient(preview).fetch(eventQuery, {
    slug: params?.slug,
    lang: mapLocaleToLang(locale),
  })

  const menuData = await getClient(preview).fetch(menuQuery, { lang: mapLocaleToLang(locale) })
  const footerData = await getClient(preview).fetch(footerQuery, { lang: mapLocaleToLang(locale) })

  return {
    props: {
      preview,
      data: {
        event,
        slugs: null,
        menuData,
        footerData,
      },
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(eventSlugsQuery)
  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  }
}
