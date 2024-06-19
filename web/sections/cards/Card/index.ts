import { Card as CardWrapper, CardProps } from './Card'
import { CardHeader, CardHeaderProps } from './CardHeader'
import { CardContent, CardContentProps } from './CardContent'

type CardCompoundProps = typeof CardWrapper & {
  Header: typeof CardHeader
  Content: typeof CardContent
}

const Card = CardWrapper as CardCompoundProps

Card.Header = CardHeader
Card.Content = CardContent

export default Card
export type { CardProps, CardContentProps, CardHeaderProps }
