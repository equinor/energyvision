import { useState } from 'react'
import { Accordion, AccordionItem, AccordionPanel } from '@reach/accordion'

import FilterHeader from '././FilterHeader'
import { RefinementList } from './RefinementList'
import SearchBox from './SearchBox'

const Filters = ({ ...rest }) => {
  const [indices, setIndices] = useState([0, 1, 2])

  function toggleItem(toggledIndex: number) {
    console.log(toggledIndex)
    if (indices.includes(toggledIndex)) {
      setIndices(indices.filter((currentIndex) => currentIndex !== toggledIndex))
    } else {
      setIndices([...indices, toggledIndex].sort())
    }
  }

  return (
    <div {...rest}>
      <SearchBox />
      <Accordion id="filters" index={indices} onChange={toggleItem}>
        <AccordionItem>
          <FilterHeader label="Year"></FilterHeader>
          <AccordionPanel>
            <RefinementList sortBy={['name:desc']} attribute="year" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <FilterHeader label="Country" />
          <AccordionPanel>
            <RefinementList sortBy={['name:asc']} attribute="countryTags" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <FilterHeader label="Topic" />
          <AccordionPanel>
            <RefinementList sortBy={['name:asc']} limit={20} attribute="topicTags" />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Filters
