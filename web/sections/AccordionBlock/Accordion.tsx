import { Accordion as EnvisAccordion } from '@core/Accordion'
import type { AccordionListData } from '../../types/index'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import CallToActions from '@sections/CallToActions'
import Image from '../../pageComponents/shared/SanityImage'

const { Item, Header, Content } = EnvisAccordion

type AccordionProps = {
  hasSectionTitle?: boolean
  data: AccordionListData[]
  queryParamName: string
  id: string
}

const Accordion = ({ data, id, hasSectionTitle = true }: AccordionProps) => {
  return (
    <EnvisAccordion type="multiple" id={id}>
      {data.map((item) => {
        const { id, title: itemTitle, links, content, image } = item

        return (
          <Item key={id} value={id}>
            <Header hasSectionTitle={hasSectionTitle}>{itemTitle}</Header>
            <Content>
              {image && image?.asset && <Image image={image} className="aspect-video rounded-xs max-w-72" />}
              {content && <Blocks value={content} />}
              {links && <CallToActions overrideButtonStyle callToActions={links} />}
            </Content>
          </Item>
        )
      })}
    </EnvisAccordion>
  )
}

export default Accordion
