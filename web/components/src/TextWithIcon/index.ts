import { TextWithIcon as TextWithIconWrapper } from './TextWithIcon'
import { Media } from './Media'
import { Title } from './Title'
import { Text } from './Text'

type TextWithIconProps = typeof TextWithIconWrapper & {
  Media: typeof Media
  Title: typeof Title
  Text: typeof Text
}

const TextWithIcon = TextWithIconWrapper as TextWithIconProps
TextWithIcon.Media = Media
TextWithIcon.Title = Title
TextWithIcon.Text = Text

export { TextWithIcon }
