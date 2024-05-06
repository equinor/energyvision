import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { CampaignBannerData } from '../../types/types'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { PortableTextBlock } from '@portabletext/types'
import isEmpty from '../../pageComponents/shared/portableText/helpers/isEmpty'
import { BlockType } from '../../pageComponents/shared/portableText/helpers/defaultSerializers'
import { colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { urlFor } from '../../common/helpers'

/* eslint-disable @typescript-eslint/ban-ts-comment */
const campaignTitleBlocks: BlockType = {
  //@ts-ignore
  smallText: ({ children }: PortableTextBlock) => <p className="text-sm">{<>{children}</>}</p>,
  //@ts-ignore
  largeText: ({ children }: PortableTextBlock) => (
    <p className="block w-fit text-pretty text-2xl leading-none bg-white-100 rounded-sm p-2">{<>{children}</>}</p>
  ),
  //@ts-ignore
  extraLargeText: ({ children }: PortableTextBlock) => {
    return (
      <p className="block w-fit text-pretty text-4xl lg:text-8xl leading-none font-semibold mt-4 bg-white-100 rounded-sm p-2">
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
  2xl:aspect-[10/3]
  bg-local
  bg-center
  bg-no-repeat
  bg-cover
  mb-24
`

  const bgColor = backgroundUtility ? colorKeyToUtilityMap[backgroundUtility].background : ''
  const backgroundClassNames = twMerge(
    `${dark ? 'dark' : ''} pt-12 ${!backgroundImage?.image ? `pb-24 ${bgColor}` : ''} 
    ${backgroundImage?.image ? bgImageClassNames : ``}
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
      <div className={`px-layout-md w-full h-full`}>
        <div className="flex justify-start row-start-1 row-span-2">
          <h2 className="">
            <Blocks value={title} blocks={campaignTitleBlocks} className="w-fit max-w-prose text-energy-red-100" />
          </h2>
        </div>
      </div>
    </section>
  )
})
export default CampaignBanner
