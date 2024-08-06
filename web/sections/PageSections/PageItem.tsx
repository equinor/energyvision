import { FormattedDate } from '@components/FormattedDateTime'
import { forwardRef, HTMLAttributes } from 'react'
import { CardData } from '../../types/types'
import { BaseLink } from '@core/Link'
import { Typography } from '@core/Typography'
import Image, { Ratios } from '../../pageComponents/shared/SanityImage'
import envisTwMerge from '../../twMerge'

export type PageListItemProps = {
  data: CardData
} & HTMLAttributes<HTMLLIElement>

/* Not a semantic list even tho name implies it, used as other news pages with sections */
const PageItem = forwardRef<HTMLLIElement, PageListItemProps>(function PageItem(
  { data, className = '', ...rest },
  ref,
) {
  const { slug, title, ingress, publishDateTime, heroImage, id, type } = data || {}

  return (
    <section ref={ref} className={envisTwMerge('', className)} {...rest}>
      <BaseLink href={slug} className="group flex justify-between">
        <div>
          {publishDateTime && (
            <FormattedDate datetime={publishDateTime} uppercase className="text-2xs font-medium leading-normal pb-1" />
          )}
          {title && (
            <Typography as="h2" variant="base" className="group-hover:underline">
              {title}
            </Typography>
          )}
        </div>
        {heroImage && (
          <div className="lg:w-[173px] h-full aspect-video relative">
            <Image
              image={heroImage?.image}
              aspectRatio={Ratios.NINE_TO_SIXTEEN}
              sizes="(max-width: 800px) 100vw, 800px"
              fill
              className="rounded-sm"
            />
          </div>
        )}
      </BaseLink>
    </section>
  )
})
export default PageItem
