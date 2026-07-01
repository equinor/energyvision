'use client'
import dynamic from 'next/dynamic'
import { useId } from 'react'
import { twMerge } from 'tailwind-merge'
import ResourceLink from '@/core/Link/ResourceLink'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { getIsoFromName } from '../../sanity/helpers/localization'
import type { IFrameData } from '../../types/index'

const IFrame = dynamic(() => import('@/core/IFrame/IFrame'))

const IFrameBlock = ({
  anchor,
  data,
  className,
}: {
  data: IFrameData
  anchor?: string
  className?: string
}) => {
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
    <section
      className={twMerge(`${bg} ${dark ? 'dark' : ''} `, className)}
      id={anchor}
    >
      <div className='mx-auto max-w-content px-layout-lg'>
        {title && <Blocks variant='h2' id={headingId} value={title} />}
        <div className='flex flex-col'>
          {ingress && <Blocks variant='ingress' value={ingress} />}
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
          {action?.label && actionUrl && (
            <ResourceLink
              href={actionUrl}
              variant='fit'
              hrefLang={
                action?.type === 'internalUrl'
                  ? getIsoFromName(action?.link?.lang)
                  : undefined
              }
              file={{
                ...action?.file,
                label: action?.label,
              }}
            >
              {action.label}
            </ResourceLink>
          )}
        </div>
      </div>
    </section>
  )
}

export default IFrameBlock
