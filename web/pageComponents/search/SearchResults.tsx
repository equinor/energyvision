import { Tabs } from '@components'
import { RefObject, useContext, useEffect, useState } from 'react'
import { Index, useHits } from 'react-instantsearch-hooks-web'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Flags } from '../../common/helpers/datasetHelpers'
import { getIsoFromLocale } from '../../lib/localization' // grrr ../
import EventHit from './EventHit'
import Hits from './Hits'
import MagazineHit from './MagazineHit'
import NewsHit from './NewsHit'
import NumberOfHits from './NumberOfHits'
import { SearchContext } from './SearchContext'
import TopicHit from './TopicHit'
import TotalResultsStat from './TotalResultsStat'
import { useConnector, AdditionalWidgetProperties } from 'react-instantsearch-hooks-web'
import connectSortBy, {
  SortByConnectorParams,
  SortByWidgetDescription,
} from 'instantsearch.js/es/connectors/sort-by/connectSortBy'

export type UseSortByProps = SortByConnectorParams

export function useSortBy(props: UseSortByProps, additionalWidgetProperties: AdditionalWidgetProperties) {
  // eslint-disable-next-line
  // @ts-ignore: @TODO: The types are not correct
  return useConnector<SortByConnectorParams, SortByWidgetDescription>(connectSortBy, props, additionalWidgetProperties)
}

const Results = styled.div`
  margin-top: var(--space-xLarge);
`

const TabText = styled.span`
  font-size: var(--typeScale-05);
`
const { Tab, TabList, TabPanel, TabPanels } = Tabs

// Sven: I don't understand how we can revieve this number, it's configured
// in the Configure component, so how could we get it from there
const HITS_PER_PAGE = 5

// @TODO How should we do this
// What  about translations if we have Norwegian urls
// is it better to use like tc and e instead? Doesn't feel safe to use text snippet that
// can be changed here
const tabMap = [
  { id: 0, name: 'topics' },
  { id: 1, name: 'events' },
  { id: 2, name: 'news' },
  { id: 3, name: 'magazine' },
]

type SearchResultsProps = {
  locale?: string
  resultsRef: RefObject<HTMLDivElement> | undefined
} & UseSortByProps
const SearchResults = (props: SearchResultsProps) => {
  const { locale, resultsRef } = props
  const { refine, currentRefinement } = useSortBy(props, {
    $$widgetType: 'energyvision.switch-index',
  })
  const isoCode = getIsoFromLocale(locale)
  const getTabFromIndex = (index: string) => {
    return index.replaceAll(isoCode, '').replaceAll(envPrefix, '').replaceAll('_', '').toLowerCase()
  }
  const getIndexFromTab = (tab: string) => {
    return `${envPrefix}_${tab.toUpperCase()}_${isoCode}`
  }
  // @TODO How can we make this robust?
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const { results } = useHits()
  const currentTab = getTabFromIndex(currentRefinement)

  const { userTyped } = useContext(SearchContext)
  const [userClicked, setUserClicked] = useState(false)
  const [tabResults, setTabResults] = useState<Record<string, boolean>>({
    topics: false,
    events: false,
    news: false,
    magazine: false,
  })

  useEffect(() => {
    refine(getIndexFromTab(currentTab))
  }, [currentTab])

  useEffect(() => {
    if (!userTyped) return
    const tabWithHits = (
      tabMap.find((tab) =>
        Object.keys(tabResults)
          .filter((key) => tabResults[key])
          .includes(tab.name),
      ) || tabMap[0]
    ).name

    if (tabWithHits && !userClicked) {
      refine(getIndexFromTab(tabWithHits))
    }
  }, [userTyped, tabResults, userClicked])

  const handleTabChange = (index: number) => {
    setUserClicked(true)
    const activeTab = tabMap.find((tab) => tab.id === index)
    if (activeTab) {
      refine(getIndexFromTab(activeTab?.name))
    }
  }

  const hasQuery = results && results.query !== ''
  const activeTab = tabMap.find((it) => it.name === currentTab)
  return (
    <>
      {hasQuery && (
        <Results ref={resultsRef}>
          <Tabs index={activeTab?.id || 0} onChange={handleTabChange}>
            <TabList>
              <Tab inverted>
                <Index indexName={`${envPrefix}_TOPICS_${isoCode}`} indexId={`${envPrefix}_TOPICS_${isoCode}`}>
                  <TabText>
                    <FormattedMessage id="search_topics_tab" defaultMessage="Topics" />
                    <NumberOfHits setTabResults={setTabResults} category="topics" />
                  </TabText>
                </Index>
              </Tab>
              <Tab inverted>
                <Index indexName={`${envPrefix}_EVENTS_${isoCode}`} indexId={`${envPrefix}_EVENTS_${isoCode}`}>
                  <TabText>
                    <FormattedMessage id="search_events_tab" defaultMessage="Events" />
                    <NumberOfHits setTabResults={setTabResults} category="events" />
                  </TabText>
                </Index>
              </Tab>
              <Tab inverted>
                <Index indexName={`${envPrefix}_NEWS_${isoCode}`} indexId={`${envPrefix}_NEWS_${isoCode}`}>
                  <TabText>
                    <FormattedMessage id="search_news_tab" defaultMessage="News" />
                    <NumberOfHits setTabResults={setTabResults} category="news" />
                  </TabText>
                </Index>
              </Tab>
              <Tab inverted>
                <Index indexName={`${envPrefix}_MAGAZINE_${isoCode}`} indexId={`${envPrefix}_MAGAZINE_${isoCode}`}>
                  <TabText>
                    <FormattedMessage id="search_magazine_tab" defaultMessage="Magazine" />
                    <NumberOfHits setTabResults={setTabResults} category="magazine" />
                  </TabText>
                </Index>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                <Hits hitComponent={TopicHit} />
              </TabPanel>
              <TabPanel>
                <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                <Hits hitComponent={EventHit} />
              </TabPanel>
              <TabPanel>
                <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                <Hits hitComponent={NewsHit} />
              </TabPanel>
              <TabPanel>
                <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                <Hits hitComponent={MagazineHit} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Results>
      )}
    </>
  )
}

export default SearchResults
