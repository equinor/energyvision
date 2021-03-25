/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { RelatedContent, RelatedContentProps, Link, Heading } from '@components'

export default {
  title: 'Components/RelatedContent',
  component: RelatedContent,
  subcomponents: {
    Links: RelatedContent.Links,
  },
  parameters: {
    docs: {
      description: {
        component: `A <code>RelatedContent</code> is used to present related articles, videos or exciting stuffs related to a piece of content.
        `,
      },
    },
  },
} as Meta

export const Default: Story<RelatedContentProps> = (args) => (
  <RelatedContent {...args}>
    <Heading size="lg" level="h2" center>
      More on this topic
    </Heading>
    <RelatedContent.Links>
      <Link variant="contentLink" href="/">
        Northern Lights project
      </Link>
      <Link variant="contentLink" href="/">
        Carbon capture and storage
      </Link>
      <Link variant="contentLink" href="/">
        Digitalisation in Equinor
      </Link>
      <Link variant="contentLink" href="/" external>
        Equinor Design System - eds.equinor.com
      </Link>
    </RelatedContent.Links>
  </RelatedContent>
)

Default.storyName = 'Default'

export const WithOddNumber: Story<RelatedContentProps> = () => (
  <RelatedContent>
    <Heading size="lg" level="h2" center>
      More on this topic
    </Heading>
    <RelatedContent.Links>
      <Link variant="contentLink" href="/">
        Northern Lights project
      </Link>
      <Link variant="contentLink" href="/">
        Carbon capture and storage
      </Link>
      <Link variant="contentLink" href="/">
        Digitalisation in Equinor
      </Link>
    </RelatedContent.Links>
  </RelatedContent>
)

WithOddNumber.storyName = 'With an odd number of links'
WithOddNumber.parameters = {
  docs: {
    storyDescription: `If the number of links are odd, the last one will be in the left column.`,
  },
}

export const Order: Story<RelatedContentProps> = (args) => (
  <RelatedContent {...args}>
    <Heading size="lg" level="h2" center>
      More on this topic
    </Heading>
    <RelatedContent.Links>
      <Link variant="contentLink" href="/">
        1. Northern Lights project
      </Link>
      <Link variant="contentLink" href="/">
        2. Carbon capture and storage
      </Link>
      <Link variant="contentLink" href="/">
        3. Digitalisation in Equinor
      </Link>
      <Link variant="contentLink" href="/" external>
        4. Equinor Design System - eds.equinor.com
      </Link>
    </RelatedContent.Links>
  </RelatedContent>
)

Order.storyName = 'Order'
Order.parameters = {
  docs: {
    storyDescription: `By default, the links will `,
  },
}
