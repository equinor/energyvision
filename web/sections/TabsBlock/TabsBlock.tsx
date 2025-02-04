import { Heading } from '../../core/Typography'
import { twMerge } from 'tailwind-merge'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import { getColorForTabsTheme } from './tabThemes'
import { Tabs } from '@core/Tabs'
import { forwardRef, useId } from 'react'
import TabsKeyNumberItem from './TabsKeyNumberItem'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import TabsInfoPanelItem from './TabsInfoPanelItem'

const { TabList, Tab, TabPanel } = Tabs

type TabsBlockProps = {
  data: any
  anchor?: string
  className?: string
}

const TabsBlock = forwardRef<HTMLDivElement, TabsBlockProps>(function TabsBlock({ data, anchor, className = '' }, ref) {
  const { title, ingress, designOptions, tabList, id, hideTitle = false } = data
  console.log('tabList', tabList)
  const theme = getColorForTabsTheme(designOptions.theme?.value)
  const headingId = useId()

  //Select first items panel type and use for rest. Editors advised to use same type in studio
  const tabPanelVariant = tabList?.[0]?.panel?.type

  return (
    <div
      ref={ref}
      className={twMerge(
        `${id ? 'scroll-mt-topbar' : ''}
            ${tabPanelVariant === 'tabsKeyNumbers' ? theme?.background : 'bg-white-100'}`,
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
                : `mx-layout-sm ${theme?.background} rounded-md my-page-content
          `
            }
            `}
      >
        {title && (
          <Heading
            id={headingId}
            value={title}
            variant="h2"
            className={`${hideTitle ? 'sr-only' : ''} 
            ${tabPanelVariant === 'tabsKeyNumbers' ? 'max-lg:px-layout-lg' : ''}`}
          />
        )}
        {ingress && (
          <IngressText
            value={ingress}
            className={`${tabPanelVariant === 'tabsKeyNumbers' ? 'max-lg:px-layout-lg' : ''}`}
          />
        )}
        <Tabs defaultValue={tabList[0]?.id} className="w-full flex flex-col items-center">
          <TabList
            className={`border-b border-grey-50 px-4 lg:px-6 grid grid-flow-col auto-cols-fr justify-evenly
            ${tabPanelVariant === 'tabsInfoPanel' ? 'mx-24 pt-8' : 'w-full'}`}
          >
            {tabList?.map((tab: any) => {
              return (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  className={` ${tabPanelVariant === 'tabsInfoPanel' ? 'w-fit' : ''} text-base px-4 md:px-6 xl:px-12`}
                >
                  {tab.title}
                </Tab>
              )
            })}
          </TabList>
          {tabList?.map((tabItem: any) => {
            console.log('tabItem', tabItem)
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
                {tabItem.panel?.type === 'tabsKeyNumbers' && (
                  <ul
                    {...(title &&
                      hideTitle && {
                        'aria-labelledby': headingId,
                      })}
                    className="flex flex-col lg:grid lg:grid-flow-col lg:auto-cols-fr gap-6"
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
                {tabItem.panel?.disclaimer && (
                  <Blocks value={tabItem.panel?.disclaimer} className="italic text-sm mt-6" />
                )}
              </TabPanel>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
})

export default TabsBlock
