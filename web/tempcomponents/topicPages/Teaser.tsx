import { Teaser as EnvisTeaser, Heading } from '@components'
// import styled from 'styled-components'
import type { TeaserData } from '../../types/types'

const { Content, Media } = EnvisTeaser

type TeaserProps = {
  data: TeaserData
}

const Teaser = ({ data }: TeaserProps) => {
  return (
    <EnvisTeaser>
      <Media></Media>
      <Content>
        <Heading level="h2" size="xl">
          {data.title}
        </Heading>
      </Content>
    </EnvisTeaser>
  )
}

export default Teaser
