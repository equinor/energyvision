import { Accordion as EnvisAccordion } from '@/core/Accordion'
import CallToActions from '@/sections/CallToActions'
import Blocks from '@/portableText/Blocks'
import Image, { getSmallerThanPxLgSizes } from '@/core/SanityImage/SanityImage'
import { AccordionListData } from '@/types'

const { Item, Header, Content } = EnvisAccordion

type AccordionProps = {
  hasSectionTitle?: boolean
  data: AccordionListData[]
  queryParamName: string
  id: string
}

const Accordion = ({ data, id, hasSectionTitle = true }: AccordionProps) => {
  console.log("Accordion",data);
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
                  maxWidth={570}
                  aspectRatio="16:9"
                  sizes={getSmallerThanPxLgSizes()}
                  image={image}
                  className="aspect-video max-w-72 rounded-2xs"
                />
              )}
              {content && <Blocks value={content} />}
              {links && <CallToActions callToActions={links} linkVariant='fit' />}
            </Content>
          </Item>
        )
      })}
    </EnvisAccordion>
  )
}

export default Accordion
