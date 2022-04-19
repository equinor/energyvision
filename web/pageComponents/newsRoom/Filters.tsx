import { useState } from 'react'
import { Accordion, AccordionItem, AccordionPanel } from '@reach/accordion'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import FilterHeader from '././FilterHeader'
import { RefinementList } from './RefinementList'
import UncontrolledSearchBox from './UncontrolledSearchBox'

const StyledAccordion = styled(Accordion)`
  @media (min-width: 800px) {
    padding: 0 0 var(--space-large) var(--space-medium);
    border-left: 1px solid var(--slate-blue-50);
  }
`

const SearchBoxContainer = styled.div`
  @media (min-width: 800px) {
    padding-left: var(--space-medium);
  }
`

const StyledFilters = styled.div`
  @media (min-width: 800px) {
    display: grid;
    grid-template-rows: var(--space-56) min-content min-content;
  }
`

const Filters = ({ ...rest }) => {
  const [indices, setIndices] = useState<number[]>([])
  const intl = useIntl()

  function toggleItem(toggledIndex: number) {
    if (indices.includes(toggledIndex)) {
      setIndices(indices.filter((currentIndex) => currentIndex !== toggledIndex))
    } else {
      setIndices([...indices, toggledIndex].sort())
    }
  }

  return (
    <StyledFilters {...rest}>
      <SearchBoxContainer>
        <UncontrolledSearchBox />
      </SearchBoxContainer>

      <StyledAccordion id="filters" index={indices} onChange={toggleItem}>
        <AccordionItem>
          <FilterHeader label={intl.formatMessage({ id: 'newsroom_topic_filter', defaultMessage: 'Topics' })} />
          <AccordionPanel>
            <RefinementList /*  sortBy={['name:asc']} */ limit={50} attribute="topicTags" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <FilterHeader label={intl.formatMessage({ id: 'newsroom_country_filter', defaultMessage: 'Country' })} />
          <AccordionPanel>
            <RefinementList /* sortBy={['name:asc']} */ attribute="countryTags" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <FilterHeader
            label={intl.formatMessage({ id: 'newsroom_year_filter', defaultMessage: 'Year' })}
          ></FilterHeader>
          <AccordionPanel>
            <RefinementList sortBy={['name:desc']} attribute="year" limit={50} />
          </AccordionPanel>
        </AccordionItem>
      </StyledAccordion>
    </StyledFilters>
  )
}

export default Filters
