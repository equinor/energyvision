import { map } from 'rxjs'
import { getDraftId } from 'sanity'
import type { DocumentLocationResolver } from 'sanity/presentation'
import blocksToText from '@/helpers/blocksToText'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import { getIdFromName, getLocaleFromName } from '../src/lib/localization'

export const locations: DocumentLocationResolver = (params, context) => {
  // Set up locations for page documents

  let query = null
  const routePages = [
    'page',
    'landingPage',
    'event',
    'newsroom',
    'magazineIndex',
  ]
  const pagesWithSlugOnThem = ['news', 'magazine']

  if (routePages?.includes(params.type)) {
    query = {
      fetch: `*[_id==$id][0]{
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
  } else if (params.type === 'homePage') {
    query = {
      fetch: `*[_id==$id][0]{
      "isActive": count(*[_type match "route_homepage" && references(^._id)]) > 0,
      "translationSlugs": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      lang,
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
    const pageParams = { id: params.id, draftId: getDraftId(params.id) }

    const doc$ = context.documentStore.listenQuery(
      query,
      pageParams,
      { perspective: 'drafts' }, // returns a draft article if it exists
    )

    // Return a streaming list of locations
    return doc$.pipe(
      map(doc => {
        // If the document doesn't exist or have a slug, return null
        if (
          (!doc &&
            doc?.translationSlugs?.length === 0 &&
            doc?.slugs?.length === 0) ||
          (doc?._type === 'homePage' && !doc?.isActive)
        ) {
          return null
        }

        let locs = []
        if (routePages?.includes(params.type)) {
          if (doc?.translationSlugs?.length > 0) {
            locs = doc?.translationSlugs
              ?.filter(
                (translation: any) =>
                  translation?.slug && doc?.lang === translation?.lang,
              )
              ?.map((translation: any) => {
                const locale = getLocaleFromName(translation?.lang)
                return {
                  title: `${blocksToText(translation?.title)}`,
                  href: `${translation?.lang !== 'en_GB' ? `/${locale}` : ''}${translation?.slug}`,
                }
              })
          } else {
            locs = doc?.slugs
              ?.filter((slug: string) => slug)
              ?.map((slug: string) => {
                const locale = getLocaleFromName(doc?.lang)
                return {
                  title: `${blocksToText(doc?.title)}`,
                  href: `${doc?.lang !== 'en_GB' ? `/${locale}` : ''}${slug}`,
                }
              })
          }
        } else if (doc?._type === 'homePage' && doc?.isActive) {
          locs = doc?.translationSlugs?.map((item: any) => {
            const itemLocale = getLocaleFromName(item?.lang)
            const localeId = capitalizeFirstLetter(getIdFromName(item?.lang))

            return {
              title: `${localeId} homepage`,
              href: `${item?.lang !== 'en_GB' ? `/${itemLocale}` : '/'}`,
            }
          })
        } else if (pagesWithSlugOnThem?.includes(params.type)) {
          const locale = getLocaleFromName(doc?.lang)
          const plainTitle = Array.isArray(doc.title)
            ? blocksToText(doc.title)
            : doc.title
          locs = [
            {
              title: doc.title ? plainTitle : 'Untitled',
              href: `${doc?.lang !== 'en_GB' ? `/${locale}` : ''}${doc?.slug?.current}`,
            },
          ]
        }

        return {
          locations: [...locs],
        }
      }),
    )
  }
  return null
}
