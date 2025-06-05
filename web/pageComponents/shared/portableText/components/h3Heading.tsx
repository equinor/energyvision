import { Typography } from '@core/Typography'

export const h3Heading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Typography as="h3" variant="lg">
      {children}
    </Typography>
  )
}
