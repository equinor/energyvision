import type { PortableTextBlock } from '@portabletext/types'
import { Heading } from '@core/Typography'
import { ColorKeyTokens } from '../../../styles/colorKeyToUtilityMap'
import getBgClassName from '../../../common/helpers/getBackgroundColor'

type SharedTitleProps = {
  sharedTitle: PortableTextBlock[]
  background?: keyof ColorKeyTokens
}

const SharedTitle = ({ sharedTitle, background }: SharedTitleProps) => {
  return (
    <div className={`${getBgClassName(background)} max-w-viewport px-layout-lg mx-auto`}>
      <Heading value={sharedTitle} id="mainTitle" as="h1" variant="3xl" className="py-11 text-pretty" />
    </div>
  )
}

export default SharedTitle
