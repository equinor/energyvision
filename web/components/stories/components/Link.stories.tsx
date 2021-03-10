import { Story, Meta } from '@storybook/react/types-6-0'
import { Link, LinkProps } from '@components'

export default {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    variant: {
      description: 'Used to select a pre-styled type of link.',
    },
  },
} as Meta

export const Default: Story<LinkProps> = (args) => (
  <>
    <Link {...args} href="/">
      This is a link
    </Link>
  </>
)

export const RegularLink: Story = () => (
  <>
    <div>
      <Link href="/">This is a link</Link>
    </div>
    <div>
      <Link href="/" external>
        This is an external link
      </Link>
    </div>
  </>
)

RegularLink.parameters = {
  docs: {
    storyDescription: `Normal link used in body of text.`,
  },
}

export const ContentLink: Story = () => (
  <>
    <div>
      <Link variant="contentLink" href="/">
        Northern Lights project
      </Link>
    </div>
    <div>
      <Link variant="contentLink" href="/" external>
        Equinor Design System - eds.equinor.com
      </Link>
    </div>
  </>
)

ContentLink.parameters = {
  docs: {
    storyDescription: `Styled link used as for example as a group of related links.`,
  },
}

export const ReadMoreLink: Story = () => (
  <Link variant="readMore" href="/">
    Read more
  </Link>
)
