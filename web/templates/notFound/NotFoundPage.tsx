'use client'

import BackgroundImage from '@/pageComponents/errorPages/BackgroundImage'
import { Typography } from '@/core/Typography'
import { toPlainText } from '@portabletext/react'
import Blocks from '@/pageComponents/shared/portableText/Blocks'

export default async function NotFoundPage({ backgroundImage, title, text }: any) {
  return (
    <div className="relative min-h-[80vh]">
      {backgroundImage && <BackgroundImage backgroundImage={backgroundImage} />}
      <div className="relative pt-16 pb-10 px-layout-md">
        <Typography as="h1" className="pb-10 " variant="3xl">
          <span className="text-5xl block font-medium text-slate-blue-80">404</span>
          {title && <span>{toPlainText(title)}</span>}
        </Typography>
        {text && <Blocks className="prose-md" value={text}></Blocks>}
      </div>
    </div>
  )
}
