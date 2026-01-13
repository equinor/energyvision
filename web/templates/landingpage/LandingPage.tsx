import { toPlainText } from '@portabletext/react'
import { Typography } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'
import ContentGroup from '../../sections/ContentGroup/ContentGroup'
import type { LandingPageSchema, PortableTextBlock } from '../../types/index'

type LandingPageProps = {
  data: LandingPageSchema
}

const LandingPage = ({ data }: LandingPageProps) => {
  const { title, ingress, subGroups = [] } = data
  const plainTitle = title ? toPlainText(title as PortableTextBlock[]) : ''

  return (
    <main className='flex flex-col [:not(:has(.sticky-menu))]:pt-topbar'>
      <div className='px-layout-lg'>
        {title && (
          <Typography className='mx-auto max-w-[1186px]' variant='h1'>
            {plainTitle}
          </Typography>
        )}
        {ingress && (
          <Blocks variant='ingress' value={ingress} className='mb-6' />
        )}
      </div>
      <div className='flex flex-col gap-6 px-layout-md'>
        {subGroups?.map(group => {
          return <ContentGroup key={group.id} group={group} />
        })}
      </div>
    </main>
  )
}

export default LandingPage
