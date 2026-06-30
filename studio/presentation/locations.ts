import { map } from 'rxjs'
import { getDraftId } from 'sanity'
import type { DocumentLocationResolver } from 'sanity/presentation'
import blocksToText from '@/helpers/blocksToText'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import { defaultWebLang } from '@/languages'
import { getIdFromName, getLocaleFromName } from '../src/lib/localization'

export const locations: DocumentLocationResolver = (params, context) => {
  let query = null
  const routePages = ['page', 'event']
  const pagesWithSlugOnThem = [
    'news',
    'magazine',
    'newsroom',
    'magazineIndex',
    'localNews',
  ]

  if (params.type === 'homePage') {
    query = {
      fetch: `*[_id==$id][0]{
      lang,
      "isActive": count(
        *[_type match "route_homepage" && (
          references(
            *[_type == "translation.metadata" && references($id)][0]
              .translations[_key == $defaultLang][0].value._ref
          ) || references($id)
        )]
      ) > 0,
      "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      lang,
      },
      ...
      }
      `,
      listen: `*[_id in [$id,$draftId]]`,
    }
  } else if (routePages?.includes(params.type)) {
    query = {
      fetch: `*[_id==$id][0]{
      lang,
      "slugs": *[_type match "route*" && references(^._id)].slug.current,
      "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      "slug" : *[_type match "route*" && references(^._id)][0].slug.current, 
      lang,
      title,
      },
      ...
      }
      `,
      listen: `*[_id in [$id,$draftId]]`,
    }
  } else if (pagesWithSlugOnThem?.includes(params.type)) {
    //pages with slugs on them
    query = {
      fetch: `*[_id==$id][0]{
      lang,
      "slugs": *[_type match "route*" && references(^._id)][0].slug.current,
    "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      "slug": slug.current,
      lang
    },
      ...}
      `,
      listen: `*[_id in [$id,$draftId]]`,
    }
  }

  if (query) {
    const pageParams = {
      id: params.id,
      draftId: getDraftId(params.id),
      publishedId: params.id.replace(/^drafts\./, ''),
      defaultLang: defaultWebLang?.name,
    }

    const doc$ = context.documentStore.listenQuery(
      query,
      pageParams,
      { perspective: 'drafts' }, // returns a draft article if it exists
    )

    // Return a streaming list of locations
    return doc$.pipe(
      map(doc => {
        // If the document doesn't exist or have a slug, return null
        if (!doc || (doc?._type === 'homePage' && !doc?.isActive)) {
          return null
        }
        console.log('defaultWebLang', defaultWebLang)
        let locs = []
        if (routePages?.includes(params.type)) {
          if (
            doc?.translationSlugs?.filter(
              (translationSlug: any) => translationSlug?.slug,
            )?.length > 0
          ) {
            locs = doc?.translationSlugs
              ?.filter(
                (translation: any) =>
                  translation?.slug && doc?.lang === translation?.lang,
              )
              ?.map((translation: any) => {
                const locale = getLocaleFromName(translation?.lang)
                return {
                  title: `${blocksToText(translation?.title)}`,
                  href: `${translation?.lang !== defaultWebLang?.name ? `${locale}` : ''}${translation?.slug}`,
                }
              })
          } else if (doc?.slugs?.filter((slug: string) => slug)?.length > 0) {
            locs = doc?.slugs
              ?.filter((slug: string) => slug)
              ?.map((slug: string) => {
                const locale = getLocaleFromName(doc?.lang)
                return {
                  title: `${blocksToText(doc?.title)}`,
                  href: `${doc?.lang !== defaultWebLang?.name ? `${locale}` : ''}${slug}`,
                }
              })
          } else {
            locs = [
              {
                title: `${doc?.title ? blocksToText(doc?.title) : 'Untitled'}`,
                href: `/api/draft/preview/${doc?._id}`,
              },
            ]
          }
        } else if (doc?._type === 'homePage' && doc?.isActive) {
          if (!doc?.translationSlugs || doc?.translationSlugs?.length === 0) {
            const localeId = capitalizeFirstLetter(
              getIdFromName(defaultWebLang?.name),
            )
            locs = [
              {
                title: `${localeId} homepage`,
                href: `/`,
              },
            ]
          }
          if (doc?.translationSlugs?.length > 0) {
            locs = doc?.translationSlugs
              ?.filter((item: any) => item?.lang === doc?.lang)
              ?.map((item: any) => {
                const itemLocale = getLocaleFromName(item?.lang)
                const localeId = capitalizeFirstLetter(
                  getIdFromName(item?.lang),
                )
                return {
                  title: `${localeId} homepage`,
                  href: `${item?.lang !== defaultWebLang?.name ? `/${itemLocale}` : '/'}`,
                }
              })
          }
        } else if (pagesWithSlugOnThem?.includes(params.type)) {
          const locale = getLocaleFromName(doc?.lang)
          const plainTitle = Array.isArray(doc.title)
            ? blocksToText(doc.title)
            : doc.title

          locs = [
            {
              title: doc.title ? plainTitle : 'Untitled',
              href: `${doc?.lang !== defaultWebLang?.name ? `${locale}/` : ''}${doc?.slug?.current}`,
            },
          ]
        }

        return {
          locations: locs ?? [],
        }
      }),
    )
  }
  return null
}
