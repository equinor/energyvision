'use client'

import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { usePage } from '@/contexts/pageContext'
import { ResourceLink } from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import BackgroundImage from '@/sections/errorPages/BackgroundImage'

export type ErrorPageProps = {
  variant?: '404' | '500'
  children?: ReactNode
}

export default function ErrorPage({
  variant = '404',
  children,
}: ErrorPageProps) {
  const intl = useTranslations()
  const { errorImage } = usePage()
  console.log('Error page variant', variant)

  return (
    <div className='grid min-h-[70vh] grid-cols-[44%_56%]'>
      <div className='max-w-text ps-40 pe-32 pt-40 pb-10'>
        <Typography as='h1' variant='h2' className='pb-10'>
          <div className='pb-6 text-9xl text-energy-red-100'>
            {variant === '500' ? 500 : 404}
          </div>
          {variant === '500'
            ? intl('serverErrorTitle')
            : intl('notFoundErrorTitle')}
        </Typography>
        <p className='text-base'>
          {variant === '500'
            ? intl('serverErrorSubtitle')
            : intl('notFoundErrorSubtitle')}
          <span className='block pt-4'>
            {variant === '500'
              ? intl('serverErrorContent')
              : intl('notFoundErrorContent')}
          </span>
        </p>
        <ResourceLink variant='fit' href='/' className='pt-12'>
          {intl('logolink_title')}
        </ResourceLink>
        {children}
      </div>
      <div className='relative'>
        {errorImage && <BackgroundImage backgroundImage={errorImage} />}
      </div>
    </div>
  )
}
