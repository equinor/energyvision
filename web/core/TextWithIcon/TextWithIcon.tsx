import { HTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../twMerge'
import { IconData } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { ImageWithAlt } from '../../types'
import Img from 'next/image'
import { urlFor } from '../../common/helpers'
import { PortableTextBlock } from '@portabletext/types'
import { Typography } from '@core/Typography'
import Blocks from '../../pageComponents/shared/portableText/Blocks'

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
        {image && image?.asset && (
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
        {content && (
          <Blocks value={content} className={`${!title ? 'text-md' : ''} max-w-80 text-pretty text-center`} />
        )}
      </div>
    )
  },
)
