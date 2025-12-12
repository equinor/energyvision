import { useInfo } from '@/contexts/infoContext'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { getNameFromIso } from '@/sanity/localization'

type Params = Promise<{ locale: string }>

async function getLocalNewsTags(locale: string) {
  // Data fetched here is cached and deduped by Next.js automatically
  const localNewsTagsData = await sanityFetch({
    query: `*[_type == 'localNewsTag']{${getNameFromIso(locale)}}`,
    tags: ['localNewsTag'],
  })
  return (
    localNewsTagsData
      .map((e: any) => Object.values(e))
      //@ts-ignore:todo
      .flatMap(([e]) => e.toLowerCase().replace(' ', '-'))
  )
}

// Local news seems to only fall under english route /news....
export default async function AllNewsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { locale } = await params
  const { localNewsTags, storeLocalNewsTags } = useInfo()
  if (!localNewsTags || typeof localNewsTags === 'undefined') {
    //Only fetch if not already set
    const localTags = await getLocalNewsTags(locale)
    if (localTags?.length > 0) {
      storeLocalNewsTags(localTags)
    }
  }

  return children
}
