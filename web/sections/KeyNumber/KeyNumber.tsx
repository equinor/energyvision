'use client'
import { KeyNumbersData } from '../../types'
import KeyNumberItem from './KeyNumberItem'
import { ResourceLink } from '@/core/Link'
import { Carousel } from '@/core/Carousel/Carousel'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../sanity/localization'
import { useId } from 'react'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'

type KeyNumbersProps = {
  data: KeyNumbersData
  anchor?: string
  className?: string
}
const KeyNumber = ({ data, anchor, className }: KeyNumbersProps) => {
  const { title, hideTitle, items, designOptions, ingress, action, disclaimer, useHorizontalScroll = false } = data
  const url = action && getUrlFromAction(action)
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  const headingId = useId()
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  return (
    <section className={twMerge(`${bg} ${dark ? 'dark' : ''} pb-page-content`, className)} id={anchor}>
      <div className="px-layout-sm lg:px-layout-md">
        {title && <Blocks value={title} id={headingId} variant="h2" blockClassName={hideTitle ? 'sr-only' : ''} />}
        {ingress && <Blocks variant="ingress" value={ingress} />}
      </div>
      <div className="px-layout-sm lg:px-layout-md">
        {useHorizontalScroll && (
          <Carousel
            items={items}
            displayMode="scroll"
            variant="keyNumber"
            {...(title && { labelledbyId: headingId })}
            hasSectionTitle={!!title}
          />
        )}
        {!useHorizontalScroll && (
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <KeyNumberItem key={item.id} {...item} />
            ))}
          </ul>
        )}

        {disclaimer && (
          <Blocks group="paragraph" variant="small" value={disclaimer} blockClassName="pb-lg max-w-text" />
        )}
        {action && (
          <ResourceLink
            href={url as string}
            {...(action.link?.lang && { hrefLang: getLocaleFromName(action.link?.lang) })}
            type={action.type}
          >
            {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
          </ResourceLink>
        )}
      </div>
    </section>
  )
}

export default KeyNumber
