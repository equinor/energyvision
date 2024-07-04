import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers'
import GridLinkArrow from './GridLinkArrow'
import { getColorForTheme } from '../../pageComponents/shared/textTeaser/theme'
import { BackgroundTypes, GridTextBlockData } from '../../types/types'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { BackgroundContainer } from '@components/Backgrounds'
import { Heading, Typography } from '@core/Typography'
import { RowType } from './mapGridContent'
import envisTwMerge from '../../twMerge'

type GridTextBlockProps = {
  data: GridTextBlockData
  rowType?: RowType
  className?: string
}

const GridTextBlock = ({ data, className, rowType }: GridTextBlockProps) => {
  const {
    action,
    overline,
    title,
    content,
    useThemedTitle,
    themedTitle,
    titleThemeFromLarger,
    contentTheme,
    theme,
    contentAlignment,
    imageBackground,
  } = data
  const url = action && getUrlFromAction(action)

  const contentAlignmentUtilities = {
    center: 'justify-center items-center',
    right: 'justify-end items-center',
    left: 'justify-start items-center',
    'bottom-left': 'justify-start items-end',
    'bottom-center': 'justify-center items-end',
  }
  const textContentAlignmentUtilities = {
    center: 'text-center',
    right: 'text-end',
    left: 'text-start',
    'bottom-left': 'text-start',
    'bottom-center': 'text-center',
  }

  const textClassNames = twMerge(`${(title || themedTitle) && content ? 'text-sm' : 'text-md'}`, className)

  let titleTextColor = 'text-slate-80'
  let contentTextColor = 'text-slate-80'
  let bgColor = 'bg-white-100'

  if (useThemedTitle) {
    const {
      backgroundUtility: titleBgUtility,
      textUtility: titleTextUtility,
      dark,
    } = getColorForTheme(titleThemeFromLarger)
    if (titleTextUtility) {
      titleTextColor = titleTextUtility
    }
    const { textUtility: contentTextUtility, backgroundUtility: contentBgUtility } = getColorForTheme(contentTheme)
    if (contentBgUtility === titleBgUtility && contentTextUtility) {
      contentTextColor = contentTextUtility
    }
    if (contentBgUtility !== titleBgUtility) {
      contentTextColor = dark ? 'text-white-100' : 'text-slate-80'
    }
    bgColor = titleBgUtility ?? contentBgUtility ?? 'bg-white-100'
  }
  if (theme) {
    const { backgroundUtility: commonBgUtility, textUtility: commonTextUtility } = getColorForTheme(theme)
    if (commonTextUtility) {
      titleTextColor = commonTextUtility
      contentTextColor = commonTextUtility
    }
    if (commonBgUtility) {
      bgColor = commonBgUtility
    }
  }

  const imageBgOptions = {
    background: {
      type: 'backgroundImage' as BackgroundTypes,
      backgroundImage: imageBackground,
      dark:
        (((useThemedTitle && titleThemeFromLarger) || contentTheme) ?? theme) === 12 && !imageBackground?.useLight
          ? true
          : false,
    },
  }

  if (imageBackground?.image) {
    titleTextColor = 'text-white-100'
    if (imageBackground?.useLight) {
      titleTextColor = 'text-slate-80'
    }
  }

  if (imageBackground?.image) {
    bgColor = 'bg-slate-80'
    contentTextColor = 'text-white-100'
    if (imageBackground?.useLight) {
      contentTextColor = 'text-slate-80'
      bgColor = 'bg-white-100'
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

  const getLayout = () => {
    switch (rowType) {
      case 'span3':
        return 'lg:grid lg:grid-cols-[35%_60%] gap-10'
      case 'span2and1':
        return '4xl:grid 4xl:grid-cols-[35%_60%] gap-10'
      case 'threeColumns':
      default:
        return ''
    }
  }

  const serializerClassnames = {
    largeText: `leading-tight text-balance ${titleTextColor}`,
    normal: `text-lg leading-snug text-balance ${titleTextColor}`,
  }

  const mainContent = (
    <>
      <div
        className={envisTwMerge(
          `h-fit ${
            (title || (useThemedTitle && themedTitle)) && content ? `flex flex-col text-balance ${getLayout()}` : ``
          }`,
        )}
      >
        {overline ? (
          <hgroup
            className={`flex flex-col gap-2 max-w-text ${
              textContentAlignmentUtilities[contentAlignment ?? 'left']
            } ${titleTextColor}`}
          >
            <Typography variant="overline" className="text-sm">
              {overline}
            </Typography>
            {(title || (useThemedTitle && themedTitle)) && (
              <Heading
                as="h2"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                value={useThemedTitle ? themedTitle : title}
                serializerClassnames={serializerClassnames}
                noProse
              />
            )}
          </hgroup>
        ) : (
          <>
            {(title || (useThemedTitle && themedTitle)) && (
              <Heading
                as="h2"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                value={useThemedTitle ? themedTitle : title}
                serializerClassnames={serializerClassnames}
                noProse
                className={`${textContentAlignmentUtilities[contentAlignment ?? 'left']}`}
              />
            )}
          </>
        )}
        {content && (
          <div className={`flex flex-col justify-end ${rowType === 'span3' ? 'lg:-translate-y-[10px]' : ''}`}>
            <Blocks
              value={content}
              proseClassName="prose-campaign"
              className={`flex flex-col gap-sm ${textClassNames} ${contentTextColor} ${
                textContentAlignmentUtilities[contentAlignment ?? 'left']
              } text-balance`}
            />
          </div>
        )}
      </div>
      {action && url && <GridLinkArrow bgColor={bgColor} action={action} />}
    </>
  )

  return imageBackground?.image ? (
    <BackgroundContainer
      {...imageBgOptions}
      className={`h-full aspect-auto`}
      dontSplit
      scrimClassName={`
        py-10
        pl-8
        pr-20 
        lg:p-12 
        flex
        w-full
        h-full
        text-balance
        max-lg:min-h-[420px]
        ${contentAlignmentUtilities[contentAlignment ?? 'center']}
        ${
          imageBackground?.useLight
            ? lightGradientForContentAlignment[contentAlignment ?? 'center']
            : darkGradientForContentAlignment[contentAlignment ?? 'center']
        }
        `}
    >
      {mainContent}
    </BackgroundContainer>
  ) : (
    <div
      className={`p-10 lg:p-12 relative w-full h-full flex overflow-y-auto ${bgColor} ${
        contentAlignmentUtilities[contentAlignment ?? 'center']
      }`}
    >
      {mainContent}
    </div>
  )
}

export default GridTextBlock
