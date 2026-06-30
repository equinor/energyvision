import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { urlForImage } from '@/sanity/lib/utils'
import { CampaignBannerTitle } from './CampaignBannerTitle'
import { colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import type { CampaignBannerData } from '../../types/index'

export type CampaignBannerProps = {
  data: CampaignBannerData
  className?: string
} & HTMLAttributes<HTMLElement>

const CampaignBanner = forwardRef<HTMLElement, CampaignBannerProps>(
  function CampaignBanner({ data, className }, ref) {
    const { title, designOptions } = data
    const { background } = designOptions
    const { backgroundImage, backgroundUtility, dark } = background ?? {}

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

    const bgColor = backgroundUtility
      ? colorKeyToUtilityMap[backgroundUtility].background
      : ''
    const backgroundClassNames = twMerge(
      `${dark ? 'dark' : ''}
    ${backgroundImage?.image ? bgImageClassNames : `${bgColor} pt-12 pb-12 lg:pb-18`}
  `,
      className,
    )
    const imgUrl = backgroundImage?.image
      ? urlForImage(backgroundImage.image)
      : ''
    const props = {
      ...(backgroundImage?.image && {
        style: {
          backgroundImage: `url(${imgUrl})`,
        },
      }),
    }

    return (
      <section ref={ref} className={`${backgroundClassNames}`} {...props}>
        <div className={`mx-auto px-layout-md`}>
          <div className='flex justify-start'>
            <h2 className=''>
              <CampaignBannerTitle
                value={title}
                blockClassName='my-0 text-energy-red-100'
                className='w-fit max-w-prose text-energy-red-100'
              />
            </h2>
          </div>
        </div>
      </section>
    )
  },
)
export default CampaignBanner
