import { Tabs } from '@components'
import { RefObject, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import EventHit from './EventHit'
import Hits from './Hits'
import MagazineHit from './MagazineHit'
import NewsHit from './NewsHit'
import { SearchContext } from './SearchContext'
import TopicHit from './TopicHit'
import TotalResultsStat from './TotalResultsStat'
import { useSortBy, UseSortByProps, useHits, useInstantSearch } from 'react-instantsearch'

const Results = styled.div`
  margin-top: var(--space-xLarge);
`

const TabText = styled.span`
  font-size: var(--typeScale-05);
`
const HitsContainer = styled.span`
  margin-left: var(--space-4);
`
const { Tab, TabList, TabPanel, TabPanels } = Tabs

// Sven: I don't understand how we can revieve this number, it's configured
// in the Configure component, so how could we get it from there
const HITS_PER_PAGE = 5

type SearchResultsProps = {
  resultsRef: RefObject<HTMLDivElement> | undefined
} & UseSortByProps
const SearchResults = (props: SearchResultsProps) => {
  const { resultsRef } = props
  const { refine, currentRefinement, options } = useSortBy(props)

  const { results } = useHits()
  const { scopedResults, indexUiState } = useInstantSearch()
  const { userTyped } = useContext(SearchContext)
  const [userClicked, setUserClicked] = useState(false)

  useEffect(() => {
    if (!userTyped) return
    const indexWithHits = scopedResults.slice(1).filter((it) => it.results?.nbHits > 0 && it.results?.query)
    const firstIndexWithHits = options
      .map((it) => it.value)
      .find((index) => indexWithHits.map((it) => it.indexId).includes(index))
    if (
      firstIndexWithHits &&
      scopedResults &&
      !userClicked &&
      !results?.__isArtificial &&
      indexUiState.query &&
      currentRefinement !== firstIndexWithHits
    ) {
      refine(firstIndexWithHits)
    }
  }, [userTyped, userClicked, scopedResults])

  const handleTabChange = (index: number) => {
    setUserClicked(true)
    const activeIndex = options[index]
    if (activeIndex) {
      refine(activeIndex.value)
    }
  }

  const getHitProps = (tab: string) => {
    switch (tab) {
      case 'Magazine':
        return MagazineHit
      case 'News':
        return NewsHit
      case 'Events':
        return EventHit
      default:
        return TopicHit
    }
  }
  const activeTab = options.findIndex((it) => it.value === currentRefinement)
  const hasQuery = results && results.query !== ''
  return (
    <>
      {hasQuery && (
        <Results ref={resultsRef}>
          <Tabs index={activeTab || 0} onChange={handleTabChange}>
            <TabList>
              {options.map((item) => (
                <Tab key={item.label}>
                  <TabText>
                    {item.label}
                    <HitsContainer>
                      (
                      {
                        scopedResults.find((it) => it.indexId === item.value && it.indexId === it.results?.index)
                          ?.results?.nbHits
                      }
                      )
                    </HitsContainer>
                  </TabText>
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {options.map((it) => (
                <TabPanel key={it.label}>
                  <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                  <Hits hitComponent={getHitProps(it.label)} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Results>
      )}
    </>
  )
}

export default SearchResults
