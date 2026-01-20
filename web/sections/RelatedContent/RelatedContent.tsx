import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import ResourceLink from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../sanity/helpers/localization'
import type { LinkData, RelatedLinksData } from '../../types/index'

type RelatedContentProps = {
  data: RelatedLinksData
} & HTMLAttributes<HTMLDivElement>

const RelatedContent = ({
  data,
  className = '',
  ...rest
}: RelatedContentProps) => {
  return (
    <aside
      className={className}
      {...rest}
    >
      <Typography className='pb-4 text-left' variant='xl' as='h2'>
        {data.title}
      </Typography>
      <ul className='max-w-text'>
        {data.links.length > 0 &&
          data.links.map((item: LinkData) => {
            const url = getUrlFromAction(item)
            return (
              <li key={item.id}>
                <ResourceLink
                  {...item}
                  href={url as string}
                  {...(item.link?.lang && {
                    hrefLang: getLocaleFromName(item.link?.lang),
                  })}
                  type={item.type}
                  file={{
                    ...item?.file,
                    label: item?.label,
                  }}
                >
                  {`${item.label}`}
                </ResourceLink>
              </li>
            )
          })}
      </ul>
    </aside>
  )
}

export default RelatedContent
