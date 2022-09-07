import { useState, useEffect, useContext } from 'react'
import { Tabs } from '@components'
import { Index, useHits } from 'react-instantsearch-hooks-web'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import NumberOfHits from './NumberOfHitsV2'
import Hits from './Hits'
import EventHit from './EventHit'
import TopicHit from './TopicHit'
import NewsHit from './NewsHit'
import { getIsoFromLocale } from '../../lib/localization' // grrr ../
import { Pagination } from '../shared/search/pagination/Pagination'
import TotalResultsStat from './TotalResultsStat'
import { Flags } from '../../common/helpers/datasetHelpers'
import MagazineHit from './MagazineHit'
import { QueryDispatch } from './SearchV2'

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

const hasHits: Record<string, boolean> = {
  topics: false,
  events: false,
  news: false,
  magazine: false,
}
const SearchResults = () => {
  const router = useRouter()
  const dispatchContext = useContext(QueryDispatch)
  //const replaceUrl = useRouterReplace()
  const { results } = useHits()
  const [firstNonZeroTab, setFirstNonZeroTab] = useState<string>()
  const [currentTab, setCurrentTab] = useState<string>(firstNonZeroTab ? firstNonZeroTab : 'topics')
  // route to state
  useEffect(() => {
    if (router.query.tab && currentTab !== firstNonZeroTab) {
      setCurrentTab(router.query.tab as string)
    }
  }, [router.query.tab])
  // state to route
  useEffect(() => {
    dispatchContext?.dispatch({
      state: {
        tab: currentTab,
      },
      action: 'CHANGED',
    })
    router.replace(
      {
        query: {
          ...router.query,
          tab: currentTab,
        },
      },
      {
        query: {
          ...router.query,
          tab: currentTab,
        },
      },
      {
        shallow: true,
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab])
  useEffect(() => {
    if (firstNonZeroTab && firstNonZeroTab != currentTab) {
      setCurrentTab(firstNonZeroTab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstNonZeroTab])
  const handleTabChange = (index: number) => {
    const activeTab = tabMap.find((tab) => tab.id === index)
    if (activeTab) {
      setCurrentTab(activeTab.name)
    }
  }
  const handleHitsChanged = (hits: boolean, index: string) => {
    hasHits[index] = hits
    if (currentTab != 'topics' && hasHits.topics) {
      setFirstNonZeroTab('topics')
    } else if (currentTab != 'events' && hasHits.events && !hasHits.topics) {
      setFirstNonZeroTab('events')
    } else if (currentTab != 'news' && hasHits.news && !hasHits.topics && !hasHits.events) {
      setFirstNonZeroTab('news')
    } else if (currentTab != 'magazine' && hasHits.magazine && !hasHits.topics && !hasHits.events && !hasHits.news) {
      setFirstNonZeroTab('magazine')
    } else if (!hasHits.topics && !hasHits.events && !hasHits.news && !hasHits.magazine) {
      setFirstNonZeroTab(undefined)
    }
  }
  const isoCode = getIsoFromLocale(router.locale)
  const hasQuery = results && results.query !== ''
  // @TODO How can we make this robust?
  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const activeTab = tabMap.find((tab) => tab.name === currentTab)
  return (
    <>
      {hasQuery && (
        <Results>
          <Tabs index={activeTab?.id || 0} onChange={handleTabChange}>
            <TabList>
              <Tab inverted>
                <TabText>
                  <FormattedMessage id="search_topics_tab" defaultMessage="Topics" />
                  <NumberOfHits onHitsChanged={handleHitsChanged} index="topics" />
                </TabText>
              </Tab>
              <Tab inverted>
                <Index indexName={`${envPrefix}_EVENTS_${isoCode}`} indexId={`${envPrefix}_EVENTS_${isoCode}`}>
                  <TabText>
                    <FormattedMessage id="search_events_tab" defaultMessage="Events" />
                    <NumberOfHits onHitsChanged={handleHitsChanged} index="events" />
                  </TabText>
                </Index>
              </Tab>
              <Tab inverted>
                <Index indexName={`${envPrefix}_NEWS_${isoCode}`} indexId={`${envPrefix}_NEWS_${isoCode}`}>
                  <TabText>
                    <FormattedMessage id="search_news_tab" defaultMessage="News" />
                    <NumberOfHits onHitsChanged={handleHitsChanged} index="news" />
                  </TabText>
                </Index>
              </Tab>
              {Flags.IS_DEV && (
                <Tab inverted>
                  <Index indexName={`${envPrefix}_MAGAZINE_${isoCode}`} indexId={`${envPrefix}_MAGAZINE_${isoCode}`}>
                    <TabText>
                      <FormattedMessage id="search_magazine_tab" defaultMessage="Magazine" />
                      <NumberOfHits onHitsChanged={handleHitsChanged} index="magazine" />
                    </TabText>
                  </Index>
                </Tab>
              )}
            </TabList>
            <TabPanels>
              <TabPanel>
                <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                <Hits hitComponent={TopicHit} category="Topic" />
                <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
              </TabPanel>
              <TabPanel>
                <Index indexName={`${envPrefix}_EVENTS_${isoCode}`} indexId={`${envPrefix}_EVENTS_${isoCode}`}>
                  <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                  <Hits hitComponent={EventHit} category="Event" />
                  <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
                </Index>
              </TabPanel>
              <TabPanel>
                <Index indexName={`${envPrefix}_NEWS_${isoCode}`} indexId={`${envPrefix}_NEWS_${isoCode}`}>
                  <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                  <Hits hitComponent={NewsHit} category="News" />
                  <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
                </Index>
              </TabPanel>
              {Flags.IS_DEV && (
                <TabPanel>
                  <Index indexName={`${envPrefix}_MAGAZINE_${isoCode}`} indexId={`${envPrefix}_MAGAZINE_${isoCode}`}>
                    <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                    <Hits hitComponent={MagazineHit} category="Magazine" />
                    <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
                  </Index>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </Results>
      )}
    </>
  )
}
export default SearchResults
