'use client'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef, useId, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { IFrame } from '@/core/IFrame/IFrame'
import { Tabs } from '@/core/Tabs'
import Blocks from '@/portableText/Blocks'
import type { LayoutGrid } from '@/types'
import type { TabItem, TabsEmbeddedVideosPanel } from './TabsBlock.types'
import TabsInfoPanelItem from './TabsInfoPanelItem'
import TabsKeyNumberItem from './TabsKeyNumberItem'
import { getColorForTabsTheme } from './tabThemes'

const { TabList, Tab, TabPanel } = Tabs

const YOUTUBE_EMBED_BASE_URL = 'https://www.youtube.com/embed/'

const getYoutubeEmbedUrl = (videoId?: string) => {
  if (!videoId) return null

  const normalizedVideoId = videoId.trim()
  const isValidYoutubeId = /^[A-Za-z0-9_-]{11}$/.test(normalizedVideoId)

  if (!isValidYoutubeId) return null

  return `${YOUTUBE_EMBED_BASE_URL}${normalizedVideoId}`
}

export type TabsBlockProps = {
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  designOptions: {
    theme: number
  }
  tabList: TabItem[]
  id?: string
  hideTitle?: boolean
  anchor?: string
  className?: string
  layoutGrid?: LayoutGrid
}

const TabsBlock = forwardRef<HTMLDivElement, TabsBlockProps>(function TabsBlock(
  {
    title,
    ingress,
    designOptions,
    tabList,
    id,
    hideTitle = false,
    anchor,
    className = '',
    layoutGrid = 'md',
  },
  ref,
) {
  const theme = getColorForTabsTheme(designOptions?.theme ?? 0)
  const headingId = useId()
  const tabsListRef = useRef<HTMLDivElement>(null)

  //Select first items panel type and use for rest. Editors advised to use same type in studio
  const tabPanelVariant = tabList?.[0]?.panel?.type

  //Tabslist needs to span full width if one of these
  const hasFullWidthImage = tabList.some((tabItem: any) => {
    return (
      tabItem.panel?.type === 'tabsInfoPanel' &&
      (tabItem.panel?.imageVariant === 'backgroundImage' ||
        tabItem.panel?.imageVariant === 'bannerImage')
    )
  })
  const getPaddingInfoPanel = () => {
    switch (layoutGrid) {
      case 'lg':
        return `lg:mx-layout-lg`
      case 'md':
        return `lg:mx-layout-md`
      default:
        return `lg:mx-layout-sm`
    }
  }
  const getPaddingKeyNumbers = () => {
    switch (layoutGrid) {
      case 'sm':
        return `lg:px-layout-sm`
      case 'lg':
        return `lg:px-layout-lg`
      default:
        return `lg:px-layout-md`
    }
  }

  return (
    <div
      ref={ref}
      id={anchor}
      className={twMerge(
        '',
        id && 'scroll-mt-topbar',
        tabPanelVariant === 'tabsKeyNumbers' && theme?.backgroundUtility,
        tabPanelVariant === 'tabsEmbeddedVideosPanel' &&
          theme?.backgroundUtility,
        tabPanelVariant === 'tabsInfoPanel' &&
          `max-w-content ${getPaddingInfoPanel()} ${theme?.backgroundUtility} mb-page-content lg:bg-white-100`,
        className,
      )}
    >
      <div
        className={twMerge(
          `flex w-full flex-col`,
          tabPanelVariant === 'tabsKeyNumbers' && `mx-auto max-w-content gap-6`,
          tabPanelVariant === 'tabsEmbeddedVideosPanel' &&
            `mx-auto max-w-content gap-6`,
          tabPanelVariant === 'tabsInfoPanel' &&
            `${theme?.backgroundUtility} rounded-md`,
          tabPanelVariant === 'tabsInfoPanel' &&
            !hasFullWidthImage &&
            'px-layout-sm lg:px-20',
        )}
      >
        <div
          className={twMerge(
            'px-layout-sm',
            tabPanelVariant === 'tabsInfoPanel' &&
              !hideTitle &&
              `lg:px-20 lg:pt-14`,
            tabPanelVariant === 'tabsKeyNumbers' &&
              !hideTitle &&
              `lg:px-layout-lg`,
          )}
        >
          {title && (
            <Blocks
              id={headingId}
              value={title}
              variant='h2'
              className={`${hideTitle ? 'sr-only' : ''}`}
            />
          )}
          {ingress && <Blocks variant='ingress' value={ingress} />}
        </div>
        <div
          className={twMerge(
            tabPanelVariant === 'tabsKeyNumbers' &&
              `px-layout-sm ${getPaddingKeyNumbers()}`,
          )}
        >
          {tabList && tabList?.length > 0 && (
            <Tabs
              defaultValue={tabList[0]?.id}
              {...(hideTitle && { 'aria-labelledby': headingId })}
              className={`flex w-full flex-col items-center`}
            >
              <TabList
                ref={tabsListRef}
                className={twMerge(
                  tabPanelVariant === 'tabsInfoPanel' &&
                    !hasFullWidthImage &&
                    'px-layout-sm lg:px-10',
                )}
              >
                {tabList?.map((tab: TabItem, i: number) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Tab
                      key={`${tab.id}_index_${i}`}
                      value={tab.id}
                      className={twMerge(
                        hasFullWidthImage && i === 0 && 'lg:pl-20',
                        hasFullWidthImage &&
                          i === tabList.length - 1 &&
                          'lg:pr-20',
                      )}
                    >
                      {tab.title}
                    </Tab>
                  )
                })}
              </TabList>
              {tabList?.map((tabItem: TabItem, i: number) => {
                return (
                  <TabPanel
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${tabItem?.id}_index_${i}`}
                    value={tabItem.id}
                    className={twMerge(
                      tabPanelVariant === 'tabsKeyNumbers' &&
                        'w-full pt-14 pb-page-content max-lg:px-layout-sm',
                      tabPanelVariant === 'tabsEmbeddedVideosPanel' &&
                        'w-full pt-10 pb-page-content max-lg:px-layout-sm',
                    )}
                  >
                    {tabItem.panel?.type === 'tabsKeyNumbers' && (
                      <>
                        {tabItem.panel?.items && (
                          <ul
                            {...(title &&
                              hideTitle && { 'aria-labelledby': headingId })}
                            className={twMerge(
                              'flex w-full flex-col gap-6 md:grid md:grid-cols-2',
                              tabItem.panel?.items?.length < 4 &&
                                '3xl:auto-cols-fr 3xl:grid-flow-col',
                            )}
                          >
                            {tabItem.panel?.items?.map((tabsKeyNumber: any) => {
                              return (
                                <li key={tabsKeyNumber.id}>
                                  <TabsKeyNumberItem
                                    theme={designOptions.theme}
                                    keyNumber={tabsKeyNumber?.keyNumber}
                                    unit={tabsKeyNumber?.unit}
                                    description={tabsKeyNumber?.description}
                                  />
                                </li>
                              )
                            })}
                          </ul>
                        )}
                        {tabItem?.panel?.disclaimer && (
                          <Blocks
                            value={tabItem?.panel?.disclaimer}
                            className='pt-4 text-sm italic lg:px-10'
                          />
                        )}
                      </>
                    )}
                    {tabItem.panel?.type === 'tabsInfoPanel' && (
                      <TabsInfoPanelItem
                        theme={designOptions.theme}
                        {...tabItem.panel}
                      />
                    )}
                    {tabItem.panel?.type === 'tabsEmbeddedVideosPanel' && (
                      <ul className='flex flex-wrap gap-6 px-layout-md'>
                        {(tabItem.panel as TabsEmbeddedVideosPanel)?.items
                          ?.filter(item => getYoutubeEmbedUrl(item?.videoId))
                          .map((videoItem, videoIndex) => {
                            const embedUrl = getYoutubeEmbedUrl(
                              videoItem.videoId,
                            )

                            if (!embedUrl) return null

                            const frameTitle =
                              videoItem.title && videoItem.title.length > 0
                                ? toPlainText(videoItem.title)
                                : `Embedded YouTube video ${videoIndex + 1}`

                            return (
                              <li
                                key={videoItem.id}
                                className='basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]'
                              >
                                <div className='overflow-hidden rounded-card'>
                                  <IFrame
                                    frameTitle={frameTitle}
                                    url={embedUrl}
                                    cookiePolicy={
                                      (tabItem.panel as TabsEmbeddedVideosPanel)
                                        ?.cookiePolicy || ['none']
                                    }
                                    aspectRatio='16:9'
                                    hasSectionTitle={false}
                                  />
                                </div>
                                {videoItem.title && (
                                  <Blocks
                                    value={videoItem.title}
                                    className='pt-3 text-sm'
                                  />
                                )}
                              </li>
                            )
                          })}
                      </ul>
                    )}
                  </TabPanel>
                )
              })}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
})

export default TabsBlock
