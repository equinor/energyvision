/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { RelatedContent, RelatedContentProps, Link } from '@components'
import { Typography, List } from '@equinor/eds-core-react'

export default {
  title: 'Components/RelatedContent',
  component: RelatedContent,
  subcomponents: {
    Title: RelatedContent.Title,
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
    <RelatedContent.Title>More on this topic</RelatedContent.Title>
    <RelatedContent.Links>
      <Link variant="contentLink" href="/">
        Northern Lights project
      </Link>

      <Link variant="contentLink" href="/" external>
        Equinor Design System - eds.equinor.com
      </Link>
    </RelatedContent.Links>
  </RelatedContent>
)

Default.storyName = 'Default'
