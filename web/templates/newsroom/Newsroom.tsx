import Blocks from '../../pageComponents/shared/portableText/Blocks'
import type { NewsRoomPageType } from '../../types'
import { Heading, Typography } from '@core/Typography'
import { FormattedDate } from '@components/FormattedDateTime'
import TopicSwitch from '@templates/newsroom/TopicSwitch/TopicSwitch'
import { forwardRef, useEffect, useState } from 'react'
import NewsRoomFilters from './NewsroomFilters'
import PageSections from '@sections/PageSections/PageSections'
import { getData, getNewsroomData } from '../../lib/fetchData'
import { ReadMoreLink } from '@core/Link'
import { getNewsByCountryAndOrTopicAndOrYear } from 'lib/queries/newsroom'
import { FilterProvider } from './FilterContext'
import { getNameFromLocale } from 'lib/localization'

type NewsRoomTemplateProps = {
  isServerRendered?: boolean
  locale?: string
  pageData?: NewsRoomPageType | undefined
  slug?: string
  url?: string
}

const NewsRoomTemplate = forwardRef<HTMLElement, NewsRoomTemplateProps>(function NewsRoomTemplate(
  { isServerRendered, locale, pageData, slug, url, ...rest },
  ref,
) {
  const {
    ingress,
    title,
    newsList = [],
    newsTopicTagList,
    newsCountryTagList,
    seoAndSome,
    subscriptionHeading,
    subscriptionLink,
    subscriptionLinkTitle,
    localNewsPagesHeading,
    localNewsPages,
  } = pageData || {}

  const [filteredNewsList, setFilteredNewsList] = useState(newsList)

  const handleChange = async (selectedTopics: any, selectedCountries: any, selectedYears: any) => {
    const results = await getNewsroomData({
      query: getNewsByCountryAndOrTopicAndOrYear,
      queryParams: {
        lang: getNameFromLocale(locale),
        tags: selectedTopics,
        countryTags: selectedCountries,
      },
    })
    console.log('fetch new data results', results)
    setFilteredNewsList(results)
  }

  return (
    <main ref={ref} className="px-layout-sm">
      <div className="w-2/3">
        <Heading value={title} variant="h1" />
        <div className="border-y border-autumn-storm-40 py-4">
          <FormattedDate
            suppressHydrationWarning
            datetime={new Date().toLocaleString()}
            weekday="long"
            day="numeric"
            year="numeric"
            month="long"
          />
        </div>
      </div>
      {ingress && <Blocks value={ingress} />}
      <div className="grid grid-cols-[22vw_auto] gap-12 mt-12">
        <FilterProvider onChange={handleChange}>
          <aside className="flex flex-col gap-6 pt-8">
            <TopicSwitch topics={newsTopicTagList} />
            {subscriptionLink?.href && subscriptionHeading && (
              <div className="bg-spruce-wood-100 px-8 py-6">
                <Typography as="h2" variant="h6" className="font-medium pb-4">
                  {subscriptionHeading}
                </Typography>
                <ReadMoreLink href={subscriptionLink.href}>{subscriptionLinkTitle}</ReadMoreLink>
              </div>
            )}
            {localNewsPages && localNewsPages?.length > 0 && localNewsPagesHeading && (
              <div className="bg-moss-green-50 px-8 py-6">
                <Typography as="h2" variant="h6" className="font-medium pb-4">
                  {localNewsPagesHeading}
                </Typography>
                {localNewsPages?.map((localNewsPage) => {
                  return (
                    <ReadMoreLink key={localNewsPage.id} href={localNewsPage.href}>
                      {localNewsPage?.label}
                    </ReadMoreLink>
                  )
                })}
              </div>
            )}
          </aside>
          <div>
            <NewsRoomFilters newsCountryTagList={newsCountryTagList} />
            {filteredNewsList?.length > 0 && <PageSections items={filteredNewsList} />}
            {filteredNewsList?.length === 0 && <div>Sorry, no news found</div>}
          </div>
        </FilterProvider>
      </div>
    </main>
  )
})

export default NewsRoomTemplate
