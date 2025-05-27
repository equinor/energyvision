import type { IFrameData } from '../../../types/index'
import { BackgroundContainer } from '@core/Backgrounds'
import TitleText from '../portableText/TitleText'
import IFrame from './IFrame'

const BasicIFrame = ({ data, ...rest }: { data: IFrameData }) => {
  const { title, frameTitle, url, cookiePolicy = ['none'], designOptions } = data || {}
  if (!url) return null

  const { height, aspectRatio, background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest}>
      <div className="m-auto max-w-viewport px-layout-lg">
        {title && <TitleText className="px-0 pt-0 pb-8 text-left" value={title} />}
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
