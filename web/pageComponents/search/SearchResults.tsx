import { Tabs } from '@components'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { Index, useHits } from 'react-instantsearch-hooks-web'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Flags } from '../../common/helpers/datasetHelpers'
import { getIsoFromLocale } from '../../lib/localization' // grrr ../
import { Pagination } from '../shared/search/pagination/Pagination'
import { PaginationContextProvider } from '../shared/search/pagination/PaginationContext'
import EventHit from './EventHit'
import Hits from './Hits'
import MagazineHit from './MagazineHit'
import NewsHit from './NewsHit'
import NumberOfHits from './NumberOfHits'
import { SearchContext } from './SearchContext'
import TopicHit from './TopicHit'
import TotalResultsStat from './TotalResultsStat'

const Results = styled.div`
  margin-top: var(--space-xLarge);
`

const StyledPagination = styled(Pagination)`
  margin-top: var(--space-xLarge);
  justify-content: center;
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

const SearchResults = () => {
  const router = useRouter()
  //const replaceUrl = useRouterReplace()
  const { results } = useHits()
  const [currentTab, setCurrentTab] = useState<string>((router.query.tab as string) || 'topics')

  const { userTyped } = useContext(SearchContext)
  const [userClicked, setUserClicked] = useState(false)
  const [tabResults, setTabResults] = useState<Record<string, boolean>>({
    topics: false,
    events: false,
    news: false,
    magazine: false,
  })

  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!userTyped) return
    const tabWithHits = Object.keys(tabResults).find((key) => tabResults[key])
    if (tabWithHits && !userClicked) {
      setCurrentTab(tabWithHits)
    }
  }, [userTyped, tabResults, userClicked])

  // state to route
  useEffect(() => {
    router.replace(
      {
        query: {
          ...router.query,
          tab: router.query.query ? currentTab : '',
        },
      },
      undefined,
      { shallow: true },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, router.query.query])

  const handleTabChange = (index: number) => {
    setUserClicked(true)
    const activeTab = tabMap.find((tab) => tab.id === index)
    if (activeTab) {
      setCurrentTab(activeTab.name)
    }
  }

  const isoCode = getIsoFromLocale(router.locale)

  const hasQuery = results && results.query !== ''

  // @TODO How can we make this robust?
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'

  const activeTab = tabMap.find((tab) => tab.name === currentTab)

  return (
    <PaginationContextProvider defaultRef={resultsRef}>
      {hasQuery && (
        <Results ref={resultsRef}>
          <Tabs index={activeTab?.id || 0} onChange={handleTabChange}>
            <TabList>
              <Tab inverted>
                <TabText>
                  <FormattedMessage id="search_topics_tab" defaultMessage="Topics" />
                  <NumberOfHits />
                </TabText>
              </Tab>
              <Tab inverted>
                <Index indexName={`${envPrefix}_EVENTS_${isoCode}`} indexId={`${envPrefix}_EVENTS_${isoCode}`}>
                  <TabText>
                    <FormattedMessage id="search_events_tab" defaultMessage="Events" />
                    <NumberOfHits />
                  </TabText>
                </Index>
              </Tab>
              <Tab inverted>
                <Index indexName={`${envPrefix}_NEWS_${isoCode}`} indexId={`${envPrefix}_NEWS_${isoCode}`}>
                  <TabText>
                    <FormattedMessage id="search_news_tab" defaultMessage="News" />
                    <NumberOfHits />
                  </TabText>
                </Index>
              </Tab>
              <Tab inverted>
                <Index indexName={`${envPrefix}_MAGAZINE_${isoCode}`} indexId={`${envPrefix}_MAGAZINE_${isoCode}`}>
                  <TabText>
                    <FormattedMessage id="search_magazine_tab" defaultMessage="Magazine" />
                    <NumberOfHits />
                  </TabText>
                </Index>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                <Hits setTabResults={setTabResults} hitComponent={TopicHit} category="topics" />
                <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
              </TabPanel>
              <TabPanel>
                <Index indexName={`${envPrefix}_EVENTS_${isoCode}`} indexId={`${envPrefix}_EVENTS_${isoCode}`}>
                  <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                  <Hits setTabResults={setTabResults} hitComponent={EventHit} category="events" />
                  <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
                </Index>
              </TabPanel>
              <TabPanel>
                <Index indexName={`${envPrefix}_NEWS_${isoCode}`} indexId={`${envPrefix}_NEWS_${isoCode}`}>
                  <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                  <Hits setTabResults={setTabResults} hitComponent={NewsHit} category="news" />
                  <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
                </Index>
              </TabPanel>
              {Flags.IS_DEV && (
                <TabPanel>
                  <Index indexName={`${envPrefix}_MAGAZINE_${isoCode}`} indexId={`${envPrefix}_MAGAZINE_${isoCode}`}>
                    <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                    <Hits setTabResults={setTabResults} hitComponent={MagazineHit} category="magazine" />
                    <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
                  </Index>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </Results>
      )}
    </PaginationContextProvider>
  )
}

export default SearchResults
