'use client'
import { Tabs } from '@/core/Tabs'
import { RefObject, useEffect, useState } from 'react'
import Hits from './Hits'
import TotalResultsStat from './TotalResultsStat'
import { useSortBy, UseSortByProps, useHits, useInstantSearch } from 'react-instantsearch'
import UniversalHit from './UniversalHit'
import { useTranslations } from 'next-intl'

const { TabList, Tab, TabPanel } = Tabs

const HITS_PER_PAGE = 5

type SearchResultsProps = {
  resultsRef: RefObject<HTMLDivElement | null> | undefined
} & UseSortByProps
const SearchResults = (props: SearchResultsProps) => {
  const { resultsRef } = props
  const { refine, currentRefinement, options } = useSortBy(props)
  const intl = useTranslations()
  const { results } = useHits()
  const { scopedResults, indexUiState } = useInstantSearch()
  const [userClicked, setUserClicked] = useState(false)

  useEffect(() => {
    const indexWithHits = scopedResults
      .slice(1)
      .filter((it) => it.results?.nbHits && it.results?.nbHits > 0 && it.results?.query)
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

  const handleTabChange = (value: string) => {
    setUserClicked(true)
    const activeIndex = options.find((option) => option.label === value)
    if (activeIndex) {
      refine(activeIndex.value)
    }
  }

  const activeTab = options.findIndex((it) => it.value === currentRefinement)
  const hasQuery = results && results.query !== ''
  return (
    <>
      {hasQuery && (
        <div ref={resultsRef} className="dark mt-10">
          <Tabs
            value={options[activeTab].label || options[0].label}
            activationMode="manual"
            onValueChange={handleTabChange}
          >
            <TabList aria-label={intl('categories')}>
              {options.map((item) => (
                <Tab id={`tab-trigger-${item.label}`} key={item.label} value={item.label} className="">
                  {item.label}
                  {` `}
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
              <TabPanel key={it.label} value={it.label} aria-labelledby={`tab-trigger-${it.label}`}>
                <TotalResultsStat hitsPerPage={HITS_PER_PAGE} />
                <Hits hitComponent={UniversalHit} />
              </TabPanel>
            ))}
          </Tabs>
        </div>
      )}
    </>
  )
}

export default SearchResults
