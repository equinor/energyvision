import { Card as CardWrapper, CardProps } from './Card'
import { Media, CardMediaProps } from './Media'
import { Text, CardTextProps } from './Text'
import { Action, CardActionProps } from './Action'
import { Header, CardHeaderProps } from './Header'
import { Title } from './Title'
import { Arrow } from './Arrow'

type CardCompundProps = typeof CardWrapper & {
  Media: typeof Media
  Text: typeof Text
  Action: typeof Action
  Header: typeof Header
  Title: typeof Title
  Arrow: typeof Arrow
}

const Card = CardWrapper as CardCompundProps

Card.Media = Media
Card.Text = Text
Card.Action = Action
Card.Header = Header
Card.Title = Title
Card.Arrow = Arrow

export { Card }
export type { CardProps, CardMediaProps, CardTextProps, CardActionProps, CardHeaderProps }
