import { forwardRef, HTMLAttributes, useContext, useId, useState } from 'react'
import { PreviewContext } from '../../lib/contexts/PreviewContext'
import useConsentState from '../../lib/hooks/useConsentState'
import { CookieType } from '../../types'
import useConsent from '../../lib/hooks/useConsent'
import envisTwMerge from '../../twMerge'
import RequestConsentContainer from './RequestConsentContainer'
import { PortableTextBlock } from '@portabletext/types'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import TranscriptAndActions from '@sections/Transcript/TranscriptAndActions'

const calculatePadding = (aspectRatio: string): string => {
  const ratio = aspectRatio.split(':')
  const percentage = (parseInt(ratio[1]) / parseInt(ratio[0])) * 100

  return `${percentage}%`
}

type IFrameProps = {
  frameTitle: string
  url: string
  cookiePolicy: CookieType[]
  height?: number
  aspectRatio: string
  /** Sets h3 if true, h2 if not */
  hasSectionTitle: boolean
  /* Portabletext title
   * dont use if you have a section title above for iframe
   */
  title?: PortableTextBlock[]
  showTitleAbove?: boolean
  /** For above section title connected to iframe
   * id to element
   * Ignored if title is sent in
   */
  labelledBy?: string
  titleClassName?: string
  description?: PortableTextBlock[]
  descriptionClassName?: string
  transcript?: any
} & HTMLAttributes<HTMLElement>

export const IFrame = forwardRef<HTMLDivElement, IFrameProps>(function IFrame(
  {
    hasSectionTitle = true,
    title,
    showTitleAbove = false,
    frameTitle,
    url,
    cookiePolicy = ['none'],
    aspectRatio,
    height,
    className = '',
    titleClassName = '',
    descriptionClassName = '',
    labelledBy,
    description,
    transcript,
  },
  ref,
) {
  const { isPreview } = useContext(PreviewContext)
  const [consented, setConsented] = useState(useConsent(cookiePolicy))
  const titleId = useId()
  const descriptionId = useId()
  const labelledById = title ? titleId : labelledBy

  useConsentState(
    cookiePolicy,
    () => {
      setConsented(true)
    },
    () => {
      setConsented(false)
    },
  )
  if (!url) return null
  const containerPadding = height ? `${height}px` : calculatePadding(aspectRatio)

  const iframeElement = (
    <div ref={ref} className={envisTwMerge('h-min', className)}>
      {title && showTitleAbove && (
        <Blocks value={title} id={titleId} className={envisTwMerge('text-xl pb-8', titleClassName)} />
      )}
      <div
        className="relative w-full overflow-hidden"
        style={{
          paddingBottom: containerPadding,
        }}
      >
        <iframe
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          src={url}
          title={frameTitle}
          {...(!isPreview && {
            'data-cookieconsent': cookiePolicy,
          })}
          {...(labelledById !== '' && {
            'aria-labelledby': labelledById,
          })}
          {...(description && {
            'aria-describedby': descriptionId,
          })}
        />
      </div>
      {transcript && <TranscriptAndActions transcript={transcript} ariaTitle={frameTitle} />}
      {title && !showTitleAbove && (
        <Blocks
          value={title}
          id={titleId}
          className={envisTwMerge('text-md pt-4', description ? 'pb-2' : '', titleClassName)}
        />
      )}
      {description && (
        <Blocks
          value={description}
          id={descriptionId}
          className={envisTwMerge(
            'text-base',
            !title || (!title && !showTitleAbove) ? 'pt-4' : '',
            descriptionClassName,
          )}
        />
      )}
    </div>
  )

  if (isPreview) {
    return iframeElement
  }

  return (
    <>
      {consented ? (
        iframeElement
      ) : (
        <RequestConsentContainer hasSectionTitle={hasSectionTitle} cookiePolicy={cookiePolicy} />
      )}
    </>
  )
})
