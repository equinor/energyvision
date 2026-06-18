'use client'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { useTranslations } from 'next-intl'
import { useHits } from 'react-instantsearch'
import { Typography } from '@/core/Typography'
import type { HitData } from './UniversalHit'

export type HitProps = { hit: AlgoliaHit<HitData> }

type HitsProps = {
  hitComponent: React.FC<{ hit: AlgoliaHit<HitData> }>
}

const Hits = ({ hitComponent: Hit }: HitsProps) => {
  const { items } = useHits()
  const t = useTranslations()
  if (!items || items.length === 0) {
    return (
      <div className='px-0 py-12'>
        <Typography as='h2' variant='lg' className='uppercase'>
          {t('search_no_results_heading')}
        </Typography>
        <Typography variant='body' className='mt-2'>
          {t('search_no_results_generic')}
        </Typography>
      </div>
    )
  }

  return (
    <div className='relative'>
      <ol>
        {items.map(item => (
          <li key={item.objectID}>
            <Hit hit={item} />
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Hits
