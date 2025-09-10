import type { LandingPageSchema, PortableTextBlock } from '../../types/index'
import ContentGroup from '../../pageComponents/landingPages/ContentGroup'
import Seo from '../../pageComponents/shared/Seo'
import { Typography } from '@/core/Typography'
import { toPlainText } from '@portabletext/react'
import Blocks from '@/portableText/Blocks'

type LandingPageProps = {
  data: LandingPageSchema
}

const LandingPage = ({ data }: LandingPageProps) => {
  const { title, ingress, subGroups = [] } = data
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  return (
    <>
      <Seo seoAndSome={data?.seoAndSome} slug={data?.slug} pageTitle={data?.title} />
      <main className="pt-20 pb-page-content">
        <div className="px-layout-lg">
          {title && (
            <Typography className="mx-auto max-w-[1186px]" variant="h1">
              {plainTitle}
            </Typography>
          )}
          {ingress && <Blocks variant="ingress" value={ingress} className="mb-6" />}
        </div>
        <div className="flex flex-col gap-6 px-layout-md">
          {subGroups?.map((group) => {
            return <ContentGroup key={group.id} group={group} />
          })}
        </div>
      </main>
    </>
  )
}

export default LandingPage
