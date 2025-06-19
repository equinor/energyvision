'use client'
import { Heading } from '../../core/Typography'
import { twMerge } from 'tailwind-merge'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import { getColorForTabsTheme } from './tabThemes'
import { Tabs } from '@core/Tabs'
import { forwardRef, useId, useRef } from 'react'
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

  return (
    <div
      ref={ref}
      id={anchor}
      className={twMerge(
        `${id ? 'scroll-mt-topbar' : ''}
          ${
            tabPanelVariant === 'tabsKeyNumbers'
              ? theme?.backgroundUtility
              : `${theme?.backgroundUtility} lg:bg-white-100`
          }`,
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
                ? `px-layout-sm lg:px-layout-md pb-page-content`
                : `lg:mx-layout-sm ${theme?.backgroundUtility} rounded-md`
            }
            `}
      >
        <div
          className={`${
            tabPanelVariant === 'tabsInfoPanel' && !hideTitle ? `lg:pt-20 pl-layout-sm max-w-innerColumn` : ``
          }`}
        >
          {title && (
            <Heading id={headingId} value={title} as="h2" variant="xl" className={`${hideTitle ? 'sr-only' : ''}`} />
          )}
          {ingress && <IngressText value={ingress} className={`mt-6`} />}
        </div>
        {tabList && tabList?.length > 0 && (
          <Tabs
            defaultValue={tabList[0]?.id}
            {...(hideTitle && { 'aria-labelledby': headingId })}
            className={`w-full 
              flex 
              flex-col 
              items-center
              ${tabPanelVariant === 'tabsInfoPanel' ? 'mt-4' : ''}
              `}
          >
            <TabList ref={tabsListRef}>
              {tabList?.map((tab: TabItem, i: number) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <Tab key={`${tab.id}_index_${i}`} value={tab.id} className={`${``}`}>
                    {tab.title}
                  </Tab>
                )
              })}
            </TabList>
            {tabList?.map((tabItem: TabItem, i: number) => {
              return (
                <TabPanel
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${tabItem.panel.id}_index_${i}`}
                  value={tabItem.id}
                  className={`${
                    tabPanelVariant === 'tabsKeyNumbers'
                      ? 'w-full py-14 max-lg:px-layout-sm'
                      : 'w-full h-full rounded-md overflow-hidden'
                  }`}
                >
                  {tabItem.panel?.type === 'tabsKeyNumbers' && tabItem.panel?.items && (
                    <ul
                      {...(title && hideTitle && { 'aria-labelledby': headingId })}
                      className={`
                        flex 
                        flex-col
                        md:grid
                        md:grid-cols-2
                        ${tabItem.panel?.items?.length < 4 ? '3xl:grid-flow-col 3xl:auto-cols-fr' : ''} 
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
