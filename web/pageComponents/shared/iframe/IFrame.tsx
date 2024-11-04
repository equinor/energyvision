import { HTMLAttributes, useContext, useState } from 'react'
import { PreviewContext } from '../../../lib/contexts/PreviewContext'
import styled from 'styled-components'
import RequestConsentContainer from './RequestConsentContainer'
import useConsentState from '../../../lib/hooks/useConsentState'
import { CookieType } from '../../../types'
import useConsent from '../../../lib/hooks/useConsent'

const IFrameContainer = styled.div<{ $aspectRatioPadding: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: ${({ $aspectRatioPadding }) => $aspectRatioPadding};
`

const StyledIFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
`

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
      <IFrameContainer $aspectRatioPadding={containerPadding}>
        <StyledIFrame allowFullScreen loading="lazy" src={url} title={frameTitle} />
      </IFrameContainer>
    )
  }

  return (
    <>
      {consented && (
        <div className={className}>
          <IFrameContainer aria-describedby={describedBy} $aspectRatioPadding={containerPadding}>
            <StyledIFrame
              allowFullScreen
              src={url}
              title={frameTitle}
              loading="lazy"
              data-cookieconsent={cookiePolicy}
            ></StyledIFrame>
          </IFrameContainer>
        </div>
      )}
      {!consented && <RequestConsentContainer hasSectionTitle={hasSectionTitle} cookiePolicy={cookiePolicy} />}
    </>
  )
}

export default IFrame
