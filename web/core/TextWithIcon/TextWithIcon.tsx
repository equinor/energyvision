import { HTMLAttributes, forwardRef } from 'react'
import { IconData } from '@equinor/eds-icons'
import { TransformableIcon } from '../../icons/TransformableIcon'
import { ImageWithAlt } from '../../types'
import { PortableTextBlock } from '@portabletext/types'
import { Typography } from '@/core/Typography'
import Blocks from '../../portableText/Blocks'
import { Image } from '../Image/Image'
import { twMerge } from 'tailwind-merge'

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
      <div ref={ref} className={twMerge(`flex flex-col items-center gap-2`, className)} {...rest}>
        {iconData && <TransformableIcon iconData={iconData} className={iconClassName} />}
        {image && image?.asset && (
          <Image
            image={image}
            customHeight={150}
            customWidth={150}
            className={twMerge(`m-auto size-[150px] self-center`, iconClassName)}
          />
        )}
        {title && (
          <Typography as="h2" variant="h3" className="max-w-80 text-center text-pretty">
            {title}
          </Typography>
        )}
        {content && (
          <Blocks value={content} className={`${!title ? 'text-md' : ''} max-w-80 text-center text-pretty`} />
        )}
      </div>
    )
  },
)
