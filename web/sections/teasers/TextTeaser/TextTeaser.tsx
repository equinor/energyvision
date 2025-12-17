import { twMerge } from 'tailwind-merge'
import { ResourceLink } from '@/core/Link'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import { getLocaleFromName } from '@/sanity/helpers/localization'
import type { TextTeaserData } from '../../../types/index'
import { getColorForTheme } from './theme'

type TextTeaserProps = {
  data: TextTeaserData
  anchor?: string
  className?: string
}

const TextTeaser = ({ data, anchor, className }: TextTeaserProps) => {
  const { title, text, action, designOptions } = data
  const { theme, titlePosition } = designOptions
  const { backgroundUtility, highlight, dark } = getColorForTheme(theme)
  const url = action && getUrlFromAction(action)

  const bigTextElement = (
    <Blocks blockClassName={`${highlight}`} variant='h2' value={title} />
  )

  return (
    <article
      id={anchor}
      className={twMerge(
        `min-h-[400px] ${backgroundUtility} flex flex-col gap-x-12 gap-y-6 px-layout-md py-6 md:flex-row ${dark ? 'dark' : ''} `,
        className,
      )}
    >
      {titlePosition === 'left' && bigTextElement}
      <div className=''>
        {text && (
          <div className='pb-8 last:pb-0'>
            <Blocks variant='ingress' value={text} />
          </div>
        )}
        {action && (
          <ResourceLink
            href={url as string}
            {...(action.link?.lang && {
              hrefLang: getLocaleFromName(action.link?.lang),
            })}
            type={action.type}
          >
            {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
          </ResourceLink>
        )}
      </div>
      {titlePosition === 'right' && bigTextElement}
    </article>
  )
}

export default TextTeaser
