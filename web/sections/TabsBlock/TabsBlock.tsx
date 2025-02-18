import { Heading } from '../../core/Typography'
import { twMerge } from 'tailwind-merge'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import { getColorForTabsTheme } from './tabThemes'
import { Tabs } from '@core/Tabs'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import TabsKeyNumberItem from './TabsKeyNumberItem'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import TabsInfoPanelItem from './TabsInfoPanelItem'
import { PortableTextBlock } from '@portabletext/types'
import { TabItem } from './TabsBlock.types'

const { TabList, Tab, TabPanel } = Tabs

export type TabsBlockProps = {
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  designOptions: {
    theme: {
      value?: number
    }
  }
  tabList: TabItem[]
  id?: string
  hideTitle?: boolean
  anchor?: string
  className?: string
}

const TabsBlock = forwardRef<HTMLDivElement, TabsBlockProps>(function TabsBlock(
  { title, ingress, designOptions, tabList, id, hideTitle = false, anchor, className = '' },
  ref,
) {
  const theme = getColorForTabsTheme(designOptions?.theme?.value ?? 0)
  const headingId = useId()
  const tabsListRef = useRef<HTMLDivElement>(null)

  //Select first items panel type and use for rest. Editors advised to use same type in studio
  const tabPanelVariant = tabList?.[0]?.panel?.type

  const scrollbarTheme: Record<number, string> = {
    0: 'envis-scrollbar-mist-blue',
    1: 'envis-scrollbar-mid-orange',
    2: 'envis-scrollbar-moss-green',
  }

  return (
    <div
      ref={ref}
      id={anchor}
      className={twMerge(
        `${id ? 'scroll-mt-topbar' : ''}
            ${tabPanelVariant === 'tabsKeyNumbers' ? theme?.backgroundUtility : 'bg-white-100'}`,
        className,
      )}
    >
      <div
        className={`flex
            flex-col
            gap-6
            max-w-viewport
            mx-auto
            ${
              tabPanelVariant === 'tabsKeyNumbers'
                ? `lg:px-layout-lg pb-page-content`
                : `mx-layout-sm ${theme?.backgroundUtility} rounded-md my-page-content
          `
            }
            `}
      >
        {title && (
          <Heading
            id={headingId}
            value={title}
            as="h2"
            variant="xl"
            className={`${hideTitle ? 'sr-only' : ''} 
            ${tabPanelVariant === 'tabsKeyNumbers' ? 'max-lg:px-layout-lg' : ''}`}
          />
        )}
        {ingress && (
          <IngressText
            value={ingress}
            className={`${tabPanelVariant === 'tabsKeyNumbers' ? 'max-lg:px-layout-lg' : ''} mb-12`}
          />
        )}
        {tabList && tabList?.length > 0 && (
          <Tabs
            defaultValue={tabList[0]?.id}
            {...(hideTitle && { 'aria-labelledby': headingId })}
            className={`w-full 
              px-6 
              lg:px-0 
              flex 
              flex-col 
              items-center
              ${tabPanelVariant === 'tabsInfoPanel' ? 'mt-4' : ''}
              `}
          >
            <TabList loop ref={tabsListRef} className={`${scrollbarTheme[designOptions?.theme?.value ?? 0]}`}>
              {tabList?.map((tab: TabItem) => {
                return (
                  <Tab key={tab.id} value={tab.id} className={`${``}`}>
                    {tab.title}
                  </Tab>
                )
              })}
            </TabList>
            {tabList?.map((tabItem: TabItem) => {
              return (
                <TabPanel
                  key={tabItem.panel.id}
                  value={tabItem.id}
                  className={`${
                    tabPanelVariant === 'tabsKeyNumbers'
                      ? 'py-10 max-lg:px-layout-sm'
                      : 'w-full h-full rounded-md overflow-hidden'
                  }`}
                >
                  {tabItem.panel?.type === 'tabsKeyNumbers' && tabItem.panel?.items && (
                    <ul
                      {...(title && hideTitle && { 'aria-labelledby': headingId })}
                      className={`flex 
                        flex-col
                        md:grid
                        md:grid-cols-2
                        3xl:grid-flow-col
                        3xl:auto-cols-fr
                        gap-6`}
                    >
                      {tabItem.panel?.items?.map((tabsKeyNumber: any) => {
                        return (
                          <li key={tabsKeyNumber.id}>
                            <TabsKeyNumberItem
                              theme={designOptions.theme?.value}
                              keyNumber={tabsKeyNumber?.keyNumber}
                              unit={tabsKeyNumber?.unit}
                              description={tabsKeyNumber?.description}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  {tabItem.panel?.type === 'tabsInfoPanel' && (
                    <TabsInfoPanelItem theme={designOptions.theme?.value} {...tabItem.panel} />
                  )}
                  {tabItem.panel?.type === 'tabsKeyNumbers' && tabItem?.panel?.disclaimer && (
                    <Blocks value={tabItem?.panel?.disclaimer} className="italic text-sm mt-6" />
                  )}
                </TabPanel>
              )
            })}
          </Tabs>
        )}
      </div>
    </div>
  )
})

export default TabsBlock
