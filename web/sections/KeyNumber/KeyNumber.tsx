'use client'
import { KeyNumbersData } from '../../types'
import { BackgroundContainer } from '@/core/Backgrounds'
import KeyNumberItem from './KeyNumberItem'
import { ResourceLink } from '@/core/Link'
import { Carousel } from '@/core/Carousel/Carousel'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../lib/localization'
import { useId } from 'react'
import Blocks from '@/portableText/Blocks'

type KeyNumbersProps = {
  data: KeyNumbersData
  anchor?: string
  className?: string
}
const KeyNumber = ({ data, anchor, className }: KeyNumbersProps) => {
  const { title, hideTitle, items, designOptions, ingress, action, disclaimer, useHorizontalScroll } = data
  const url = action && getUrlFromAction(action)
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  const headingId = useId()

  const renderScroll = useHorizontalScroll && isMobile

  return (
    <BackgroundContainer
      {...designOptions}
      backgroundStyle="none"
      className={twMerge(`px-layout-sm pb-page-content`, className)}
      id={anchor}
    >
      {title && <Blocks value={title} id={headingId} variant="h2" className={hideTitle ? 'sr-only' : ''} />}
      {ingress && <Blocks variant="ingress" value={ingress} />}

      {renderScroll && (
        <Carousel
          items={items}
          displayMode="scroll"
          variant="keyNumber"
          labelledbyId={title ? headingId : undefined}
          hasSectionTitle={!!title}
        />
      )}
      {!renderScroll && (
        <div className="gap-lg mb-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <KeyNumberItem key={item.id} {...item} />
          ))}
        </div>
      )}

      {disclaimer && <Blocks group="paragraph" variant="small" value={disclaimer} className="pb-lg max-w-text" />}
      {action && (
        <ResourceLink
          href={url as string}
          {...(action.link?.lang && { hrefLang: getLocaleFromName(action.link?.lang) })}
          type={action.type}
        >
          {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
        </ResourceLink>
      )}
    </BackgroundContainer>
  )
}

export default KeyNumber
