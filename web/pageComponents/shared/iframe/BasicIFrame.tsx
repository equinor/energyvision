import type { IFrameData } from '../../../types/index'
import { BackgroundContainer } from '@components'
import IFrame from './IFrame'
import { Heading } from '@core/Typography'

const BasicIFrame = ({ data, ...rest }: { data: IFrameData }) => {
  const { title, frameTitle, url, cookiePolicy = ['none'], designOptions } = data || {}
  if (!url) return null

  const { height, aspectRatio, background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest}>
      <div className="py-16 px-layout-lg max-w-viewport mx-auto">
        {title && <Heading className={'pt-0 pb-8 pl-0 pr-0 text-left'} value={title} />}
        <IFrame
          frameTitle={frameTitle}
          url={url}
          cookiePolicy={cookiePolicy}
          aspectRatio={aspectRatio}
          height={height}
          hasSectionTitle={!!title}
        />
      </div>
    </BackgroundContainer>
  )
}

export default BasicIFrame
