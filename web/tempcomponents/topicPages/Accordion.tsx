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

  /* Where exactly should we put these styles */
  /* If the title has an eyebrow we need some tweaks */
  & h2 {
    padding: var(--space-large) 0;
  }
  & h2:first-child {
    padding-top: 0;
  }

  & p:last-child {
    margin-bottom: 0;
  }
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
              const { id, title, content } = item
              return (
                <Item key={id}>
                  <Header>{title}</Header>
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
