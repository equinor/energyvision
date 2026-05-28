import { getTranslations } from 'next-intl/server'
import { twMerge } from 'tailwind-merge'
import { ArrowRight } from '../../icons'
import { BaseLink, type BaseLinkProps } from './BaseLink'

export type LinkProps = BaseLinkProps

/** Regular link style for use*/
export const Link = async ({
  ref,
  children,
  type = 'internalUrl',
  className = '',
  href = '',
  hrefLang,
  onClick,
}: LinkProps) => {
  const t = await getTranslations()

  const classNames = twMerge(
    `text-slate-blue-95
    dark:text-white-100
    w-fit 
    inline-flex
    items-center
    underline
    hover:text-norwegian-woods-100
    dark:hover:text-slate-blue-95
  `,
    className,
  )

  const isTel = href.includes('tel:')
  const isMailTo = href.includes('mailto:')
  const showArrow = type === 'externalUrl' && !isTel && !isMailTo

  return (
    <BaseLink
      className={classNames}
      type={type}
      ref={ref}
      href={href}
      hrefLang={hrefLang}
      onClick={onClick}
    >
      {children}
      {showArrow && (
        <ArrowRight
          aria-hidden='false'
          aria-label={t('externalLink')}
          className='-rotate-45 inline-block origin-center pb-1 text-no'
        />
      )}
    </BaseLink>
  )
}

export default Link
