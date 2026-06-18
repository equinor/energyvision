'use client'
import { useTranslations } from 'next-intl'

export const Footnote = ({ children, markKey }: { markKey?: any; children?: React.ReactNode }) => {
  const t = useTranslations()
  return (
    <span>
      {children}
      <span>
        <a id={`back_ref_${markKey}`} href={`#${markKey}`} aria-describedby="footnote-label">
          {/* the number for footnote is added by css see tailwind.css components */}
          <span className="sr-only">{t('footnote')}</span>
        </a>
      </span>
    </span>
  )
}
