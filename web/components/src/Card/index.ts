import { Card as CardWrapper, CardProps } from './Card'
import { Media, CardMediaProps } from './Media'
import { Title, CardTitleProps } from './Title'
import { Action, CardActionProps } from './Action'
import { Header, CardHeaderProps } from './Header'
import { TailoredTitle } from './MoreTailoredTitle'
import { Arrow } from './Arrow'

type CardCompundProps = typeof CardWrapper & {
  Media: typeof Media
  Title: typeof Title
  Action: typeof Action
  Header: typeof Header
  TailoredTitle: typeof TailoredTitle
  Arrow: typeof Arrow
}

const Card = CardWrapper as CardCompundProps

Card.Media = Media
Card.Title = Title
Card.Action = Action
Card.Header = Header
Card.TailoredTitle = TailoredTitle
Card.Arrow = Arrow

export { Card }
export type { CardProps, CardMediaProps, CardTitleProps, CardActionProps, CardHeaderProps }
