import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers'
import GridLinkArrow from './GridLinkArrow'
import { getColorForTheme } from '../../pageComponents/shared/textTeaser/theme'
import { GridTextBlockData } from '../../types/types'
import Blocks from '../../pageComponents/shared/portableText/Blocks'

type GridTextBlockProps = {
  data: GridTextBlockData
  className?: string
}

const GridTextBlock = ({ data, className }: GridTextBlockProps) => {
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
      className={`relative w-full h-full flex flex-col items-center ${
        action ? 'pt-16 justify-between' : 'py-12 justify-center'
      } ${theme !== null ? backgroundUtility : ''} `}
    >
      {content && (
        <div className="px-12 flex flex-col justify-center">
          <Blocks
            value={content}
            proseClassName="prose-campaign"
            className={`flex flex-col gap-sm ${action ? '' : ''} ${contentClassNames} ${
              theme !== null ? textUtility : ''
            }`}
          />
        </div>
      )}
      {action && url && <GridLinkArrow theme={theme} action={action} />}
    </div>
  )
}

export default GridTextBlock
