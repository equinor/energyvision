import { useHits } from 'react-instantsearch'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { HitData } from './UniversalHit'
import { Typography } from '@core/Typography'
import { useTranslations } from 'next-intl'

export type HitProps = { hit: AlgoliaHit<HitData> }

type HitsProps = {
  hitComponent: React.FC<{ hit: AlgoliaHit<HitData> }>
}

const Hits = ({ hitComponent: Hit }: HitsProps) => {
  const { items } = useHits()
  const t = useTranslations()
  if (!items || items.length === 0) {
    return (
      <div className="py-12 px-0">
        <Typography level="h2" size="sm">
          <div className="uppercase">{t('search_no_results_heading')}</div>
        </Typography>
        <Typography level="body" size="sm" className="mt-2">
          {t('search_no_results_generic')}
        </Typography>
      </div>
    )
  }

  return (
    <div className="relative">
      <ol>
        {items.map((item) => (
          <li
            key={item.objectID}
            className=" after:w-full after:border-b after:opacity-50 after:scale-y-50 after:absolute"
          >
            <Hit hit={item} />
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Hits
