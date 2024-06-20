import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers'
import GridLinkArrow from './GridLinkArrow'
import { getColorForTheme } from '../../pageComponents/shared/textTeaser/theme'
import { BackgroundTypes, GridTextBlockData } from '../../types/types'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { BackgroundContainer } from '@components/Backgrounds'
import { Heading, Typography } from '@core/Typography'
import { RowType } from './mapGridContent'

type GridTextBlockProps = {
  data: GridTextBlockData
  rowType?: RowType
  className?: string
}

const GridTextBlock = ({ data, className, rowType }: GridTextBlockProps) => {
  const { action, overline, title, content, textAlignment = 'left', theme, backgroundImage } = data
  const url = action && getUrlFromAction(action)

  const textAlignmentStyles = {
    center: 'justify-center text-center',
    right: 'justify-center text-start xl:items-end xl:text-end xl:ml-auto',
    left: 'justify-center text-start xl:items-start xl:mr-auto',
  }
  const contentAlignment = {
    center: 'justify-center items-center',
    right: 'justify-right items-center',
    left: 'justify-left items-center',
    'bottom-left': 'justify-start items-end',
    'bottom-center': 'justify-center items-end',
  }

  const textClassNames = twMerge(
    `
    ${textAlignmentStyles[textAlignment]}
  ${title && content ? 'text-sm' : 'text-md'}
    `,
    className,
  )
  const { backgroundUtility, textUtility } = getColorForTheme(theme ?? 0)

  const imageBgOptions = {
    background: {
      type: 'backgroundImage' as BackgroundTypes,
      backgroundImage,
      dark: theme === 12 && !backgroundImage?.useLight ? true : false,
    },
  }

  let mainContentTextColor = theme !== null ? textUtility : ''
  if (backgroundImage?.image) {
    mainContentTextColor = 'text-white-100'
    if (backgroundImage?.useLight) {
      mainContentTextColor = 'text-slate-80'
    }
  }

  const lightGradientForContentAlignment = {
    center: '',
    right: '',
    left: '',
    'bottom-left':
      rowType === 'span3' ? 'white-to-top-tall-gradient lg:white-to-top-gradient' : 'white-to-top-tall-gradient',
    'bottom-center':
      rowType === 'span3' ? 'white-to-top-tall-gradient lg:white-to-top-gradient' : 'white-to-top-tall-gradient',
  }
  const darkGradientForContentAlignment = {
    center: '',
    right: '',
    left: '',
    'bottom-left':
      rowType === 'span3' ? 'black-to-top-tall-gradient lg:black-to-top-gradient' : 'black-to-top-tall-gradient',
    'bottom-center':
      rowType === 'span3' ? 'black-to-top-tall-gradient lg:black-to-top-gradient' : 'black-to-top-tall-gradient',
  }

  const mainContent = (
    <>
      <div
        className={`${
          title && content
            ? `flex flex-col items-start lg:items-end justify-end ${
                rowType !== 'span3' ? '4xl:grid 4xl:grid-cols-[35%_60%] gap-4' : 'lg:grid lg:grid-cols-[35%_60%] gap-4'
              } `
            : ``
        }`}
      >
        {overline ? (
          <hgroup className={`flex flex-col gap-2 mb-1 max-w-text`}>
            <Typography variant="overline" className="text-xs">
              {overline}
            </Typography>
            {title && <Heading value={title} as="h2" variant="lg" className="max-w-text" />}
          </hgroup>
        ) : (
          <>{title && <Heading value={title} as="h2" variant="lg" className={`mb-2`} />}</>
        )}
        {content && (
          <div className="flex flex-col justify-center">
            <Blocks
              value={content}
              proseClassName="prose-campaign"
              className={`flex flex-col gap-sm ${textClassNames} ${mainContentTextColor} text-balance`}
            />
          </div>
        )}
      </div>
      {action && url && <GridLinkArrow theme={theme} hasBackgroundImage={!!backgroundImage?.image} action={action} />}
    </>
  )

  return backgroundImage?.image ? (
    <BackgroundContainer
      {...imageBgOptions}
      className={`h-full aspect-auto`}
      dontSplit
      scrimClassName={`p-10 
        lg:p-12 
        flex 
        ${contentAlignment[backgroundImage?.contentAlignment]} 
        text-balance
        max-lg:min-h-[420px]
        ${
          backgroundImage?.useLight
            ? lightGradientForContentAlignment[backgroundImage?.contentAlignment]
            : darkGradientForContentAlignment[backgroundImage?.contentAlignment]
        }
        `}
    >
      {mainContent}
    </BackgroundContainer>
  ) : (
    <div
      className={`p-10 lg:p-12 relative w-full h-full flex flex-col items-center justify-center overflow-y-auto ${
        theme !== null ? backgroundUtility : ''
      }`}
    >
      {mainContent}
    </div>
  )
}

export default GridTextBlock
