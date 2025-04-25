import type { IFrameData } from '../../../types/index'
import { BackgroundContainer } from '@components'
import TitleText from '../portableText/TitleText'
import IFrame from './IFrame'
import { twMerge } from 'tailwind-merge'

const BasicIFrame = ({ data, ...rest }: { data: IFrameData }) => {
  const { title, frameTitle, url, cookiePolicy = ['none'], designOptions } = data || {}
  if (!url) return null

  const { height, aspectRatio, background } = designOptions

  return (
    <BackgroundContainer background={background} {...rest}>
      <div className="p-[var(--iframe-innerPadding,var(--space-3xLarge)_var(--layout-paddingHorizontal-large))] max-w-[var(--iframe-maxWidth,var(--maxViewportWidth))] mx-auto">
        {title && (
          <TitleText
            className={twMerge(
              'p-[var(--iframe-titlePadding, 0 0 var(--space-large) 0)]',
              'pt-0 pb-8 pl-0 pr-0 text-left',
            )}
            value={title}
          />
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
