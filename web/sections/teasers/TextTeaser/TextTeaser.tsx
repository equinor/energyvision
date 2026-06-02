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
      className={`p-8 sm:p-12 lg:p-16 ${titlePosition === 'right' ? 'md:order-last' : ''}`}
      blockClassName={`${highlight}`}
      value={title}
      as='h2'
      group='heading'
      variant='2xl'
    />
  )

  return (
    <article
      id={anchor}
      className={twMerge(
        `mx-auto flex w-full justify-center ${backgroundUtility} ${dark ? 'dark' : ''} `,
        className,
      )}
    >
      <div className='mx-auto w-full max-w-360 gap-y-12 md:grid md:grid-cols-2'>
        {titleElement}
        <div className='p-8 sm:p-12 lg:p-16'>
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
              variant='fit'
            >
              {action.label}
            </ResourceLink>
          )}
        </div>
      </div>
    </article>
  )
}

export default TextTeaser
