import { defineQuery } from 'next-sanity'

export const topicRoutesForLocale = defineQuery(`
*[_type match "route_" + $lang && defined(slug.current)][] {
      _updatedAt,
      "slug": slug.current,
    }
`)
export const topicRoutesForLocaleToStaticallyBuild = defineQuery(`
*[_type match "route_" + $lang && includeInBuild && defined(slug.current)][] {
      _updatedAt,
      "slug": slug.current,
    }
`)
