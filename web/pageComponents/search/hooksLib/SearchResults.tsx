import { useState } from 'react'
import { Tabs } from '@components'
import { Index } from 'react-instantsearch-hooks'
import styled from 'styled-components'
import { useRouter, NextRouter } from 'next/router'
import useRouterReplace from '../../hooks/useRouterReplace'
import Stats from './Stats'
import Hits from './Hits'
import Hit from './Hit'

const Results = styled.div`
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

// @TODO How should we do this
// What  about translations if we have Norwegian urls
// is it better to use like tc and e instead
const tabMap = [
  { id: 0, name: 'topic-content' },
  { id: 1, name: 'events' },
]

const SearchResults = () => {
  const router = useRouter()
  const replaceUrl = useRouterReplace()

  const [activeTabIndex, setActiveTabIndex] = useState(getInitialTabIndex(router))

  const handleTabChange = (index: number) => {
    const activeTab = tabMap.find((tab) => tab.id === index)
    if (activeTab) {
      replaceUrl({ tab: activeTab.name })
      setActiveTabIndex(index)
    }
  }

  return (
    <Results>
      <Tabs index={activeTabIndex} onChange={handleTabChange}>
        <TabList>
          <Tab inverted>
            <Index indexName="dev_TOPICS_en-GB">
              Topic
              <Stats />
            </Index>
          </Tab>
          <Tab inverted>
            <Index indexName="dev_EVENTS_en-GB">
              Event <Stats />
            </Index>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Index indexName="dev_TOPICS_en-GB">
              <Hits hitComponent={Hit} />
            </Index>
          </TabPanel>
          <TabPanel>
            <Index indexName="dev_EVENTS_en-GB">
              <Hits hitComponent={Hit} />
            </Index>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Results>
  )
}

export default SearchResults
