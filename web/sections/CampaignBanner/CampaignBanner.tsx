import { forwardRef, HTMLAttributes } from 'react'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import { twMerge } from 'tailwind-merge'
import { CampaignBannerData } from '../../types/types'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { PortableTextBlock } from '@portabletext/types'
import isEmpty from '../../pageComponents/shared/portableText/helpers/isEmpty'
import { BlockType } from '../../pageComponents/shared/portableText/helpers/defaultSerializers'
import { colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'

const DEFAULT_MAX_WIDTH = 1920

/* eslint-disable @typescript-eslint/ban-ts-comment */
const campaignTitleBlocks: BlockType = {
  //@ts-ignore
  smallText: ({ children }: PortableTextBlock) => <span className="text-sm">{<>{children}</>}</span>,
  //@ts-ignore
  largeText: ({ children }: PortableTextBlock) => (
    <span className="block w-fit text-pretty text-2xl leading-none bg-white-100 rounded-sm p-2">{<>{children}</>}</span>
  ),
  //@ts-ignore
  extraLargeText: ({ children }: PortableTextBlock) => {
    return (
      <span className="block w-fit text-pretty text-4xl lg:text-8xl leading-none font-semibold mt-4 bg-white-100 rounded-sm p-2">
        {<>{children}</>}
      </span>
    )
  },
  //@ts-ignore
  normal: ({ children }: PortableTextBlock) => {
    if (isEmpty(children)) return null
    return (
      <span>
        <>{children}</>
      </span>
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

  const props = useSanityLoader(backgroundImage, DEFAULT_MAX_WIDTH, undefined)
  const src = props?.src

  const bgImageClassNames = `[container:inline-size]
  relative
  w-full
  2xl:aspect-[10/3]
  bg-local
  bg-center
  bg-no-repeat
  bg-cover
  mb-20
`

  const bgColor = backgroundUtility ? colorKeyToUtilityMap[backgroundUtility].background : ''
  const backgroundClassNames = twMerge(
    `${dark} ${!backgroundImage ? ` pt-12 pb-24 ${bgColor}` : ''} 
    ${backgroundImage ? bgImageClassNames : ``}
  `,
    className,
  )

  return (
    <section
      ref={ref}
      className={`${backgroundClassNames}`}
      {...(backgroundImage && {
        style: { backgroundImage: `url(${src})` },
      })}
    >
      <div className={`px-layout-sm w-full h-full`}>
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
