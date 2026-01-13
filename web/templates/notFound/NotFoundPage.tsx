'use client'
import { toPlainText } from '@portabletext/react'
import { useTranslations } from 'next-intl'
import { ResourceLink } from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'
import BackgroundImage from '@/sections/errorPages/BackgroundImage'

export default function NotFoundPage({ backgroundImage, title, text }: any) {
  const intl = useTranslations()
  return (
    <div className='grid min-h-[80vh] grid-cols-[42%_58%]'>
      <div className='max-w-text px-40 pt-40 pb-10'>
        <Typography as='h1' className='pb-10 text-lg' variant='base'>
          <div className='pb-6 text-9xl text-energy-red-100'>404</div>
          {title && <span>{toPlainText(title)}</span>}
        </Typography>
        {text && <Blocks variant='ingress' value={text}></Blocks>}
        <ResourceLink variant='fit' href='/' className='pt-12'>
          {intl('logolink_title')}
        </ResourceLink>
      </div>
      <div className='relative'>
        {backgroundImage && (
          <BackgroundImage backgroundImage={backgroundImage} />
        )}
      </div>
    </div>
  )
}
