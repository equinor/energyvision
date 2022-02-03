import { Story, Meta } from '@storybook/react/types-6-0'
import { Link, LinkProps, ButtonLink } from '@components'

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: `A Link is used for both internal links (references), external links and downloads. <br/>
        ❗&nbsp; For use with Next.js, remember to wrap internal links with next/link component to enable client-side transitions.
        `,
      },
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
      <Link href="/" type="externalUrl">
        This is an external link
      </Link>
    </div>
    <p>
      Hello, inside here <Link href="/">is a link</Link> that can take you to somewhere else.
    </p>
    <p>
      Wrapped in some text and{' '}
      <Link href="/" type="externalUrl">
        still an external link
      </Link>{' '}
      to the Universe.
    </p>
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
      <Link variant="contentLink" href="/" type="externalUrl">
        Equinor Design System - eds.equinor.com
      </Link>
    </div>
    <div>
      <Link variant="contentLink" href="/" type="downloadableFile">
        A pdf or an excel file
      </Link>
    </div>
    <div>
      <Link variant="contentLink" href="/" type="downloadableImage">
        An image file
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

export const LinkWithoutUnderline: Story = () => (
  <Link underline={false} href="/">
    Read more
  </Link>
)

LinkWithoutUnderline.parameters = {
  docs: {
    storyDescription: `A link with no underline, like a menu link. `,
  },
}

export const ButtonLinkExample: Story = () => (
  <ButtonLink href="/">Check out our exciting career opportunities</ButtonLink>
)
ButtonLinkExample.parameters = {
  docs: {
    storyDescription: `A link with a button look. `,
  },
}
