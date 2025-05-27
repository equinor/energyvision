import { Typography } from '@core/Typography'

export const h2Heading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Typography as="h2" variant="lg">
      {children}
    </Typography>
  )
}
