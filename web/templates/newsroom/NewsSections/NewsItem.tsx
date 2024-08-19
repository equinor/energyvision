import { FormattedDate } from '@components/FormattedDateTime'
import { forwardRef, HTMLAttributes } from 'react'
import { BaseLink } from '@core/Link'
import { Typography } from '@core/Typography'
import Image, { Ratios } from '../../../pageComponents/shared/SanityImage'
import envisTwMerge from '../../../twMerge'

export type NewsListItemProps = {
  data: any
} & HTMLAttributes<HTMLLIElement>

/* Not a semantic list even tho name implies it, used as other news pages with sections */
const NewsItem = forwardRef<HTMLLIElement, NewsListItemProps>(function NewsItem(
  { data, className = '', ...rest },
  ref,
) {
  const { slug, pageTitle, publishDateTime, heroImage } = data || {}

  return (
    <section ref={ref} className={envisTwMerge('', className)} {...rest}>
      <BaseLink href={slug} className="group grid grid-cols-[1fr_25vw] lg:grid-cols-[1fr_10vw] gap-4 lg:gap-6">
        <div>
          {publishDateTime && (
            <FormattedDate datetime={publishDateTime} uppercase className="text-xs font-normal leading-normal pb-1" />
          )}
          {pageTitle && (
            <Typography as="h2" variant="base" className="max-w-text text-pretty group-hover:underline">
              {pageTitle}
            </Typography>
          )}
        </div>
        <div className="lg:w-[173px] h-full aspect-5/4 lg:aspect-video relative">
          {heroImage && (
            <Image
              image={heroImage?.image}
              aspectRatio={Ratios.NINE_TO_SIXTEEN}
              sizes="(max-width: 800px) 100vw, 800px"
              fill
              className="rounded-xs"
            />
          )}
        </div>
      </BaseLink>
    </section>
  )
})
export default NewsItem
