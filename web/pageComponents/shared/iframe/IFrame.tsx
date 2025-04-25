import { HTMLAttributes, useContext, useState } from 'react'
import { PreviewContext } from '../../../lib/contexts/PreviewContext'
import RequestConsentContainer from './RequestConsentContainer'
import useConsentState from '../../../lib/hooks/useConsentState'
import { CookieType } from '../../../types'
import useConsent from '../../../lib/hooks/useConsent'

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
  hasSectionTitle: boolean
  /** id to element that describes iframe */
  describedBy?: string
} & HTMLAttributes<HTMLElement>

const IFrame = ({
  hasSectionTitle = true,
  frameTitle,
  url,
  cookiePolicy = ['none'],
  aspectRatio,
  height,
  className = '',
  describedBy,
}: IFrameProps) => {
  const { isPreview } = useContext(PreviewContext)
  const [consented, setConsented] = useState(useConsent(cookiePolicy))

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

  if (isPreview) {
    return (
      <div style={{ paddingBottom: containerPadding }} className="relative w-full overflow-hidden">
        <iframe
          className="absolute inset-0 w-full h-full border-none"
          allowFullScreen
          loading="lazy"
          src={url}
          title={frameTitle}
        />
      </div>
    )
  }

  return (
    <>
      {consented && (
        <div className={className}>
          <div
            style={{ paddingBottom: containerPadding }}
            className="relative w-full overflow-hidden"
            aria-describedby={describedBy}
          >
            <iframe
              className="absolute inset-0 w-full h-full border-none"
              allowFullScreen
              src={url}
              title={frameTitle}
              loading="lazy"
              data-cookieconsent={cookiePolicy}
            ></iframe>
          </div>
        </div>
      )}
      {!consented && <RequestConsentContainer hasSectionTitle={hasSectionTitle} cookiePolicy={cookiePolicy} />}
    </>
  )
}

export default IFrame
