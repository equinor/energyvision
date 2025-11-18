import { Accordion as EnvisAccordion } from '@/core/Accordion'
import CallToActions from '@/sections/CallToActions'
import Blocks from '@/portableText/Blocks'
import { Image } from '@/core/Image/Image'
import { AccordionListData } from '@/types'

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
              {image && image?.asset && (
                <Image
                  grid="xs"
                  aspectRatio="16:9"
                  image={image}
                  className="max-w-72"
                  imageClassName="lg:aspect-video rounded-2xs"
                />
              )}
              {content && <Blocks value={content} />}
              {links && <CallToActions callToActions={links} linkVariant="fit" />}
            </Content>
          </Item>
        )
      })}
    </EnvisAccordion>
  )
}

export default Accordion
