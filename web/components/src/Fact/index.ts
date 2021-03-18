import { Fact as FactWrapper, FactProps } from './Fact'
import { Title } from './Title'

type FactCompundProps = typeof FactWrapper & {
  Title: typeof Title
}

const Fact = FactWrapper as FactCompundProps

Fact.Title = Title

export { Fact }
export type { FactProps }
