import { Fact as FactWrapper, FactProps } from './Fact'
import { Text } from './Text'

type FactCompundProps = typeof FactWrapper & {
  Text: typeof Text
}

const Fact = FactWrapper as FactCompundProps

Fact.Text = Text

export { Fact }
export type { FactProps }
