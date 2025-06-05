import type { IFrameData, PortableTextBlock } from '../../../types/index'
import { BackgroundContainer } from '@core/Backgrounds'
import IFrame from './IFrame'
import { Typography } from '@core/Typography'
import { toPlainText } from '@portabletext/react'

const BasicIFrame = ({ data, ...rest }: { data: IFrameData }) => {
  const { title, frameTitle, url, cookiePolicy = ['none'], designOptions } = data || {}
  if (!url) return null
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  const { height, aspectRatio, background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest}>
      <div className="m-auto max-w-viewport px-layout-lg">
        {title && <Typography className="px-0 pt-0 pb-8 text-left">{plainTitle}</Typography>}
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
