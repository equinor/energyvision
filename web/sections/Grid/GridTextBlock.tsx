import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@/core/Typography'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { resolveImage } from '@/sanity/lib/utils'
import { getColorForTheme } from '@/sections/teasers/TextTeaser/theme'
import Blocks from '../../portableText/Blocks'
import type { GridTextBlockData } from '../../types/index'
import GridLinkArrow from './GridLinkArrow'
import type { RowType } from './mapGridContent'

type GridTextBlockProps = {
  data: GridTextBlockData
  rowType?: RowType
  className?: string
}

const GridTextBlock = forwardRef<HTMLDivElement, GridTextBlockProps>(
  function GridTextBlock({ data, className, rowType }, ref) {
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
    const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)
    const { url: imageUrl } = resolveImage({
      image: imageBackground?.image,
      grid: 'lg',
      isLargerDisplays,
    })

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

    let titleTextColor = '**:text-slate-80'
    let contentTextColor = '**:text-slate-80'
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
      const {
        textUtility: contentTextUtility,
        backgroundUtility: contentBgUtility,
      } = getColorForTheme(contentTheme)
      if (contentBgUtility === titleBgUtility && contentTextUtility) {
        contentTextColor = contentTextUtility
      }
      if (contentBgUtility !== titleBgUtility && dark) {
        contentTextColor = '**:text-white-100'
      }
      bgColor = titleBgUtility ?? contentBgUtility ?? 'bg-white-100'
    }
    if (!useThemedTitle && theme) {
      const {
        backgroundUtility: commonBgUtility,
        textUtility: commonTextUtility,
      } = getColorForTheme(theme)
      if (commonTextUtility) {
        titleTextColor = commonTextUtility
        contentTextColor = commonTextUtility
      }
      if (commonBgUtility) {
        bgColor = commonBgUtility
      }
    }

    if (imageBackground?.image && !imageBackground?.useLight) {
      titleTextColor = '**:text-white-100'
      bgColor = 'bg-slate-80'
      contentTextColor = '**:text-white-100'
    }

    const lightGradientForContentAlignment = {
      center: '',
      right: '',
      left: '',
      'bottom-left':
        rowType === 'span3'
          ? 'white-to-top-tall-gradient lg:white-to-top-gradient'
          : 'white-to-top-tall-gradient',
      'bottom-center':
        rowType === 'span3'
          ? 'white-to-top-tall-gradient lg:white-to-top-gradient'
          : 'white-to-top-tall-gradient',
    }
    const darkGradientForContentAlignment = {
      center: '',
      right: '',
      left: '',
      'bottom-left':
        rowType === 'span3'
          ? 'black-to-top-tall-gradient lg:black-to-top-gradient'
          : 'black-to-top-tall-gradient',
      'bottom-center':
        rowType === 'span3'
          ? 'black-to-top-tall-gradient lg:black-to-top-gradient'
          : 'black-to-top-tall-gradient',
    }

    const getLayout = () => {
      switch (rowType) {
        case 'span3':
          return 'lg:grid lg:grid-cols-[35%_60%] gap-10'
        case 'span2and1':
          return '4xl:grid 4xl:grid-cols-[35%_60%] gap-10'
        default:
          return ''
      }
    }

    const mainContent = (
      <>
        <div
          className={twMerge(
            `h-fit`,
            (title || (useThemedTitle && themedTitle)) &&
              content &&
              `flex flex-col text-balance ${getLayout()}`,
          )}
        >
          <div className={titleTextColor}>
            {overline ? (
              <hgroup
                className={`flex max-w-text flex-col gap-2 ${
                  textContentAlignmentUtilities[contentAlignment ?? 'left']
                }`}
              >
                <Typography variant='overline' className='text-sm'>
                  {overline}
                </Typography>
                {(title || (useThemedTitle && themedTitle)) && (
                  <Blocks
                    variant='h2'
                    //@ts-ignore: todo
                    value={useThemedTitle ? themedTitle : title}
                    /*                   blockClassName={serializerClassnames} */
                  />
                )}
              </hgroup>
            ) : (
              (title || (useThemedTitle && themedTitle)) && (
                <Blocks
                  variant='h2'
                  //@ts-ignore: todo
                  value={useThemedTitle ? themedTitle : title}
                  /*                 blockClassName={serializerClassnames} */
                  className={`${textContentAlignmentUtilities[contentAlignment ?? 'left']}`}
                />
              )
            )}
          </div>
          {content && (
            <div
              className={`flex flex-col justify-end ${rowType === 'span3' ? 'lg:-translate-y-2.5' : ''}`}
            >
              <Blocks
                value={content}
                blockClassName='my-0'
                className={twMerge(
                  'flex flex-col gap-sm text-balance',
                  (title || themedTitle) && content ? 'text-sm' : 'text-md',
                  contentTextColor,
                  textContentAlignmentUtilities[contentAlignment ?? 'left'],
                  className,
                )}
              />
            </div>
          )}
        </div>
        {action && url && <GridLinkArrow bgColor={bgColor} action={action} />}
      </>
    )

    return imageBackground?.image ? (
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={twMerge(
          `relative h-full w-full bg-center bg-cover bg-local bg-no-repeat`,
          !!(
            (((useThemedTitle && titleThemeFromLarger) || contentTheme) ??
              theme) === 12 && !imageBackground?.useLight
          ) && 'dark',
        )}
        ref={ref}
      >
        <div
          className={twMerge(
            'flex h-full w-full text-balance py-10 pr-20 pl-8 max-lg:min-h-[420px] lg:p-12',
            contentAlignmentUtilities[contentAlignment ?? 'center'],
            imageBackground?.useLight
              ? lightGradientForContentAlignment[contentAlignment ?? 'center']
              : darkGradientForContentAlignment[contentAlignment ?? 'center'],
          )}
        >
          {mainContent}
        </div>
      </div>
    ) : (
      <div
        ref={ref}
        className={`relative flex h-full w-full overflow-y-auto p-10 lg:p-12 ${bgColor} ${
          contentAlignmentUtilities[contentAlignment ?? 'center']
        }`}
      >
        {mainContent}
      </div>
    )
  },
)

export default GridTextBlock
