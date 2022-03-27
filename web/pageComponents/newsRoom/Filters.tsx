import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@reach/accordion'
import { RefinementList } from './RefinementList'
import SearchBox from './SearchBox'

const Filters = ({ ...rest }) => {
  return (
    <div {...rest}>
      <SearchBox />
      <Accordion id="filters" multiple collapsible>
        <AccordionItem>
          <AccordionButton>Year</AccordionButton>
          <AccordionPanel>
            <RefinementList sortBy={['name:desc']} attribute="year" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Country</AccordionButton>
          <AccordionPanel>
            <RefinementList sortBy={['name:asc']} attribute="countryTags" />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Topic</AccordionButton>
          <AccordionPanel>
            <RefinementList sortBy={['name:asc']} limit={20} attribute="topicTags" />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Filters
