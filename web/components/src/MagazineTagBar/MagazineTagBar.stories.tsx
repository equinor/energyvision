import { Story, Meta } from '@storybook/react/types-6-0'
import { MagazineTagBar } from '@components'

export default {
  title: 'Components/MagazineTagBar',
  component: MagazineTagBar,
} as Meta
export const Default: Story = () => (
  <MagazineTagBar
    tags={[
      { label: 'All', link: '/all' },
      { label: 'Green Transition', link: '/all' },
      { label: 'Equinor at 50', link: '/all' },
      { label: 'Net zero', link: '/all' },
      { label: 'Innovation', link: '/all' },
      { label: 'Performance', link: '/all' },
    ]}
  ></MagazineTagBar>
)
