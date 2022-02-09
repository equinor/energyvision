/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { FactBox, FactProps, Heading, Text, List } from '@components'
import { AspectImagePlaceholder } from '@stories'

export default {
  title: 'Components/Fact',
  component: FactBox,
  subcomponents: {
    Text: FactBox.Text,
    Content: FactBox.Content,
    Image: FactBox.Image,
  },
  parameters: {
    docs: {
      description: {
        component: `A Fact box component gives facts about a specific topic, preferably as bullet points.
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
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur eligendi,
          quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit earum?
        </Text>
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
        <List>
          <List.Item>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci maxime culpa veritatis modi! Optio harum
            exercitationem repellat, dicta saepe placeat officiis, incidunt labore reiciendis inventore eveniet dolores
            nihil voluptates. Labore.
          </List.Item>
          <List.Item>
            Necessitatibus excepturi nobis iusto, ipsa similique eius provident a aperiam aspernatur minus tempore cum
            ad quos ut officiis molestiae neque architecto mollitia saepe amet suscipit temporibus soluta eligendi qui.
            Voluptatum.
          </List.Item>
          <List.Item>
            Similique, labore incidunt, exercitationem aspernatur sint culpa neque at quae ducimus sunt quas harum animi
            fugit! Quis eveniet ullam quibusdam recusandae reiciendis, fuga amet laboriosam debitis labore eos ex sed?
          </List.Item>
        </List>
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
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur
            eligendi, quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit
            earum?
          </Text>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
    <FactBox background="warm" style={{ marginTop: 'var(--space-medium)' }}>
      <FactBox.Content>
        <Heading size="xl" level="h3">
          Dolor sit amet
        </Heading>
        <FactBox.Text>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur
            eligendi, quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit
            earum?
          </Text>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
    <FactBox background="cold" style={{ marginTop: 'var(--space-medium)' }}>
      <FactBox.Content>
        <Heading size="xl" level="h3">
          Dolor sit amet
        </Heading>
        <FactBox.Text>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur
            eligendi, quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit
            earum?
          </Text>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
  </>
)

type WithImageProps = {
  dynamicHeight: boolean
} & FactProps

export const WithImage: Story<WithImageProps> = ({
  background = 'warm',
  imagePosition = 'left',
  dynamicHeight = false,
}) => (
  <>
    <FactBox background={background} imagePosition={imagePosition}>
      <FactBox.Image>
        <AspectImagePlaceholder style={{ borderRadius: 0 }} />
      </FactBox.Image>
      <FactBox.Content hasImage dynamicHeight={dynamicHeight}>
        <Heading size="xl" level="h3">
          Dolor sit amet
        </Heading>
        <FactBox.Text>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, ad, ab labore inventore quos tenetur
            eligendi, quisquam quod sapiente voluptate sint provident. Doloribus quas nemo eligendi? At sapiente impedit
            earum?
          </Text>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
  </>
)

WithImage.parameters = {
  docs: {
    storyDescription: `Factbox with image. Select "canvas" mode for this story to see different variations.`,
  },
}

WithImage.argTypes = {
  background: {
    control: {
      type: 'radio',
      options: ['none', 'warm', 'cold'],
    },
    defaultValue: 'warm',
  },
  imagePosition: {
    control: {
      type: 'radio',
      options: ['left', 'right'],
    },
    defaultValue: 'left',
  },
  dynamicHeight: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
}

export const WithLongText: Story<WithImageProps> = ({ background = 'warm', dynamicHeight = false }) => (
  <>
    <FactBox background={background}>
      <FactBox.Content dynamicHeight={dynamicHeight}>
        <Heading size="xl" level="h3">
          Dolor sit amet
        </Heading>
        <FactBox.Text hasColumns>
          <Text>
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I
            will give you a complete account of the system, and expound the actual teachings of the great explorer of
            the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself,
            because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
            consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain
            pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can
            procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical
            exercise, except to obtain some advantage from it? But why oh why
          </Text>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
    <FactBox background={background} style={{ marginTop: 'var(--space-medium)' }}>
      <FactBox.Content dynamicHeight={dynamicHeight}>
        <Heading size="xl" level="h3">
          Dolor sit amet
        </Heading>
        <FactBox.Text hasColumns>
          <List>
            <List.Item>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci maxime culpa veritatis modi! Optio
              harum exercitationem repellat, dicta saepe placeat officiis, incidunt labore reiciendis inventore eveniet
              dolores nihil voluptates. Labore.
            </List.Item>
            <List.Item>
              Necessitatibus excepturi nobis iusto, ipsa similique eius provident a aperiam aspernatur minus tempore cum
              ad quos ut officiis molestiae neque architecto mollitia saepe amet suscipit temporibus soluta eligendi
              qui. Voluptatum.
            </List.Item>
            <List.Item>
              Similique, labore incidunt, exercitationem aspernatur sint culpa neque at quae ducimus sunt quas harum
              animi fugit! Quis eveniet ullam quibusdam recusandae reiciendis, fuga amet laboriosam debitis labore eos
              ex sed?
            </List.Item>
          </List>
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
  </>
)

WithLongText.parameters = {
  docs: {
    storyDescription: `If the text contains more than 800 characters and has no image, it will split into two columns.
    Remember to set this using the hasColumns prop.`,
  },
}

WithLongText.argTypes = {
  background: {
    control: {
      type: 'radio',
      options: ['none', 'warm', 'cold'],
    },
    defaultValue: 'warm',
  },
  dynamicHeight: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
}
