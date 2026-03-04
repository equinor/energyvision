import { map } from 'rxjs'
import { getDraftId } from 'sanity'
import type { DocumentLocationResolver } from 'sanity/presentation'
import blocksToText from '@/helpers/blocksToText'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import { getIdFromName, getLocaleFromName } from '../src/lib/localization'

export const locations: DocumentLocationResolver = (params, context) => {
  // Set up locations for page documents
  console.log('params', params)
  let query = null
  console.log('params.type', params.type)
  if (params.type === 'page' || params?.type === 'event') {
    console.log('return page or event query')
    query = {
      fetch: `*[_id==$id][0]{
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
  } else {
    //pages with slugs on them
    query = {
      fetch: `*[_id==$id][0]{
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
        console.log('doc', doc)
        // If the document doesn't exist or have a slug, return null
        if (
          !doc ||
          (doc?._type === 'homePage' &&
            !doc?.isActive &&
            doc?.translationSlugs?.length < 1) ||
          (doc?._type !== 'homePage' && doc?.translationSlugs?.length < 1)
        ) {
          return null
        }

        let locs = []
        if (doc?.translationSlugs?.length > 0) {
          locs = doc?.translationSlugs?.map((translation: any) => {
            console.log('loc translationm', translation)
            const locale = getLocaleFromName(translation?.lang)
            return {
              title: `${blocksToText(translation?.title)}`,
              href: `${translation?.lang !== 'en_GB' ? `/${locale}` : ''}${translation?.slug}`,
            }
          })
        } else if (doc?._type === 'homePage' && doc?.isActive) {
          locs = doc?.translationSlugs?.map((item: any) => {
            const itemLocale = getLocaleFromName(item?.lang)
            const localeId = capitalizeFirstLetter(getIdFromName(item?.lang))
            return {
              title: `${localeId} homepage`,
              href: `${item?.lang !== 'en_GB' ? `/${itemLocale}` : '/'}`,
            }
          })
        } else {
          const locale = getLocaleFromName(doc?.lang)
          locs = [
            {
              title: doc.title || 'Untitled',
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
