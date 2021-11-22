import { Card as CardWrapper, CardProps, CardLink } from './Card'
import { Media, CardMediaProps } from './Media'
import { Text, CardTextProps } from './Text'
import { Action, CardActionProps } from './Action'
import { Header, CardHeaderProps } from './Header'
import { Title } from './Title'
import { Arrow } from './Arrow'
import { Eyebrow, EyebrowProps } from './Eyebrow'
import { StyledPortraitCard } from './PortraitCard'
import { StyledLandscapeCard } from './LandscapeCard'

type CardCompundProps = typeof CardWrapper & {
  Media: typeof Media
  Text: typeof Text
  Action: typeof Action
  Header: typeof Header
  Title: typeof Title
  Arrow: typeof Arrow
  CardLink: typeof CardLink
  Eyebrow: typeof Eyebrow
  StyledPortraitCard: typeof StyledPortraitCard
  StyledLandscapeCard: typeof StyledLandscapeCard
}

const Card = CardWrapper as CardCompundProps

Card.Media = Media
Card.Text = Text
Card.Action = Action
Card.Header = Header
Card.Title = Title
Card.Arrow = Arrow
Card.CardLink = CardLink
Card.Eyebrow = Eyebrow
Card.StyledPortraitCard = StyledPortraitCard
Card.StyledLandscapeCard = StyledLandscapeCard

export { Card }
export type { CardProps, CardMediaProps, CardTextProps, CardActionProps, CardHeaderProps, EyebrowProps }
