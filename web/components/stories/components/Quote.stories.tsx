import { Story, Meta } from '@storybook/react/types-6-0'
import { PullQuote, PullQuoteProps } from '@components'
import styled from 'styled-components'

// Just copy'n paste from next images styles
const ImagePlaceholder = styled.img`
  background-color: hsl(0, 0%, 86%);
  position: absolute;
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 0px;
  height: 0px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
`

const RatioBox = styled.div`
  display: block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin: 0px;
`
const Ratio = styled.div`
  display: block;
  box-sizing: border-box;
  padding-top: 100%;
`

export default {
  title: 'Components/Quote',
  component: PullQuote,
  subcomponents: { Quote: PullQuote.Quote, Author: PullQuote.Author, Media: PullQuote.Media },
  parameters: {
    docs: {
      description: {
        component: `A PullQuote component is used for rendering a pull quote.
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
  </PullQuote>
)

export const WithAuthor: Story<PullQuoteProps> = () => (
  <PullQuote>
    <PullQuote.Quote>
      In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a
      bad move.
    </PullQuote.Quote>
    <PullQuote.Author>Douglas Adams</PullQuote.Author>
  </PullQuote>
)
WithAuthor.storyName = 'With author name'

export const WithAuthorAndTitle: Story<PullQuoteProps> = () => (
  <PullQuote>
    <PullQuote.Quote>
      In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a
      bad move.
    </PullQuote.Quote>
    <PullQuote.Author title="The Restaurant at the End of the Universe">Douglas Adams</PullQuote.Author>
  </PullQuote>
)
WithAuthorAndTitle.storyName = 'With author name and title'

export const WithImage: Story<PullQuoteProps> = () => (
  <PullQuote>
    <PullQuote.Quote>
      In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a
      bad move.
    </PullQuote.Quote>
    <PullQuote.Author title="The Restaurant at the End of the Universe">Douglas Adams</PullQuote.Author>
    <PullQuote.Media>
      <RatioBox>
        <Ratio></Ratio>
        <ImagePlaceholder />
      </RatioBox>
    </PullQuote.Media>
  </PullQuote>
)
WithImage.storyName = 'With image'

export const ShortQuote: Story<PullQuoteProps> = () => (
  <PullQuote>
    <PullQuote.Quote>In the beginning the Universe was created.</PullQuote.Quote>
    <PullQuote.Author title="The Restaurant at the End of the Universe">Douglas Adams</PullQuote.Author>
  </PullQuote>
)
ShortQuote.storyName = 'Short quote'

ShortQuote.parameters = {
  docs: {
    storyDescription: `When the quote is less than 50 characters, the font size gets bigger`,
  },
}
export const LongQuote: Story<PullQuoteProps> = () => (
  <PullQuote>
    <PullQuote.Quote>
      I am old, Gandalf. I do not look it, but I am beginning to feel it in my heart of hearts. Well-preserved indeed!
      Why, I feel all thin, sort of stretched, if you know what I mean: like butter that has been scraped over too much
      bread. That can not be right. I need a change, or something.
    </PullQuote.Quote>
    <PullQuote.Author title="Master Hobbit">Bilbo Baggins</PullQuote.Author>
  </PullQuote>
)
LongQuote.storyName = 'Long quote'

LongQuote.parameters = {
  docs: {
    storyDescription: `When the quote is more than 160 characters, the font weight is regular`,
  },
}
