import { useState } from 'react'
import { Tabs } from '@components'
import { Index, useHits } from 'react-instantsearch-hooks'
import styled from 'styled-components'
import { useRouter, NextRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import useRouterReplace from '../hooks/useRouterReplace'
import NumberOfHits from './NumberOfHits'
import Hits from './Hits'
import EventHit from './EventHit'
import TopicHit from './TopicHit'
import { getIsoFromLocale } from '../../lib/localization' // grrr ../
import { Pagination } from './NewPagination'
import TotalResultsStat from './TotalResultsStat'
import { isGlobalProduction } from '../../common/helpers/datasetHelpers'

const Results = styled.div`
  margin-top: var(--space-xLarge);
`

const StyledPagination = styled(Pagination)`
  margin-top: var(--space-xLarge);
`

const { Tab, TabList, TabPanel, TabPanels } = Tabs

const getInitialTabIndex = (router: NextRouter) => {
  const paramName = 'tab'
  if (router.query[paramName]) {
    const activeTab = tabMap.find((tab) => tab.name === router.query[paramName])
    if (activeTab) {
      return activeTab.id
    }
  }
  return 0
}

// Sven: I don't understand how we can revieve this number, it's configured
// in the Configure component, so how could we get it from there
const HITS_PER_PAGE = 5

// @TODO How should we do this
// What  about translations if we have Norwegian urls
// is it better to use like tc and e instead? Doesn't feel safe to use text snippet that
// can be changed here
const tabMap = [
  { id: 0, name: 'topic-content' },
  { id: 1, name: 'events' },
]

type SearchResultsProps = {
  setIsOpen: (arg0: boolean) => void
}

const SearchResults = ({ setIsOpen }: SearchResultsProps) => {
  const router = useRouter()
  const replaceUrl = useRouterReplace()
  const { results } = useHits()
  const isoCode = getIsoFromLocale(router.locale)

  const [activeTabIndex, setActiveTabIndex] = useState(getInitialTabIndex(router))

  const handleTabChange = (index: number) => {
    const activeTab = tabMap.find((tab) => tab.id === index)
    if (activeTab) {
      replaceUrl({ tab: activeTab.name })
      setActiveTabIndex(index)
    }
  }

  const hasQuery = results && results.query !== ''

  // @TODO How can we make this robust?
  const envPrefix = isGlobalProduction ? 'prod' : 'dev'

  return (
    <>
      {hasQuery && (
        <Results>
          <Tabs index={activeTabIndex} onChange={handleTabChange}>
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
                <Hits hitComponent={TopicHit} setIsOpen={setIsOpen} category="Topic" />
                {/* <StyledPagination numberPerPage={HITS_PER_PAGE} /> */}
                <StyledPagination />
                {/*   </Index> */}
              </TabPanel>
              <TabPanel>
                <Index indexName={`${envPrefix}_EVENTS_${isoCode}`} indexId={`${envPrefix}_EVENTS_${isoCode}`}>
                  <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                  <Hits setIsOpen={setIsOpen} hitComponent={EventHit} category="Event" />
                  {/* <StyledPagination numberPerPage={HITS_PER_PAGE} /> */}
                  <StyledPagination />
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
