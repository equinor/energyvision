import { Story, Meta } from '@storybook/react/types-6-0'
import { Topbar } from '@components'

export default {
  title: 'Components/Topbar',
  component: Topbar,
  parameters: {
    docs: {
      description: {
        component: `Main bar at the top of every page, containing the branding, menu, and certain controls.<br>
        The bar has <code>position: fixed</code> and will hide when scrolling down. Scrolling up will make the bar reappear.
        `,
      },
    },
  },
} as Meta

export const Default: Story = () => (
  <>
    <Topbar>
      <p>More to be added</p>
      <p>Soon</p>
    </Topbar>
  </>
)
