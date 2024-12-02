import envisTwMerge from '../../twMerge'
import { IFrameCarouselItemData } from '../../types/index'
import { DisplayModes } from './Carousel'
import { forwardRef, HTMLAttributes } from 'react'
import { Heading, Paragraph } from '@core/Typography'
import Iframe from '../../pageComponents/shared/iframe/IFrame'
import { FigureCaption } from '@components/FigureCaption'
import { ButtonLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../lib/localization'

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
      aria-roledescription="slide"
      className={envisTwMerge(
        `transform-all
                    shrink-0
                    relative
                       ${itemWidth}
                  ${displayMode === 'scroll' ? 'snap-center scroll-ml-6' : ''}
                    `,
        className,
      )}
    >
      <>
        {title && <Heading value={title} className="text-md pb-lg" />}
        {description ? (
          <figure>
            <Iframe
              frameTitle={frameTitle}
              url={url}
              cookiePolicy={cookiePolicy}
              aspectRatio={aspectRatio}
              height={height}
              hasSectionTitle={!!title}
            />
            <FigureCaption size="medium">
              <Paragraph value={description} />
            </FigureCaption>
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
        {action && action.label && (
          <ButtonLink
            href={getUrlFromAction(action) || ''}
            aria-label={action?.ariaLabel}
            variant="outlined-secondary"
            className={`w-full md:mb-8 mb-4 justify-center mt-xl `}
            locale={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
          >
            {action.label}
          </ButtonLink>
        )}
      </>
    </li>
  )
})
