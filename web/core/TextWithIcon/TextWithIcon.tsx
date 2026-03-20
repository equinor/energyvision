import { Typography } from '@core/Typography'
import type { IconData } from '@equinor/eds-icons'
import type { PortableTextBlock } from '@portabletext/types'
import Img from 'next/image'
import { forwardRef, type HTMLAttributes } from 'react'
import { urlFor } from '../../common/helpers'
import { TransformableIcon } from '../../icons/TransformableIcon'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import envisTwMerge from '../../twMerge'
import type { ImageWithAlt } from '../../types'

export type TextWithIconProps = {
  title?: string
  content?: PortableTextBlock[]
  iconData?: IconData
  image?: ImageWithAlt
  /** Icondata or imageUrl styling */
  iconClassName?: string
} & HTMLAttributes<HTMLDivElement>

export const TextWithIcon = forwardRef<HTMLDivElement, TextWithIconProps>(
  ({ title, content, iconData, className = '', image, iconClassName = '', ...rest }, ref) => {
    return (
      <div ref={ref} className={envisTwMerge(`flex flex-col gap-2 items-center`, className)} {...rest}>
        {iconData && <TransformableIcon iconData={iconData} className={iconClassName} />}
        {image?.asset && (
          <Img
            src={urlFor(image).size(150, 150).auto('format').toString()}
            width="150"
            height="150"
            alt={image?.isDecorative ? '' : image?.alt || ''}
            role={image?.isDecorative ? 'presentation' : undefined}
            className={envisTwMerge(
              `size-[150px]
              m-auto
              self-center
              `,
              iconClassName,
            )}
          />
        )}
        {title && (
          <Typography as="h2" variant="h3" className="text-pretty text-center max-w-80">
            {title}
          </Typography>
        )}
        {content && <Blocks value={content} className={`text-base max-w-80 text-pretty text-center`} />}
      </div>
    )
  },
)
