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
    titleThemeFromNormal,
    contentTheme,
    contentAlignment,
    imageBackground,
  } = data
  const url = action && getUrlFromAction(action)

  const contentAlignmentUtilities = {
    center: 'justify-center items-center',
    right: 'justify-right items-center',
    left: 'justify-left items-center',
    'bottom-left': 'justify-start items-end',
    'bottom-center': 'justify-center items-end',
  }

  const textClassNames = twMerge(`${(title || themedTitle) && content ? 'text-sm' : 'text-md'}`, className)

  const {
    backgroundUtility: titleBgUtility,
    textUtility: titleTextUtility,
    dark,
  } = getColorForTheme(useThemedTitle ? titleThemeFromLarger : titleThemeFromNormal)

  const { textUtility: contentTextUtility, backgroundUtility: contentBgUtility } = getColorForTheme(contentTheme ?? 0)

  const imageBgOptions = {
    background: {
      type: 'backgroundImage' as BackgroundTypes,
      backgroundImage: imageBackground,
      dark:
        (titleThemeFromNormal ?? titleThemeFromLarger ?? contentTheme) === 12 && !imageBackground?.useLight
          ? true
          : false,
    },
  }

  let titleTextColor = (titleThemeFromNormal || titleThemeFromLarger) !== null ? titleTextUtility : ''
  if (imageBackground?.image) {
    titleTextColor = 'text-white-100'
    if (imageBackground?.useLight) {
      titleTextColor = 'text-slate-80'
    }
  }
  let mainContentTextColor = contentTheme !== null ? contentTextUtility : titleTextColor
  if (imageBackground?.image) {
    mainContentTextColor = 'text-white-100'
    if (imageBackground?.useLight) {
      mainContentTextColor = 'text-slate-80'
    }
  }

  const backgroundUtility = titleBgUtility ?? contentBgUtility ?? ''

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
        return '4xl:grid 4xl:grid-cols-[35%_60%] gap-10 lg:items-start'
      case 'threeColumns':
      default:
        return 'lg:items-end'
    }
  }
  const serializerClassnames = {
    largeText: `leading-tight text-balance`,
    normal: `text-lg leading-snug text-balance`,
  }

  const mainContent = (
    <>
      <div
        className={envisTwMerge(
          `${dark ? 'dark' : ''} h-fit ${
            (title || (useThemedTitle && themedTitle)) && content
              ? `flex flex-col items-start lg:items-end text-balance ${getLayout()}`
              : ``
          }`,
        )}
      >
        {overline ? (
          <hgroup className={`flex flex-col gap-2 max-w-text`}>
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
              />
            )}
          </>
        )}
        {content && (
          <div className={`flex flex-col justify-center ${rowType === 'span3' ? 'lg:-translate-y-[10px]' : ''}`}>
            <Blocks
              value={content}
              proseClassName="prose-campaign"
              className={`flex flex-col gap-sm ${textClassNames} ${mainContentTextColor} text-balance`}
            />
          </div>
        )}
      </div>
      {action && url && (
        <GridLinkArrow
          theme={contentTheme ?? titleThemeFromNormal ?? titleThemeFromLarger}
          hasBackgroundImage={!!imageBackground?.image}
          action={action}
        />
      )}
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
        ${contentAlignment ? contentAlignmentUtilities[contentAlignment ?? 'center'] : ''}
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
      className={`p-10 lg:p-12 relative w-full h-full flex flex-col overflow-y-auto ${backgroundUtility} ${
        dark ? 'dark' : ''
      } ${contentAlignment ? contentAlignmentUtilities[contentAlignment ?? 'center'] : ''}`}
    >
      {mainContent}
    </div>
  )
}

export default GridTextBlock
