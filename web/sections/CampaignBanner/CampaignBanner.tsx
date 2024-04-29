import { forwardRef, HTMLAttributes } from 'react'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import { twMerge } from 'tailwind-merge'
import { CampaignBannerData } from '../../types/types'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { PortableTextBlock } from '@portabletext/types'
import isEmpty from '../../pageComponents/shared/portableText/helpers/isEmpty'
import { BlockType } from '../../pageComponents/shared/portableText/helpers/defaultSerializers'

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
  const {
    title,
    text,
    backgroundImage,
    backgroundColor,
    backgroundUtility,
    useLightOverlay = false,
    attribution,
  } = data
  console.log('CampaignBanner', data)
  const props = useSanityLoader(backgroundImage, DEFAULT_MAX_WIDTH, undefined)
  const src = props?.src

  const backgroundClassNames = twMerge(
    `[container:inline-size]
      relative
      ${useLightOverlay ? '' : 'dark'}
      w-full
      2xl:aspect-[10/3]
      bg-local
      bg-center
      bg-no-repeat
      bg-cover
      mb-20
    `,
    className,
  )

  const scrimGradient = useLightOverlay ? `white-center-gradient ` : `black-center-gradient`

  return (
    <section
      ref={ref}
      className={`${backgroundClassNames}`}
      style={{
        backgroundImage: `url(${src})`,
      }}
    >
      {/** Scrim */}
      <div
        className={`
          pt-24
          pb-12
          h-full
          relative
          `}
      >
        <div
          className={`px-layout-sm ${
            text ? `grid grid-cols-[60%_40%] grid-rows-[1fr_1fr_1fr] justify-between gap-40` : 'w-full h-full'
          }`}
        >
          <div className="flex justify-start row-start-1 row-span-2">
            <h2 className="">
              <Blocks value={title} blocks={campaignTitleBlocks} className="w-fit max-w-prose text-energy-red-100" />
            </h2>
          </div>
          <div className=" flex justify-end items-center row-start-2 row-span-2">
            <Blocks value={text} className="bg-white-100 text-slate-80 px-2 py-4 h-fit" />
          </div>
        </div>
      </div>
    </section>
  )
})
export default CampaignBanner
