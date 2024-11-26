import { forwardRef, useRef, useState } from 'react'
import Blocks from '../../../pageComponents/shared/portableText/Blocks'
import type { NewsRoomNewsItem, NewsRoomPageType } from '../../../types'
import { Heading, Typography } from '@core/Typography'
import { ResourceLink } from '@core/Link'
import Seo from '../../../pageComponents/shared/Seo'
import { FormattedMessage, useIntl } from 'react-intl'
import { List } from '@core/List'
import { PaginationContextProvider } from '../../../common/contexts/PaginationContext'
import NewsSectionsSanity from './NewsSectionsSanity'
import { stringify } from 'querystring'
import { useRouter } from 'next/router'
import { SimplePagination } from '@core/SimplePagination/SimplePagination'
import NewsSectionsSkeleton from '../NewsSections/NewsSectionsSkeleton'
import { getNameFromLocale } from '../../../lib/localization'

type NewsRoomTemplateProps = {
  isServerRendered?: boolean
  locale?: string
  pageData?: NewsRoomPageType | undefined
  slug?: string
  url?: string
}

const NewsRoomTemplateSanity = forwardRef<HTMLElement, NewsRoomTemplateProps>(function NewsRoomTemplateSanity(
  { pageData, slug },
  ref,
) {
  const {
    newsArticles = [],
    ingress,
    title,
    seoAndSome,
    subscriptionLink,
    subscriptionLinkTitle,
    localNewsPages,
    fallbackImages,
  } = pageData || {}

  console.log('localNewsPages', localNewsPages)
  const intl = useIntl()
  const router = useRouter()
  const { locale } = router
  const resultsRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastId, setLastId] = useState(newsArticles?.length > 0 ? newsArticles[newsArticles?.length - 1]?.id : null)
  const [firstId, setFirstId] = useState(newsArticles?.length > 0 ? newsArticles[0]?.id : null)
  const [firstPublished, setFirstPublished] = useState(
    newsArticles?.[0]?.firstPublishedAt ?? newsArticles?.[0]?.publishDateTime ?? null,
  )
  const [lastPublished, setLastPublished] = useState(
    newsArticles?.[newsArticles?.length - 1]?.firstPublishedAt ??
      newsArticles?.[newsArticles?.length - 1]?.publishDateTime ??
      null,
  )
  const filterCrudeAssays = (list: NewsRoomNewsItem[]) => {
    return list?.filter((item: NewsRoomNewsItem) => item?.tags?.some((tag: any) => tag.key !== 'crude-oil-assays'))
  }
  const [newsList, setNewsList] = useState(filterCrudeAssays(newsArticles) ?? [])

  const setSearchStates = (filteredNews: any) => {
    setNewsList(filterCrudeAssays(filteredNews))
    setFirstId(filteredNews?.length > 0 ? filteredNews[0].id : null)
    setLastId(filteredNews?.length > 0 ? filteredNews[filteredNews.length - 1].id : null)
    setFirstPublished(
      filteredNews?.length > 0 ? filteredNews[0]?.firstPublishedAt ?? filteredNews[0]?.publishDateTime : null,
    )
    setLastPublished(
      filteredNews?.length > 0
        ? filteredNews[filteredNews?.length - 1]?.firstPublishedAt ??
            filteredNews[filteredNews?.length - 1]?.publishDateTime
        : null,
    )
  }

  const getNextNews = async () => {
    setIsLoading(true)
    const query = {
      lang: getNameFromLocale(locale),
      lastId: lastId,
      lastPublishedAt: lastPublished,
    }
    const urlParams = stringify(query)
    const res = await fetch(`/api/news/next?${urlParams}`)
    let filteredNews = []
    try {
      const response = await res.json()
      filteredNews = response.news
    } catch (e) {
      console.log('Error', e)
    }
    setSearchStates(filteredNews)
    setIsLoading(false)
  }
  const getPreviousNews = async () => {
    setIsLoading(true)
    const query = {
      lang: getNameFromLocale(locale),
      lastId: firstId,
      lastPublishedAt: firstPublished,
    }
    const urlParams = stringify(query)
    const res = await fetch(`/api/news/prev?${urlParams}`)
    let filteredNews = []
    try {
      const response = await res.json()
      filteredNews = response.news
    } catch (e) {
      console.log('Error', e)
    }
    setSearchStates(filteredNews)
    setIsLoading(false)
  }

  return (
    <PaginationContextProvider defaultRef={resultsRef}>
      <Seo seoAndSome={seoAndSome} slug={slug} pageTitle={title} />
      <main ref={ref} className="">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="bg-slate-blue-95 dark py-24">
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] mx-auto px-layout-sm max-w-viewport">
              {title && <Heading value={title} as="h1" variant="h2" className="lg:col-span-2" />}
              {ingress && <Blocks value={ingress} />}
              <div className="w-full flex flex-col gap-8 items-center">
                <List
                  role="navigation"
                  className="max-lg:w-full"
                  listClassName={'list-none'}
                  aria-label={intl.formatMessage({
                    id: 'newsroom_related_links',
                    defaultMessage: 'Related links',
                  })}
                >
                  <List.Item className="w-full">
                    {subscriptionLink?.slug && (
                      <ResourceLink href={subscriptionLink.slug} className="w-full">
                        {subscriptionLinkTitle}
                      </ResourceLink>
                    )}
                  </List.Item>
                  {localNewsPages &&
                    localNewsPages?.length > 0 &&
                    localNewsPages?.map((localNewsPage) => {
                      return localNewsPage?.link?.slug || localNewsPage?.href ? (
                        <List.Item key={localNewsPage.id} className="w-full">
                          <ResourceLink
                            type={localNewsPage.type}
                            href={localNewsPage?.link?.slug || (localNewsPage?.href as string)}
                            className="w-full"
                          >
                            {localNewsPage?.label}
                          </ResourceLink>
                        </List.Item>
                      ) : null
                    })}
                </List>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-8 pb-12 lg:px-layout-md mx-auto max-w-viewport">
            <div className="flex flex-col max-lg:px-4">
              <Typography id="newsroom_news" as="h2" className="sr-only">
                <FormattedMessage id="newsroom_newslist_header" defaultMessage="News" />
              </Typography>
              {isLoading ? (
                <NewsSectionsSkeleton />
              ) : (
                <>
                  <NewsSectionsSanity newslist={newsList} fallbackImages={fallbackImages} />
                  <SimplePagination
                    onNextPage={getNextNews}
                    onPreviousPage={getPreviousNews}
                    isFirstPage={!firstId}
                    isLastPage={!lastId}
                    className="w-full justify-center py-12"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </PaginationContextProvider>
  )
})

export default NewsRoomTemplateSanity
