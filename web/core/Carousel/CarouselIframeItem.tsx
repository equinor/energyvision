import envisTwMerge from '../../twMerge'
import { IFrameCarouselItemData } from '../../types/index'
import { DisplayModes } from './Carousel'
import { forwardRef, HTMLAttributes } from 'react'
import { Heading, Paragraph } from '@core/Typography'
import Iframe from '../../pageComponents/shared/iframe/IFrame'
import { FigureCaption } from '@components/FigureCaption'
import { ButtonLink, ResourceLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../lib/localization'
import Blocks from 'pageComponents/shared/portableText/Blocks'

type CarouselIframeItemProps = {
  displayMode?: DisplayModes
  noOfSiblings: number
  className?: string
  active?: boolean
  innerRef?: () => void
} & IFrameCarouselItemData &
  Omit<HTMLAttributes<HTMLLIElement>, 'title'>

export const CarouselIframeItem = forwardRef<HTMLLIElement, CarouselIframeItemProps>(function CarouselIframeItem(
  {
    title,
    description,
    frameTitle,
    url,
    noOfSiblings,
    action,
    cookiePolicy,
    displayMode = 'scroll',
    aspectRatio,
    height,
    className = '',
    active = false,
    ...rest
  },
  ref,
) {
  const itemWidth = noOfSiblings > 2 ? 'w-full lg:w-[45%]' : noOfSiblings === 2 ? 'w-full md:w-[48.5%]' : 'w-full'

  return (
    <li
      {...rest}
      ref={ref}
      aria-current={active}
      className={envisTwMerge(
        `transition-all
        shrink-0
        relative
        ${itemWidth}
        snap-center 
        scroll-ml-6`,
        className,
      )}
    >
      <>
        {title || description || action?.link ? (
          <figure className="w-full h-full flex flex-col">
            <Iframe
              frameTitle={frameTitle}
              url={url}
              cookiePolicy={cookiePolicy}
              aspectRatio={aspectRatio}
              height={height}
              hasSectionTitle={!!title}
            />
            <figcaption className="py-6 px-2 max-w-text w-full h-full flex flex-col last:self-end gap-2 grow">
              {title && <Heading value={title} className="text-md pb-3" />}
              {description && <Blocks value={description} />}
              {action && action.label && (
                <ResourceLink
                  href={getUrlFromAction(action) || ''}
                  aria-label={action?.ariaLabel}
                  variant="fit"
                  className="mt-auto"
                  locale={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
                >
                  {action.label}
                </ResourceLink>
              )}
            </figcaption>
          </figure>
        ) : (
          <Iframe
            frameTitle={frameTitle}
            url={url}
            cookiePolicy={cookiePolicy}
            aspectRatio={aspectRatio || '16:9'}
            height={height}
            hasSectionTitle={!!title}
          />
        )}
      </>
    </li>
  )
})
