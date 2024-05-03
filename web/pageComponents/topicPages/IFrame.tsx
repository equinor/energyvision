import styled from 'styled-components'
import type { IFrameData } from '../../types/types'
import { BackgroundContainer, FigureCaption } from '@components'
import CoreIFrame from '../shared/iframe/IFrame'
import { ButtonLink } from '../shared/ButtonLink'
import IngressText from '../shared/portableText/IngressText'
import TitleText from '../shared/portableText/TitleText'
import RichText from '../shared/portableText/RichText'
import { twMerge } from 'tailwind-merge'

const StyledHeading = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
  text-align: left;
`

const Figure = styled.figure`
  margin: 0;
`

const StyledButtonLink = styled(ButtonLink)`
  margin-top: var(--space-xLarge);
`

const Ingress = styled.div`
  margin-bottom: var(--space-large);
`

const IFrame = ({
  anchor,
  data: { title, ingress, frameTitle, url, description, cookiePolicy = 'none', designOptions, action },
  className,
  ...rest
}: {
  data: IFrameData
  anchor?: string
  className?: string
}) => {
  if (!url) return null

  const { height, aspectRatio, ...restOptions } = designOptions
  return (
    <BackgroundContainer {...restOptions} {...rest} id={anchor} renderFragmentWhenPossible>
      <div className={twMerge(`pb-page-content max-w-viewport px-layout-lg mx-auto`, className)}>
        {title && <StyledHeading value={title} />}
        {ingress && (
          <Ingress>
            <IngressText value={ingress}></IngressText>
          </Ingress>
        )}
        {description ? (
          <Figure>
            <CoreIFrame
              frameTitle={frameTitle}
              url={url}
              cookiePolicy={cookiePolicy}
              aspectRatio={aspectRatio}
              height={height}
              hasSectionTitle={!!title}
            />
            <FigureCaption size="medium">
              <RichText value={description} />
            </FigureCaption>
          </Figure>
        ) : (
          <CoreIFrame
            frameTitle={frameTitle}
            url={url}
            cookiePolicy={cookiePolicy}
            aspectRatio={aspectRatio}
            height={height}
            hasSectionTitle={!!title}
          />
        )}
        {action && action.label && <StyledButtonLink action={action} />}
      </div>
    </BackgroundContainer>
  )
}

export default IFrame
