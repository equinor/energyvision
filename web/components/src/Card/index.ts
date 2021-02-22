import { Card as CardWrapper, CardProps } from './Card'
import { Media } from './Media'
import { Title } from './Title'
import { Action } from './Action'
import { Header } from './Header'

type CardCompundProps = typeof CardWrapper & {
  Media: typeof Media
  Title: typeof Title
  Action: typeof Action
  Header: typeof Header
}

const Card = CardWrapper as CardCompundProps

Card.Media = Media
Card.Title = Title
Card.Action = Action
Card.Header = Header

export { Card }
export type { CardProps }
