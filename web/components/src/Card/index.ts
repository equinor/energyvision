import { Card as CardWrapper, CardProps } from './Card'
import { Media } from './Media'
import { Eyebrow } from './Eyebrow'
import { Title } from './Title'
import { Action } from './Action'
import { Content } from './Content'

type CardCompundProps = typeof CardWrapper & {
  Media: typeof Media
  Eyebrow: typeof Eyebrow
  Title: typeof Title
  Action: typeof Action
  Content: typeof Content
}

const Card = CardWrapper as CardCompundProps

Card.Media = Media
Card.Eyebrow = Eyebrow
Card.Title = Title
Card.Action = Action
Card.Content = Content

export { Card }
export type { CardProps }
