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
      blockClassName={`${highlight}`}
      value={title}
      as='h2'
      asOneElementType
      //same as variants h2
      className='pb-8'
    />
  )

  return (
    <article
      id={anchor}
      className={twMerge(
        `min-h-[400px] ${backgroundUtility} flex flex-col gap-x-12 gap-y-6 px-layout-md py-6 md:flex-row ${
          dark ? 'dark' : ''
        } `,
        className,
      )}
    >
      {titlePosition === 'left' && titleElement}
      <div className=''>
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
