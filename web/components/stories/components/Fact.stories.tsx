/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { FactBox, FactProps, Heading } from '@components'
import { ImagePlaceholder } from './helpers/styles'

export default {
  title: 'Components/Fact',
  component: FactBox,
  subcomponents: {
    Text: FactBox.Text,
    Content: FactBox.Content,
    Image: FactBox.Image
  },
  parameters: {
    docs: {
      description: {
        component: `A <code>Fact</code> box component gives facts about a specific topic, preferably as bullet points.
        `,
      },
    },
  },
} as Meta

export const Default: Story<FactProps> = (args) => (
  <FactBox {...args}>
    <FactBox.Content>
      <Heading size="xl" level="h3">
        Dolor sit amet
      </Heading>
      <FactBox.Text>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur eligendi, quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit earum?</p>
      </FactBox.Text>
    </FactBox.Content>
  </FactBox>
)

Default.storyName = 'Default'

export const WithBulletPoints: Story<FactProps> = (args) => (
  <FactBox {...args}>
    <FactBox.Content>
      <Heading size="xl" level="h3">
        Dolor sit amet
      </Heading>
      <FactBox.Text>
        <ul>
          <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci maxime culpa veritatis modi! Optio harum exercitationem repellat, dicta saepe placeat officiis, incidunt labore reiciendis inventore eveniet dolores nihil voluptates. Labore.</li>
          <li>Necessitatibus excepturi nobis iusto, ipsa similique eius provident a aperiam aspernatur minus tempore cum ad quos ut officiis molestiae neque architecto mollitia saepe amet suscipit temporibus soluta eligendi qui. Voluptatum.</li>
          <li>Similique, labore incidunt, exercitationem aspernatur sint culpa neque at quae ducimus sunt quas harum animi fugit! Quis eveniet ullam quibusdam recusandae reiciendis, fuga amet laboriosam debitis labore eos ex sed?</li>
        </ul>
      </FactBox.Text>
    </FactBox.Content>
  </FactBox>
)

export const WithDifferentBackgrounds: Story<FactProps> = () => (
  <>
    <FactBox background="none">
      <FactBox.Content>
        <Heading size="xl" level="h3">
          Dolor sit amet
        </Heading>
        <FactBox.Text>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur eligendi, quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit earum?</p>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
    <FactBox background="warm">
      <FactBox.Content>
        <Heading size="xl" level="h3">
          Dolor sit amet
        </Heading>
        <FactBox.Text>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur eligendi, quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit earum?</p>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
    <FactBox background="cold">
      <FactBox.Content>
        <Heading size="xl" level="h3">
          Dolor sit amet
        </Heading>
        <FactBox.Text>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur eligendi, quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit earum?</p>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
  </>
)

type WithImageProps = {
  dynamicHeight: boolean
} & FactProps

export const WithImage: Story<WithImageProps> = ({ background = 'warm', imagePosition = 'left', dynamicHeight = false }) => (
  <>
    <FactBox background={background} imagePosition={imagePosition}>
      <FactBox.Image>
        <ImagePlaceholder style={{ borderRadius: 0}} />
      </FactBox.Image>
      <FactBox.Content hasImage dynamicHeight={dynamicHeight}>
        <Heading size="xl" level="h3">
          Dolor sit amet
        </Heading>
        <FactBox.Text>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur eligendi, quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit earum?</p>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
  </>
)

WithImage.parameters = {
  docs: {
    storyDescription: `Factbox with image. Select "canvas" mode for this story to see different variations.`
  }
}

WithImage.argTypes = {
  background: {
    control: {
      type: 'radio',
      options: ['none', 'warm', 'cold']
    },
    defaultValue: 'warm'
  },
  imagePosition: {
    control: {
      type: 'radio',
      options: ['left', 'right']
    },
    defaultValue: 'left'
  },
  dynamicHeight: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  }
}