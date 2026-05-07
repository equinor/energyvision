'use client'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef, useId, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Tabs } from '@/core/Tabs'
import Blocks from '@/portableText/Blocks'
import type { TabItem } from './TabsBlock.types'
import TabsInfoPanelItem from './TabsInfoPanelItem'
import TabsKeyNumberItem from './TabsKeyNumberItem'
import { getColorForTabsTheme } from './tabThemes'

const { TabList, Tab, TabPanel } = Tabs

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

  return (
    <div
      ref={ref}
      id={anchor}
      className={twMerge(
        'mx-auto max-w-content',
        id && 'scroll-mt-topbar',
        tabPanelVariant === 'tabsKeyNumbers' && theme?.backgroundUtility,
        tabPanelVariant !== 'tabsKeyNumbers' &&
          `6xl:mx-auto lg:mx-layout-sm ${theme?.backgroundUtility} mb-page-content lg:bg-white-100`,
        className,
      )}
    >
      <div
        className={twMerge(
          `flex w-full flex-col`,
          tabPanelVariant === 'tabsKeyNumbers' && `gap-6`,
          tabPanelVariant !== 'tabsKeyNumbers' &&
            `${theme?.backgroundUtility} rounded-md`,
          tabPanelVariant !== 'tabsKeyNumbers' &&
            !hasFullWidthImage &&
            'px-layout-sm lg:px-20',
        )}
      >
        <div
          className={twMerge(
            tabPanelVariant === 'tabsInfoPanel' &&
              !hideTitle &&
              `px-layout-sm lg:px-20 lg:pt-14`,
            tabPanelVariant !== 'tabsInfoPanel' &&
              !hideTitle &&
              `px-layout-sm lg:px-layout-lg`,
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
          className={`${
            tabPanelVariant === 'tabsKeyNumbers'
              ? `px-layout-sm lg:px-layout-md`
              : ``
          }`}
        >
          {tabList && tabList?.length > 0 && (
            <Tabs
              defaultValue={tabList[0]?.id}
              {...(hideTitle && { 'aria-labelledby': headingId })}
              className={`flex w-full flex-col items-center`}
            >
              <TabList
                ref={tabsListRef}
                className={`${hasFullWidthImage ? '' : 'px-layout-sm lg:px-10'}`}
              >
                {tabList?.map((tab: TabItem, i: number) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Tab key={`${tab.id}_index_${i}`} value={tab.id}>
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
                      '',
                      tabPanelVariant === 'tabsKeyNumbers' &&
                        'pt-14 pb-page-content max-lg:px-layout-sm',
                    )}
                  >
                    {tabItem.panel?.type === 'tabsKeyNumbers' && (
                      <>
                        {tabItem.panel?.items && (
                          <ul
                            {...(title &&
                              hideTitle && { 'aria-labelledby': headingId })}
                            className={twMerge(
                              'flex flex-col gap-6 md:grid md:grid-cols-2',
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
                            className='px-layout-sm pt-4 text-sm italic lg:px-10'
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
