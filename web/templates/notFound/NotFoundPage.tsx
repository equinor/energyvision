'use client'
import BackgroundImage from '@/pageComponents/errorPages/BackgroundImage'
import { Typography } from '@/core/Typography'
import { toPlainText } from '@portabletext/react'
import Blocks from '@/pageComponents/shared/portableText/Blocks'
import { ResourceLink } from '@/core/Link'
import { useTranslations } from 'next-intl'

export default function NotFoundPage({ backgroundImage, title, text }: any) {
  const intl = useTranslations()
  return (
    <div className="grid min-h-[80vh] grid-cols-[35%_65%]">
      <div className="px-40 pt-40 pb-10">
        <Typography as="h1" className="pb-10 text-lg" variant="base">
          <div className="pb-6 text-9xl text-energy-red-100">404</div>
          {title && <span>{toPlainText(title)}</span>}
        </Typography>
        {text && <Blocks className="prose-md" value={text}></Blocks>}
        <ResourceLink variant="fit" href="/" className="pt-12">
          {intl('logolink_title')}
        </ResourceLink>
      </div>
      <div className="relative">{backgroundImage && <BackgroundImage backgroundImage={backgroundImage} />}</div>
    </div>
  )
}
