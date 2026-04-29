import { twMerge } from 'tailwind-merge'
import { ResourceLink } from '@/core/Link/ResourceLink'
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

  const titleElement = (
    <Blocks
      className='basis-1/2 p-16'
      blockClassName={`${highlight}`}
      value={title}
      as='h2'
      group='heading'
      variant='h2'
    />
  )

  return (
    <article
      id={anchor}
      className={twMerge(
        `${backgroundUtility} p-layout-md flex  flex-col gap-x-12 gap-y-6 py-6 md:flex-row lg:grid lg:grid-cols-2 ${
          dark ? 'dark' : ''
        } `,
        className,
      )}
    >
      {titlePosition === 'left' && titleElement}
      <div className='basis-1/2 md:p-12 lg:p-16'>
        {text && (
          <div className='pb-8 last:pb-0'>
            <Blocks variant='ingress' value={text} />
          </div>
        )}
        {action && (
          <ResourceLink
            href={url as string}
            file={{
              ...action?.file,
              label: action?.label,
            }}
            {...(action.link?.lang && {
              hrefLang: getLocaleFromName(action.link?.lang),
            })}
            type={action.type}
          >
            {action.label}
          </ResourceLink>
        )}
      </div>
      {titlePosition === 'right' && titleElement}
    </article>
  )
}

export default TextTeaser
