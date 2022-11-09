import { List } from '@components'

export const NumberedList = ({ children }: { children?: React.ReactNode }) => {
  return <List variant="numbered">{children}</List>
}
