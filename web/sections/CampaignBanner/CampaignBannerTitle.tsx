'use client'

import type { PortableTextBlock } from '@portabletext/types'
import Blocks, { type MarkType } from '../../portableText/Blocks'
import isEmpty from '../../portableText/helpers/isEmpty'

/* eslint-disable @typescript-eslint/ban-ts-comment */
const campaignTitleBlocks: MarkType = {
  //@ts-ignore
  smallText: ({ children }: PortableTextBlock) => (
    <p className='text-sm'>{<>{children}</>}</p>
  ),
  //@ts-ignore
  largeText: ({ children }: PortableTextBlock) => (
    <p className='block w-fit text-balance rounded-xs bg-white-100 text-2xl leading-none'>
      {<>{children}</>}
    </p>
  ),
  //@ts-ignore
  extraLargeText: ({ children }: PortableTextBlock) => {
    return (
      <p className='mt-4 block w-fit text-balance rounded-xs bg-white-100 font-semibold text-4xl leading-none lg:text-8xl'>
        {<>{children}</>}
      </p>
    )
  },
  //@ts-ignore
  normal: ({ children }: PortableTextBlock) => {
    if (isEmpty(children)) return null
    return (
      <p>
        <>{children}</>
      </p>
    )
  },
}
/* eslint-enable @typescript-eslint/ban-ts-comment */

type CampaignBannerTitleProps = {
  value: PortableTextBlock[]
  blockClassName?: string
  className?: string
}

export const CampaignBannerTitle = ({
  value,
  blockClassName,
  className,
}: CampaignBannerTitleProps) => {
  return (
    <Blocks
      value={value}
      blockClassName={blockClassName}
      blocksComponents={campaignTitleBlocks}
      className={className}
    />
  )
}
