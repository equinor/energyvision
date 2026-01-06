import { BackgroundContainer } from '@core/Backgrounds'
import { IFrame } from '@core/IFrame/IFrame'
import { ResourceLink } from '@core/Link'
import { Heading } from '@core/Typography'
import { useId } from 'react'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import envisTwMerge from '../../twMerge'
import type { IFrameData } from '../../types/index'

const IFrameBlock = ({
  anchor,
  data,
  className,
  ...rest
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

  const { height, aspectRatio, background } = designOptions
  const headingId = useId()
  const actionUrl = action ? getUrlFromAction(action) : ''

  if (!url) return null
  return (
    <BackgroundContainer
      {...background}
      {...rest}
      id={anchor}
      className={envisTwMerge('max-w-viewport mx-auto flex flex-col gap-6 pb-page-content', className)}
      renderFragmentWhenPossible
    >
      {title && <Heading variant="h3" as="h2" id={headingId} value={title} />}
      {ingress && <IngressText value={ingress} />}
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
      {action && action?.label && actionUrl && (
        <ResourceLink
          href={actionUrl || ''}
          file={{
            ...action?.file,
            label: action?.label,
          }}
          showExtensionIcon={true}
          variant="fit"
          locale={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
          className=""
        >
          {action.label}
        </ResourceLink>
      )}
    </BackgroundContainer>
  )
}

export default IFrameBlock
