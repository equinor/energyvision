import styled from 'styled-components'
import type { PageSchema } from '../../types/types'
import Teaser from '../topicPages/Teaser'
import TextBlock from '../topicPages/TextBlock'
import FullWidthImage from '../topicPages/FullWidthImage'
import Figure from '../topicPages/Figure'
import { TeaserData, TextBlockData, FullWidthImageData, FigureData } from '../../types/types'

const TopicPageLayout = styled.div``

type TopicPageProps = {
  data: PageSchema
}

// How could we do this for several different component types?
type ComponentProps = TeaserData | TextBlockData | FullWidthImageData | FigureData

const TopicPage = ({ data }: TopicPageProps) => {
  const content = (data.content || []).map((c: ComponentProps) => {
    switch (c.type) {
      case 'teaser':
        return <Teaser key={c.id} data={c as TeaserData} />
      case 'textBlock':
        return <TextBlock key={c.id} data={c as TextBlockData} />
      case 'fullWidthImage':
        return <FullWidthImage key={c.id} data={c as FullWidthImageData} />
      case 'figure':
        return <Figure key={c.id} data={c as FigureData} />
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
