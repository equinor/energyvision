import type { PortableTextBlock } from '@portabletext/types'
import { BackgroundContainer, BackgroundContainerProps } from '@components/Backgrounds'
import { Heading } from '@core/Typography'

type SharedTitleProps = {
  sharedTitle: PortableTextBlock[]
} & BackgroundContainerProps

const SharedTitle = ({ sharedTitle, background }: SharedTitleProps) => {
  return (
    <BackgroundContainer background={background}>
      <Heading
        value={sharedTitle}
        id="mainTitle"
        as="h1"
        variant="3xl"
        className="py-11 my-0 px-layout-lg max-w-viewport mx-auto text-pretty"
      />
    </BackgroundContainer>
  )
}

export default SharedTitle
