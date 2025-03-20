import { Heading, HeadingProps } from '@components'

const HitHeading = ({ children, ...rest }: HeadingProps) => {
  return (
    <Heading
      level="h2"
      size="sm"
      className="relative inline-block mb-2 group-hover:underline group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-mist-blue-100"
      {...rest}
    >
      {children}
    </Heading>
  )
}

export default HitHeading
