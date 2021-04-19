import { Story, Meta } from '@storybook/react/types-6-0'
import { PullQuote, PullQuoteProps } from '@components'

export default {
  title: 'Components/Quote',
  component: PullQuote,
  subcomponents: { Quote: PullQuote.Quote, Author: PullQuote.Author },
  parameters: {
    docs: {
      description: {
        component: `A <code>PullQuote</code> component is used for rendering a pull quote.
        `,
      },
    },
  },
} as Meta

export const Default: Story<PullQuoteProps> = (args) => (
  <PullQuote {...args}>
    <PullQuote.Quote>
      In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a
      bad move.
    </PullQuote.Quote>
    <PullQuote.Author title="The Restaurant at the End of the Universe">Douglas Adams</PullQuote.Author>
  </PullQuote>
)
