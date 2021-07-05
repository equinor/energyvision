import { Heading, BackgroundContainer, Accordion as EnvisAccordion } from '@components'
import { BlockRenderer } from '../../common/serializers'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import type { AccordionData } from '../../types/types'
import styled from 'styled-components'

const { Item, Header, Panel } = EnvisAccordion

export const StyledTextBlockWrapper = styled(BackgroundContainer)``

const StyledTextBlock = styled.section`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

type AccordionProps = {
  data: AccordionData
}

const Accordion = ({ data }: AccordionProps) => {
  const { title, ingress, designOptions, accordion } = data

  const { background } = designOptions
  return (
    <StyledTextBlockWrapper background={background}>
      <StyledTextBlock>
        {title && (
          <Heading size="xl" level="h2">
            {title}
          </Heading>
        )}
        {ingress && (
          <SimpleBlockContent
            blocks={ingress}
            serializers={{
              types: {
                block: BlockRenderer,
              },
            }}
          />
        )}
        {accordion && accordion.length > 0 && (
          <EnvisAccordion>
            {accordion.map((item) => {
              const { id, title: itemTitle, content } = item

              return (
                <Item key={id}>
                  <Header headingLevel={title ? 'h3' : 'h2'}>{itemTitle}</Header>
                  <Panel>
                    {content && (
                      <SimpleBlockContent
                        blocks={content}
                        serializers={{
                          types: {
                            block: BlockRenderer,
                          },
                        }}
                      />
                    )}
                  </Panel>
                </Item>
              )
            })}
          </EnvisAccordion>
        )}
      </StyledTextBlock>
    </StyledTextBlockWrapper>
  )
}

export default Accordion
