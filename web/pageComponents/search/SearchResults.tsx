import { Tabs } from '@core/Tabs'
import { RefObject, useEffect, useState } from 'react'
import EventHit from './EventHit'
import Hits from './Hits'
import MagazineHit from './MagazineHit'
import NewsHit from './NewsHit'
import TopicHit from './TopicHit'
import TotalResultsStat from './TotalResultsStat'
import { useSortBy, UseSortByProps, useHits, useInstantSearch } from 'react-instantsearch'

const { TabList, Tab, TabPanel } = Tabs

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
  const [userClicked, setUserClicked] = useState(false)

  useEffect(() => {
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
  }, [userClicked, scopedResults, options, results?.__isArtificial, indexUiState.query, currentRefinement, refine])

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
        <div ref={resultsRef} className="dark mt-10">
          <Tabs value={options[activeTab].label || options[0].label}>
            <TabList>
              {options.map((item) => (
                <Tab key={item.label} value={item.label} className="text-sm flex gap-2">
                  {item.label}
                  <span>
                    (
                    {
                      scopedResults.find((it) => it.indexId === item.value && it.indexId === it.results?.index)?.results
                        ?.nbHits
                    }
                    )
                  </span>
                </Tab>
              ))}
            </TabList>
            {options.map((it) => (
              <TabPanel key={it.label} value={it.label}>
                <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                <Hits hitComponent={getHitProps(it.label)} />
              </TabPanel>
            ))}
          </Tabs>
        </div>
      )}
    </>
  )
}

export default SearchResults
