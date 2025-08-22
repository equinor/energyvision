import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { CampaignBannerData } from '../../types/index'
import Blocks, { MarkType } from '../../portableText/Blocks'
import { PortableTextBlock } from '@portabletext/types'
import isEmpty from '../../portableText/helpers/isEmpty'
//import { BlockType } from '../../portableText/helpers/defaultSerializers'
import { colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { urlFor } from '../../common/helpers'

/* eslint-disable @typescript-eslint/ban-ts-comment */
const campaignTitleBlocks: MarkType = {
  //@ts-ignore
  smallText: ({ children }: PortableTextBlock) => <p className="text-sm">{<>{children}</>}</p>,
  //@ts-ignore
  largeText: ({ children }: PortableTextBlock) => (
    <p className="block w-fit rounded-xs bg-white-100 text-2xl leading-none text-pretty">{<>{children}</>}</p>
  ),
  //@ts-ignore
  extraLargeText: ({ children }: PortableTextBlock) => {
    return (
      <p className="mt-4 block w-fit rounded-xs bg-white-100 text-4xl leading-none font-semibold text-pretty lg:text-8xl">
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

export type CampaignBannerProps = {
  data: CampaignBannerData
  className?: string
} & HTMLAttributes<HTMLElement>

const CampaignBanner = forwardRef<HTMLElement, CampaignBannerProps>(function CampaignBanner({ data, className }, ref) {
  const { title, designOptions } = data
  const { background } = designOptions
  const { backgroundImage, backgroundUtility, dark } = background

  const bgImageClassNames = `[container:inline-size]
  relative
  w-full
  bg-local
  bg-center
  bg-no-repeat
  bg-cover
  mb-18
  pt-24
  pb-40
  lg:pb-52
  2xl:pb-64
`

  const bgColor = backgroundUtility ? colorKeyToUtilityMap[backgroundUtility].background : ''
  const backgroundClassNames = twMerge(
    `${dark ? 'dark' : ''}
    ${backgroundImage?.image ? bgImageClassNames : `${bgColor} pt-12 pb-12 lg:pb-18`}
  `,
    className,
  )
  const imgUrl = backgroundImage?.image ? urlFor(backgroundImage.image) : ''
  const props = {
    ...(backgroundImage?.image && {
      style: {
        backgroundImage: `url(${imgUrl})`,
      },
    }),
  }

  return (
    <section ref={ref} className={`${backgroundClassNames}`} {...props}>
      <div className={`mx-auto max-w-viewport px-layout-md`}>
        <div className="flex justify-start">
          <h2 className="">
            <Blocks
              value={title}
              variant="prose-campaign"
              blocksComponents={campaignTitleBlocks}
              className="w-fit max-w-prose text-energy-red-100"
            />
          </h2>
        </div>
      </div>
    </section>
  )
})
export default CampaignBanner
