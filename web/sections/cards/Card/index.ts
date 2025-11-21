import { type CardProps, Card as CardWrapper } from './Card'
import { CardContent, type CardContentProps } from './CardContent'
import { CardHeader, type CardHeaderProps } from './CardHeader'

type CardCompoundProps = typeof CardWrapper & {
  Header: typeof CardHeader
  Content: typeof CardContent
}

const Card = CardWrapper as CardCompoundProps

Card.Header = CardHeader
Card.Content = CardContent

export default Card
export type { CardProps, CardContentProps, CardHeaderProps }
