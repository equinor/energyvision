import { Story, Meta } from '@storybook/react/types-6-0'
import styled from 'styled-components'
import { Link, LinkProps } from '@components'

const Wrapper = styled.div`
  margin: 32px;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

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
  <Wrapper>
    <Link {...args} href="/">
      This is a link
    </Link>
  </Wrapper>
)

export const RegularLink: Story = () => (
  <Wrapper>
    <Link href="/">This is a link</Link>

    <Link href="/" external>
      This is an external link
    </Link>
  </Wrapper>
)

RegularLink.parameters = {
  docs: {
    storyDescription: `Normal link used in body of text.`,
  },
}

export const ContentLink: Story = () => (
  <Wrapper>
    <Link variant="contentLink" href="/">
      Northern Lights project
    </Link>

    <Link variant="contentLink" href="/" external>
      Equinor Design System - eds.equinor.com
    </Link>
  </Wrapper>
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
