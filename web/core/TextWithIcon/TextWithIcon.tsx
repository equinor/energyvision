import type { IconData } from '@equinor/eds-icons'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@/core/Typography'
import { TransformableIcon } from '../../icons/TransformableIcon'
import Blocks from '../../portableText/Blocks'
import { Image } from '../Image/Image'
import type { Image as ImageType } from '../Image/imageUtilities'

export type TextWithIconProps = {
  title?: string
  content?: PortableTextBlock[]
  iconData?: IconData
  image?: ImageType
  /** Icondata or imageUrl styling */
  iconClassName?: string
} & HTMLAttributes<HTMLDivElement>

export const TextWithIcon = forwardRef<HTMLDivElement, TextWithIconProps>(
  (
    { title, content, iconData, className = '', image, iconClassName = '' },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={twMerge(`flex flex-col items-center gap-2`, className)}
      >
        {iconData && (
          <TransformableIcon iconData={iconData} className={iconClassName} />
        )}
        {image?.asset && (
          <Image
            image={image}
            aspectRatio='original'
            fill
            /*             customHeight={150}
            customWidth={150} */
            className={twMerge(
              `m-auto size-[150px] self-center`,
              iconClassName,
            )}
          />
        )}
        {title && (
          <Typography as='h2' variant='h3' className='max-w-80 text-center'>
            {title}
          </Typography>
        )}
        {content && (
          <Blocks
            value={content}
            className={`${!title ? 'text-md' : ''} max-w-80 text-center`}
          />
        )}
      </div>
    )
  },
)
