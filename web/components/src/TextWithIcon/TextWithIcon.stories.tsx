/* eslint-disable */
import type { StoryFn, Meta } from '@storybook/react'
import { TextWithIcon } from '@components'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: var(--space-xLarge);
  display: grid;
  grid-gap: var(--spacing-4xLarge);
  grid-template-columns: 1fr;
`

const Group = styled.div`
  display: grid;
  grid-gap: calc(3 * var(--space-medium));
  grid-template-columns: repeat(auto-fit, minmax(calc(13 * var(--space-medium)), calc(18 * var(--space-medium))));
  justify-content: center;
`

export default {
  title: 'Components/TextWithIcon',
  component: TextWithIcon,
  parameters: {
    docs: {
      description: {
        component: `A TextWithIcon component is used for displaying an icon or piece of text in a highlighted way, or in a group.
        `,
      },
    },
  },
} as Meta

export const Default: StoryFn = () => (
  <TextWithIcon>
    <TextWithIcon.Media>
      <img src="/icon_people.svg" alt="people icon" />
    </TextWithIcon.Media>
    <TextWithIcon.Title>21,000</TextWithIcon.Title>
    <TextWithIcon.Text>Committed colleagues worldwide</TextWithIcon.Text>
  </TextWithIcon>
)

Default.storyName = 'Default'

export const Variations: StoryFn = () => (
  <Wrapper>
    <Group>
      <TextWithIcon>
        <TextWithIcon.Media>
          <img src="/icon_people.svg" alt="people icon" />
        </TextWithIcon.Media>
        <TextWithIcon.Title>21,000</TextWithIcon.Title>
        <TextWithIcon.Text>Committed colleagues worldwide</TextWithIcon.Text>
      </TextWithIcon>

      <TextWithIcon>
        <TextWithIcon.Media>
          <img src="/icon_globe.svg" alt="globe icon" />
        </TextWithIcon.Media>
        <TextWithIcon.Title>46 million</TextWithIcon.Title>
        <TextWithIcon.Text>Total revenues and other income, USD, 2020</TextWithIcon.Text>
      </TextWithIcon>
    </Group>

    <Group>
      <TextWithIcon>
        <TextWithIcon.Media>
          <img src="/icon_people.svg" alt="people icon" />
        </TextWithIcon.Media>
        <TextWithIcon.Title>21,000 colleagues worldwide</TextWithIcon.Title>
      </TextWithIcon>

      <TextWithIcon>
        <TextWithIcon.Media>
          <img src="/icon_globe.svg" alt="globe icon" />
        </TextWithIcon.Media>
        <TextWithIcon.Title>46 million USD in revenues</TextWithIcon.Title>
      </TextWithIcon>
    </Group>

    <Group>
      <TextWithIcon>
        <TextWithIcon.Media>
          <img src="/icon_people.svg" alt="people icon" />
        </TextWithIcon.Media>
        <TextWithIcon.Text>21,000 committed colleagues worldwide</TextWithIcon.Text>
      </TextWithIcon>

      <TextWithIcon>
        <TextWithIcon.Media>
          <img src="/icon_globe.svg" alt="globe icon" />
        </TextWithIcon.Media>
        <TextWithIcon.Text>46 million total revenues and other income, USD, 2020.</TextWithIcon.Text>
      </TextWithIcon>
    </Group>

    <Group>
      <TextWithIcon>
        <TextWithIcon.Title>21,000</TextWithIcon.Title>
        <TextWithIcon.Text>Committed colleagues worldwide</TextWithIcon.Text>
      </TextWithIcon>

      <TextWithIcon>
        <TextWithIcon.Title>46 million</TextWithIcon.Title>
        <TextWithIcon.Text>Total revenues and other income, USD, 2020.</TextWithIcon.Text>
      </TextWithIcon>
    </Group>
  </Wrapper>
)

Variations.storyName = 'Variations'
