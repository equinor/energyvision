import { Fact as FactWrapper, FactProps } from './Fact'
import { Title } from './Title'
import { Text } from './Text'

type FactCompundProps = typeof FactWrapper & {
  Title: typeof Title
  Text: typeof Text
}

const Fact = FactWrapper as FactCompundProps

Fact.Title = Title
Fact.Text = Text

export { Fact }
export type { FactProps }
