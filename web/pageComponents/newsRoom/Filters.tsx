import { useState } from 'react'
import { Accordion, AccordionItem, AccordionPanel } from '@reach/accordion'
import { useIntl } from 'react-intl'

import FilterHeader from '././FilterHeader'
import { RefinementList } from './RefinementList'
import SearchBox from './SearchBox'

const Filters = ({ ...rest }) => {
  const [indices, setIndices] = useState<number[]>([])
  const intl = useIntl()

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
          <FilterHeader label={intl.formatMessage({ id: 'newsroom_topic_filter', defaultMessage: 'Topics' })} />
          <AccordionPanel>
            <RefinementList sortBy={['name:asc']} limit={20} attribute="topicTags" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <FilterHeader label={intl.formatMessage({ id: 'newsroom_country_filter', defaultMessage: 'Country' })} />
          <AccordionPanel>
            <RefinementList sortBy={['name:asc']} attribute="countryTags" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <FilterHeader
            label={intl.formatMessage({ id: 'newsroom_year_filter', defaultMessage: 'Year' })}
          ></FilterHeader>
          <AccordionPanel>
            <RefinementList sortBy={['name:desc']} attribute="year" />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Filters
