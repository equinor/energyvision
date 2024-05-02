import { twMerge } from 'tailwind-merge'
import { BlockType } from '../../pageComponents/shared/portableText/helpers/defaultSerializers'
import { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/react'
import { getUrlFromAction } from '../../common/helpers'
import GridLinkArrow from './GridLinkArrow'
import { getColorForTheme } from '../../pageComponents/shared/textTeaser/theme'
import { GridTextBlockData } from '../../types/types'

type GridTextBlockProps = {
  data: GridTextBlockData
  className?: string
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const gridContentBlocks: BlockType = {
  //@ts-ignore
  smallText: ({ children }: PortableTextBlock) => <div className="text-sm">{<>{children}</>}</div>,
  //@ts-ignore
  largeText: ({ children }: PortableTextBlock) => <div className="text-2xl">{<>{children}</>}</div>,
  //@ts-ignore
  extraLargeText: ({ children }: PortableTextBlock) => {
    return <div className="text-5xl lg:text-6xl 2xl:text-8xl font-medium">{<>{children}</>}</div>
  },
  //@ts-ignore
  normal: ({ children }: PortableTextBlock) => {
    return (
      <span className="text-base font-normal">
        <>{children}</>
      </span>
    )
  },
}
/* eslint-enable @typescript-eslint/ban-ts-comment */

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
  console.log('theme', theme)
  console.log('backgroundUtility', backgroundUtility)
  console.log('textUtility', textUtility)
  return (
    <div
      className={`w-full h-full flex flex-col ${action ? 'pt-16 justify-between' : 'py-12 justify-center'} ${
        theme !== null ? backgroundUtility : ''
      } `}
    >
      <div
        className={`px-10 lg:px-20 flex flex-col gap-6 ${action ? '' : ''} ${contentClassNames} ${
          theme !== null ? textUtility : ''
        }`}
      >
        {content && (
          <PortableText
            value={content}
            components={{
              block: {
                ...gridContentBlocks,
              },
            }}
          />
        )}
      </div>
      {action && url && <GridLinkArrow theme={theme} action={action} />}
    </div>
  )
}

export default GridTextBlock
