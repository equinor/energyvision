import { Heading, HeadingProps } from '@components'

const HitHeading = ({ children, ...rest }: HeadingProps) => {
  return (
    <Heading
      level="h2"
      size="sm"
      className="relative inline-block mb-xs hover:underline focus-visible:envis-outline"
      {...rest}
    >
      {children}
    </Heading>
  )
}

export default HitHeading
