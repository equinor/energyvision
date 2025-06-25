import { Teaser } from '@/core/Teaser'
import type { TextTeaserData } from '../../../types/index'
import { getColorForTheme } from './theme'

import { twMerge } from 'tailwind-merge'
import { ResourceLink } from '@/core/Link'
import { getUrlFromAction } from '../../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../../lib/localization'
import { Heading } from '@/core/Typography'
import IngressText from '../../../pageComponents/shared/portableText/IngressText'

const { Content, Media } = Teaser

type TextTeaserProps = {
  data: TextTeaserData
  anchor?: string
  className?: string
}

const TextTeaser = ({ data, anchor, className }: TextTeaserProps) => {
  const { title, text, action, designOptions } = data
  const { theme, titlePosition } = designOptions
  const { background, highlight, dark } = getColorForTheme(theme)
  const url = action && getUrlFromAction(action)

  return (
    <Teaser
      background={{ backgroundColor: background }}
      id={anchor}
      className={twMerge(`${dark ? 'dark' : ''} `, className)}
    >
      <Media className="pt-12 pb-0 px-layout-lg sm:pt-12 sm:py-8 md:p-16 h-auto" mediaPosition={titlePosition}>
        <Heading className={`pt-0 px-0 pb-12 sm:p-0 ${highlight}`} variant="2xl" as="h2" value={title} />
      </Media>
      <Content className="pt-0 px-layout-lg pb-16 sm:p-12 lg:p-16 ">
        {text && (
          <div className="pb-8 last:pb-0">
            <IngressText value={text} />
          </div>
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
      </Content>
    </Teaser>
  )
}

export default TextTeaser
