import { Heading } from '@components'

export const h2Heading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Heading level="h2" size="lg">
      {children}
    </Heading>
  )
}
