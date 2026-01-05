'use client'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { Typography } from '@/core/Typography'
import Card from '@/sections/cards/Card'
import type { ColorKeys } from '@/styles/colorKeyToUtilityMap'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'
import type { CardData } from '../../../types/index'

export type PromotionCardProps = {
  data: CardData
  background?: ColorKeys
  hasSectionTitle: boolean
  variant?: 'default' | 'single'
  /** Override background image styling for card element */
  imageClassName?: string
  /* Override styling on card header title element */
  titleClassName?: string
  /* grey card background as long as not on colored background */
  onColorBg?: boolean
} & HTMLAttributes<HTMLAnchorElement>

/**
 * Promotion Card component.
 * Event and people are solved in their own
 * Remember to wrap in ul and li if in a list.
 * */
const PromotionCard = forwardRef<HTMLAnchorElement, PromotionCardProps>(
  function PromotionCard(
    {
      data,
      className = '',
      imageClassName = '',
      titleClassName = '',
      variant = 'default',
      hasSectionTitle = true,
      onColorBg = false,
    },
    ref,
  ) {
    const isMobile = useMediaQuery(`(max-width: 768px)`)
    const { slug, title, ingress, publishDateTime, heroImage, id, type } = data

    const plainIngress = Array.isArray(ingress)
      ? ingress
          .map(block => block.children.map((span: any) => span.text).join(''))
          .join('\n')
          .replace(/\n/g, ' ')
      : ingress

    return (
      <Card
        ref={ref}
        href={slug}
        onColorBg={onColorBg}
        image={heroImage?.image}
        variant={variant === 'single' && !isMobile ? 'single' : 'primary'}
        className={twMerge(`h-full w-full`, className)}
        imageClassName={imageClassName}
        key={id}
      >
        <Card.Content
          variant={variant === 'single' && !isMobile ? 'single' : 'primary'}
        >
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
              eyebrow: (
                <FormattedDateTime
                  variant='date'
                  datetime={publishDateTime}
                  uppercase
                  className='text-xs'
                />
              ),
            })}
            titleClassName={titleClassName}
          />
          {ingress && (
            <Typography
              group='card'
              variant='ingress'
              className={`truncate ${type !== 'news' && type !== 'localNews' ? '' : 'max-lg:hidden'} line-clamp-3 lg:line-clamp-5`}
            >
              {plainIngress}
            </Typography>
          )}
        </Card.Content>
      </Card>
    )
  },
)
export default PromotionCard
