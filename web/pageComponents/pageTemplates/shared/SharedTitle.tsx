import TitleText from '../../shared/portableText/TitleText'
import type { PortableTextBlock } from '@portabletext/types'
import { BackgroundContainer, BackgroundContainerProps } from '@components/Backgrounds'

type SharedTitleProps = {
  sharedTitle: PortableTextBlock[]
} & BackgroundContainerProps

const SharedTitle = ({ sharedTitle, background }: SharedTitleProps) => {
  return (
    <BackgroundContainer background={background}>
      <TitleText
        value={sharedTitle}
        level="h1"
        size="3xl"
        className="py-8 px-layout-lg max-w-viewport mx-auto text-pretty"
      />
    </BackgroundContainer>
  )
}

export default SharedTitle
