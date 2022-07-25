import styled from 'styled-components'
import RequestConsentContainer from './RequestConsentContainer'

const IFrameContainer = styled.div<{ aspectRatioPadding: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: ${({ aspectRatioPadding }) => aspectRatioPadding};
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
  cookiePolicy: string
  height?: number
  aspectRatio: string
  hasSectionTitle: boolean
}

const IFrame = ({
  hasSectionTitle = true,
  frameTitle,
  url,
  cookiePolicy = 'none',
  aspectRatio,
  height,
}: IFrameProps) => {
  if (!url) return null

  const containerPadding = height ? `${height}px` : calculatePadding(aspectRatio)

  return (
    <>
      <div className={`cookieconsent-optin-${cookiePolicy}`}>
        <IFrameContainer aspectRatioPadding={containerPadding}>
          <StyledIFrame data-cookieblock-src={url} title={frameTitle} data-cookieconsent={cookiePolicy}></StyledIFrame>
        </IFrameContainer>
      </div>
      {cookiePolicy !== 'none' && (
        <div className={`cookieconsent-optout-${cookiePolicy}`}>
          <RequestConsentContainer hasSectionTitle={hasSectionTitle} cookiePolicy={cookiePolicy} />
        </div>
      )}
    </>
  )
}

export default IFrame
