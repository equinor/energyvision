import { KeyNumbersData } from '../../types'
import { BackgroundContainer } from '@components/Backgrounds'
import { Heading, Paragraph } from '@core/Typography'
import KeyNumberItem from './KeyNumberItem'
import { ReadMoreLink } from '@core/Link'
import { Carousel } from '@core/Carousel/Carousel'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../lib/localization'

type KeyNumbersProps = {
  data: KeyNumbersData
  anchor?: string
  className?: string
}
const KeyNumber = ({ data, anchor, className }: KeyNumbersProps) => {
  const { title, items, designOptions, ingress, action, disclaimer, useHorizontalScroll } = data
  const url = action && getUrlFromAction(action)
  const isMobile = useMediaQuery(`(max-width: 800px)`)

  const renderScroll = useHorizontalScroll && isMobile

  return (
    <BackgroundContainer {...designOptions} className={twMerge(`pb-page-content px-layout-sm`, className)} id={anchor}>
      {title && <Heading value={title} variant="h3" as="h2" className="pb-lg" />}
      {ingress && <Paragraph value={ingress} className="max-w-text text-pretty pb-xl" />}

      {renderScroll && <Carousel items={items} displayMode="scroll" variant="keyNumber"></Carousel>}
      {!renderScroll && (
        <div className="grid gap-lg mb-lg grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <KeyNumberItem key={item.id} {...item} />
          ))}
        </div>
      )}

      {disclaimer && <Paragraph value={disclaimer} className="max-w-text pb-lg text-sm" />}
      {action && (
        <ReadMoreLink
          href={url as string}
          {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
          type={action.type}
        >
          {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
        </ReadMoreLink>
      )}
    </BackgroundContainer>
  )
}

export default KeyNumber
