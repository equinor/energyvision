import { Story, Meta } from '@storybook/react/types-6-0'
import { Topbar, Logo } from '@components'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  overflow: auto;
`

const BodyWrapper = styled.div`
  height: 1500px;
  background: #ebebeb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export default {
  title: 'Components/Topbar',
  component: Topbar,
  parameters: {
    docs: {
      description: {
        component: `Main bar at the top of every page, containing the branding, menu, and certain controls.<br>
        The bar has <strong>position: fixed</strong> and will hide when scrolling down. Scrolling up will make the bar reappear.
        `,
      },
      inlineStories: false,
      iframeHeight: 500,
    },
  },
} as Meta

export const Default: Story = () => (
  <Wrapper>
    <Topbar>
      <p>This is the topbar</p>
    </Topbar>
    <BodyWrapper>
      <p>Top of page</p>
      <p>Middle of page</p>
      <p>Bottom of page</p>
    </BodyWrapper>
  </Wrapper>
)

export const WithLogo: Story = () => (
  <Wrapper>
    <Topbar>
      <Logo />
    </Topbar>
    <BodyWrapper>
      <p>Top of page</p>
      <p>Middle of page</p>
      <p>Bottom of page</p>
    </BodyWrapper>
  </Wrapper>
)

WithLogo.parameters = {
  docs: {
    inlineStories: false,
    iframeHeight: 500,
  },
}
