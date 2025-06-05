import type { IFrameData } from '../../../types/index'
import { BackgroundContainer } from '@core/Backgrounds'
import IFrame from './IFrame'
import { Typography } from '@core/Typography'

const BasicIFrame = ({ data, ...rest }: { data: IFrameData }) => {
  const { title, frameTitle, url, cookiePolicy = ['none'], designOptions } = data || {}
  if (!url) return null

  const { height, aspectRatio, background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest}>
      <div className="m-auto max-w-viewport px-layout-lg">
        {title && (
          <Typography className="px-0 pt-0 pb-8 text-left">
            <>{title}</>
          </Typography>
        )}
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
