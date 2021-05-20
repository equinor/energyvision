import styled from 'styled-components'
import type { PageSchema } from '../../types/types'
import Teaser from '../topicPages/Teaser'
import { TeaserData } from '../../types/types'

const TopicPageLayout = styled.div``

type TopicPageProps = {
  data: PageSchema
}

// How could we do this for several different component types?
type ComponentProps = TeaserData

const TopicPage = ({ data }: TopicPageProps) => {
  console.log('page data', data)

  const content = (data.content || []).map((c: ComponentProps) => {
    switch (c._type) {
      case 'teaser':
        return <Teaser key={c._key} data={c} />
      default:
        return null
    }
  })
  return (
    <TopicPageLayout>
      <h1>{data?.title}</h1>
      {content}
    </TopicPageLayout>
  )
}

export default TopicPage
