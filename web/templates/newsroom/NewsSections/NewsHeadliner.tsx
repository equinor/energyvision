import { FormattedDate } from '@components/FormattedDateTime'
import { forwardRef, HTMLAttributes } from 'react'
import { BaseLink } from '@core/Link'
import { Typography } from '@core/Typography'
import Image, { Ratios } from '../../../pageComponents/shared/SanityImage'
import envisTwMerge from '../../../twMerge'

export type NewsHeadlinerProps = {
  data: any
} & HTMLAttributes<HTMLLIElement>

const NewsHeadliner = forwardRef<HTMLLIElement, NewsHeadlinerProps>(function NewsHeadliner(
  { data, className = '', ...rest },
  ref,
) {
  const { slug, pageTitle, ingress, publishDateTime, heroImage } = data

  return (
    <section ref={ref} {...rest} className={envisTwMerge('', className)}>
      <BaseLink href={slug} className="group flex flex-col gap-2 pb-12">
        {heroImage && (
          <div className="aspect-video relative max-h-[324px] mb-2">
            <Image
              image={heroImage?.image}
              fill
              priority
              aspectRatio={Ratios.NINE_TO_SIXTEEN}
              sizes="(max-width: 800px) 100vw, 1440px"
              className="rounded-xs"
            />
          </div>
        )}
        {publishDateTime && (
          <FormattedDate datetime={publishDateTime} uppercase className="text-xs font-normal leading-normal" />
        )}
        {pageTitle && (
          <Typography as="h2" variant="md" className="group-hover:underline">
            {pageTitle}
          </Typography>
        )}
        {ingress && (
          <Typography variant="body" className="text-sm max-w-prose`">
            {ingress}
          </Typography>
        )}
      </BaseLink>
    </section>
  )
})
export default NewsHeadliner
