import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'
import Card from '@sections/cards/Card'
import { FormattedDate } from '@components/FormattedDateTime'
import Blocks from '../../../pageComponents/shared/portableText/Blocks'
import type { CardData } from '../../../types/types'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type PromotionCardProps = {
  data: CardData
  hasSectionTitle: boolean
  variant?: 'default' | 'single'
} & HTMLAttributes<HTMLAnchorElement>

/**
 * Promotion Card component.
 * Event and people are solved in their own
 * Remember to wrap in ul and li if in a list.
 * */
const PromotionCard = forwardRef<HTMLAnchorElement, PromotionCardProps>(function PromotionCard(
  { data, className = '', variant = 'default', hasSectionTitle = true },
  ref,
) {
  const isMobile = useMediaQuery(`(max-width: 768px)`)
  const { slug, title, ingress, publishDateTime, heroImage, id, type } = data

  return (
    <Card
      ref={ref}
      href={slug}
      image={heroImage?.image}
      variant={variant === 'single' && !isMobile ? 'single' : 'primary'}
      className={twMerge(`w-full h-full`, className)}
      key={id}
    >
      <Card.Content variant={variant === 'single' && !isMobile ? 'single' : 'primary'}>
        <Card.Header
          variant={variant === 'single' && !isMobile ? 'single' : 'primary'}
          {...(typeof title === 'string'
            ? {
                title: title,
              }
            : {
                titleBlock: title,
              })}
          titleLevel={hasSectionTitle ? 'h3' : 'h2'}
          {...(publishDateTime && {
            eyebrow: <FormattedDate datetime={publishDateTime} uppercase />,
          })}
        />
        {ingress && (
          <Blocks
            value={ingress}
            className={` max-w-prose grow ${type !== 'news' && type !== 'localNews' ? '' : 'hidden lg:block'}`}
            {...(!(variant === 'single' && !isMobile) && { clampLines: isMobile ? 3 : 5 })}
          />
        )}
      </Card.Content>
    </Card>
  )
})
export default PromotionCard
