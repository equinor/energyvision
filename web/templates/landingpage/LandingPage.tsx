import type { LandingPageSchema, PortableTextBlock } from '../../types/index'
import IngressText from '../../portableText/IngressText'
import ContentGroup from '../../pageComponents/landingPages/ContentGroup'
import Seo from '../../pageComponents/shared/Seo'
import { Typography } from '@/core/Typography'
import { toPlainText } from '@portabletext/react'

type LandingPageProps = {
  data: LandingPageSchema
}

const LandingPage = ({ data }: LandingPageProps) => {
  const { title, ingress, subGroups = [] } = data
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  return (
    <>
      <Seo seoAndSome={data?.seoAndSome} slug={data?.slug} pageTitle={data?.title} />
      <main>
        <div className="px-layout-md py-layout-lg">
          {title && (
            <Typography className="mx-auto max-w-[1186px]" as="h1" variant="3xl">
              {plainTitle}
            </Typography>
          )}
        </div>
        {ingress && <IngressText value={ingress} />}
        <div>
          {subGroups?.map((group) => {
            return <ContentGroup key={group.id} group={group} />
          })}
        </div>
      </main>
    </>
  )
}

export default LandingPage
