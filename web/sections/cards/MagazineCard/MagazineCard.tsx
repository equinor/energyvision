import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Card from '@/sections/cards/Card'
import type { ColorKeys } from '@/styles/colorKeyToUtilityMap'
import type { MagazineCardData } from '../../../types/index'

export type MagazineCardProps = {
  data: MagazineCardData
  background?: ColorKeys
} & HTMLAttributes<HTMLAnchorElement>

/**
 * Magazine Card component.
 * Remember to wrap in ul and li if in a list.
 * */
const MagazineCard = forwardRef<HTMLAnchorElement, MagazineCardProps>(
  function MagazineCard({ data, background, className = '' }, ref) {
    const { slug = '', title, hero, id } = data

    return (
      <Card
        ref={ref}
        href={slug}
        image={hero?.figure?.image}
        variant={'primary'}
        className={twMerge(`h-full w-full`, className)}
        key={id}
      >
        <Card.Content variant={'primary'}>
          <div className='leading-cloudy'>
            <Card.Header
              variant={'primary'}
              {...(typeof title === 'string'
                ? {
                    title: title,
                  }
                : {
                    titleBlock: title,
                  })}
              titleLevel={'h2'}
            />
          </div>
        </Card.Content>
      </Card>
    )
  },
)
export default MagazineCard
