import type { PortableTextBlock } from '@portabletext/types'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { Background } from '@/types'

type SharedTitleProps = {
  sharedTitle: PortableTextBlock[]
  background?: Background
}

const SharedTitle = ({ sharedTitle, background }: SharedTitleProps) => {
  const { bg, dark } = getBgAndDarkFromBackground({ background })
  return (
    <div className={`${bg} ${dark ? 'dark' : ''} px-layout-sm lg:px-layout-lg`}>
      <Blocks value={sharedTitle} id="mainTitle" variant="h1" />
    </div>
  )
}

export default SharedTitle
