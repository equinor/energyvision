import { FactBox as FactBoxWrapper, FactProps } from './FactBox'
import { Text } from './Text'
import { Image } from './Image'
import { Content } from './Content'

export type FactImagePosition = 'left' | 'right'

type FactBoxCompoundProps = typeof FactBoxWrapper & {
  Image: typeof Image
  Text: typeof Text
  Content: typeof Content
}

const FactBox = FactBoxWrapper as FactBoxCompoundProps
FactBox.Image = Image
FactBox.Text = Text
FactBox.Content = Content
export { FactBox }
export type { FactProps }
