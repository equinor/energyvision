import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers'
import GridLinkArrow from './GridLinkArrow'
import { getColorForTheme } from '../../pageComponents/shared/textTeaser/theme'
import { GridTextBlockData } from '../../types/types'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { forwardRef } from 'react'

type GridTextBlockProps = {
  data: GridTextBlockData
  className?: string
}

const GridTextBlock = forwardRef<HTMLDivElement, GridTextBlockProps>(function GridTextBlock({ data, className }, ref) {
  const { action, content, textAlignment = 'left', theme } = data
  const url = action && getUrlFromAction(action)

  const contentAlignment = {
    center: 'justify-center text-center',
    right: 'justify-center text-start xl:items-end xl:text-end xl:ml-auto',
    left: 'justify-center text-start xl:items-start xl:mr-auto',
  }

  const contentClassNames = twMerge(`${contentAlignment[textAlignment]}`, className)
  const { backgroundUtility, textUtility } = getColorForTheme(theme ?? 0)

  return (
    <div
      ref={ref}
      className={`p-10 lg:p-12 relative w-full h-full flex flex-col items-center justify-center overflow-y-auto ${
        theme !== null ? backgroundUtility : ''
      }`}
    >
      {content && (
        <div className="flex flex-col justify-center">
          <Blocks
            value={content}
            proseClassName="prose-campaign"
            className={`flex flex-col gap-sm ${contentClassNames} ${theme !== null ? textUtility : ''}`}
          />
        </div>
      )}
      {action && url && <GridLinkArrow theme={theme} action={action} />}
    </div>
  )
})

export default GridTextBlock
