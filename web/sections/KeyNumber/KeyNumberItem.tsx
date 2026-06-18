import type { ElementType } from 'react'
import { Typography } from '@/core/Typography'
import type { KeyNumberItemData } from '../../types'

type Variants = 'default' | 'card'
type KeyNumberItemProps = {
  as?: ElementType
  variant?: Variants
  isScrollable?: boolean
} & KeyNumberItemData
export default function ({
  as = 'li',
  variant = 'default',
  keyNumber,
  description,
  unit,
}: KeyNumberItemProps) {
  const KeyNumberItemTag = as

  return (
    <KeyNumberItemTag
      className={`${variant === 'card' ? 'flex h-full min-w-[400px] flex-col gap-2 rounded-md px-6 py-8 shadow-card active:shadow-card-interact' : ''}`}
    >
      <div className='flex items-baseline gap-2'>
        <Typography
          group='plain'
          variant='div'
          className='font-medium text-3xl leading-planetary'
        >{`${keyNumber?.toLocaleString()} `}</Typography>
        {unit && (
          <Typography
            group='plain'
            variant='div'
            className='font-medium text-xl'
          >
            {unit}
          </Typography>
        )}
      </div>
      {description && (
        <Typography group='plain' variant='div' className='text-md'>
          {description}
        </Typography>
      )}
    </KeyNumberItemTag>
  )
}
