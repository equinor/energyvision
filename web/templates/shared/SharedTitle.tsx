import type { PortableTextBlock } from '@portabletext/types'
import { BackgroundContainer, BackgroundContainerProps } from '@/core/Backgrounds'
import Blocks from '@/portableText/Blocks'

type SharedTitleProps = {
  sharedTitle: PortableTextBlock[]
} & BackgroundContainerProps

const SharedTitle = ({ sharedTitle, background }: SharedTitleProps) => {
  return (
    <BackgroundContainer background={background}>
      <Blocks value={sharedTitle} id="mainTitle" as="h1" variant="3xl" className="py-11 text-pretty" />
    </BackgroundContainer>
  )
}

export default SharedTitle
