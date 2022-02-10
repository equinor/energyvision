import { Tabs } from '@components'
import { Index } from 'react-instantsearch-hooks'
import styled from 'styled-components'
import Stats from './Stats'
import Hits from './Hits'
import Hit from './Hit'

const Results = styled.div`
  margin-top: var(--space-xLarge);
`

const { Tab, TabList, TabPanel, TabPanels } = Tabs

const SearchResults = () => {
  return (
    <Results>
      <Tabs>
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
