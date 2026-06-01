'use client'
import { useTranslations } from 'next-intl'
import type { AnchorHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { LogoSecondary } from '@/core/Logo/Logo'
import { Link } from '@/i18n/navigation'

export type LogoLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const LogoLink = ({ className, ...rest }: LogoLinkProps) => {
  const intl = useTranslations()
  return (
    <Link
      href='/'
      aria-label={intl('logolink_title') ?? 'Go to homepage'}
      {...rest}
      className={twMerge(
        'focus-visible:envis-outline dark:focus-visible:envis-outline-invert flex h-full items-center justify-self-start text-energy-red-100 focus:outline-hidden dark:text-white-100',
        className,
      )}
      prefetch={false}
    >
      <LogoSecondary className='-mt-[5%]' />
    </Link>
  )
}
