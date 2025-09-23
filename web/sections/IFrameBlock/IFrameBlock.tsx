import type { IFrameData } from '../../types/index'
import { IFrame } from '@/core/IFrame/IFrame'
import { useId } from 'react'
import { getUrlFromAction } from '../../common/helpers'
import { ResourceLink } from '@/core/Link'
import { getLocaleFromName } from '../../lib/localization'
import Blocks from '@/portableText/Blocks'

import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'

const IFrameBlock = ({ anchor, data, className }: { data: IFrameData; anchor?: string; className?: string }) => {
  const {
    title,
    ingress,
    frameTitle,
    url,
    description,
    cookiePolicy = ['none'],
    designOptions,
    action,
    transcript,
  } = data

  const { height, aspectRatio } = designOptions
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  const headingId = useId()
  const actionUrl = action ? getUrlFromAction(action) : ''

  if (!url) return null
  return (
    <section className={twMerge(`${bg} ${dark ? 'dark' : ''} px-layout-lg pb-page-content`, className)} id={anchor}>
      {title && <Blocks variant="h2" id={headingId} value={title} />}
      <div className="flex flex-col gap-6">
        {ingress && <Blocks variant="ingress" value={ingress} />}
        <IFrame
          frameTitle={frameTitle}
          url={url}
          cookiePolicy={cookiePolicy}
          aspectRatio={aspectRatio}
          height={height}
          labelledBy={headingId}
          {...(description && {
            description,
          })}
          hasSectionTitle={!!title}
          transcript={transcript}
        />
        {action && action.label && actionUrl && (
          <ResourceLink
            href={actionUrl || ''}
            extension={action?.extension}
            showExtensionIcon={true}
            variant="fit"
            hrefLang={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
            className=""
          >
            {action.label}
          </ResourceLink>
        )}
      </div>
    </section>
  )
}

export default IFrameBlock
