import { FormattedDate } from '@components/FormattedDateTime'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { forwardRef, HTMLAttributes } from 'react'
import { CardData } from '../../types/types'
import { BaseLink } from '@core/Link'
import { Typography } from '@core/Typography'
import Image, { Ratios } from '../../pageComponents/shared/SanityImage'
import envisTwMerge from '../../twMerge'

export type PageHeadlinerProps = {
  data: CardData
} & HTMLAttributes<HTMLLIElement>

const PageHeadliner = forwardRef<HTMLLIElement, PageHeadlinerProps>(function PageHeadliner(
  { data, className = '', ...rest },
  ref,
) {
  const { slug, title, ingress, publishDateTime, heroImage, id, type } = data

  return (
    <section ref={ref} {...rest} className={envisTwMerge('', className)}>
      <BaseLink href={slug} className="group flex flex-col gap-2 pb-12">
        {heroImage && (
          <div className="aspect-video relative max-h-[324px]">
            <Image
              image={heroImage?.image}
              fill
              priority
              aspectRatio={Ratios.NINE_TO_SIXTEEN}
              sizes="(max-width: 800px) 100vw, 1440px"
              className="rounded-sm"
            />
          </div>
        )}
        {publishDateTime && (
          <FormattedDate datetime={publishDateTime} uppercase className="text-xs font-medium leading-normal" />
        )}
        {title && (
          <Typography as="h2" variant="md" className="group-hover:underline">
            {title}
          </Typography>
        )}
        {ingress && (
          <Blocks
            value={ingress}
            className={`text-sm max-w-prose`}
            marks={{
              em: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
              strong: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
            }}
          />
        )}
      </BaseLink>
    </section>
  )
})
export default PageHeadliner
