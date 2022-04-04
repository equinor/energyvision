import { useState, useEffect } from 'react'
import { Tabs } from '@components'
import { Index, useHits } from 'react-instantsearch-hooks'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import NumberOfHits from './NumberOfHits'
import Hits from './Hits'
import EventHit from './EventHit'
import TopicHit from './TopicHit'
import { getIsoFromLocale } from '../../lib/localization' // grrr ../
import { Pagination } from '../shared/search/pagination/Pagination'
import TotalResultsStat from './TotalResultsStat'
import { isGlobalProduction } from '../../common/helpers/datasetHelpers'

const Results = styled.div`
  margin-top: var(--space-xLarge);
`

const StyledPagination = styled(Pagination)`
  margin-top: var(--space-xLarge);
  justify-content: center;
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
]

const SearchResults = () => {
  const router = useRouter()
  //const replaceUrl = useRouterReplace()
  const { results } = useHits()
  const [currentTab, setCurrentTab] = useState<string>((router.query.tab as string) || 'topics')

  // route to state
  useEffect(() => {
    if (router.query.tab) {
      setCurrentTab(router.query.tab as string)
    }
  }, [router.query.tab])

  // state to route
  useEffect(() => {
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

  const handleTabChange = (index: number) => {
    const activeTab = tabMap.find((tab) => tab.id === index)
    if (activeTab) {
      setCurrentTab(activeTab.name)
    }
  }

  const isoCode = getIsoFromLocale(router.locale)

  const hasQuery = results && results.query !== ''

  // @TODO How can we make this robust?
  const envPrefix = isGlobalProduction ? 'prod' : 'dev'

  const activeTab = tabMap.find((tab) => tab.name === currentTab)
  return (
    <>
      {hasQuery && (
        <Results>
          <Tabs index={activeTab?.id || 0} onChange={handleTabChange}>
            <TabList>
              <Tab inverted>
                {/*   <Index indexName={`${envPrefix}_TOPICS_${isoCode}`} indexId={`${envPrefix}_TOPICS_${isoCode}`}> */}
                <FormattedMessage id="search_topics_tab" defaultMessage="Topics" />
                <NumberOfHits />
                {/*  </Index> */}
              </Tab>
              <Tab inverted>
                <Index indexName={`${envPrefix}_EVENTS_${isoCode}`} indexId={`${envPrefix}_EVENTS_${isoCode}`}>
                  <FormattedMessage id="search_events_tab" defaultMessage="Events" />
                  <NumberOfHits />
                </Index>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/*   <Index indexName={`${envPrefix}_TOPICS_${isoCode}`} indexId={`${envPrefix}_TOPICS_${isoCode}`}> */}
                <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                <Hits hitComponent={TopicHit} category="Topic" />
                <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
                {/*   </Index> */}
              </TabPanel>
              <TabPanel>
                <Index indexName={`${envPrefix}_EVENTS_${isoCode}`} indexId={`${envPrefix}_EVENTS_${isoCode}`}>
                  <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                  <Hits hitComponent={EventHit} category="Event" />
                  <StyledPagination padding={1} hitsPerPage={HITS_PER_PAGE} inverted />
                </Index>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Results>
      )}
    </>
  )
}

export default SearchResults
