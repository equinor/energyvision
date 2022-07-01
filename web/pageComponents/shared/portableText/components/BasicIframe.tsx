import IFrame from '../../iframe/IFrame'

import type { PortableTextBlock } from '@portabletext/types'
import type { IFrameData } from 'types/types'
import styled from 'styled-components'

type IframeRenderer = {
  _key: string
  _type: string
} & IFrameData

const Container = styled.div`
  margin: var(--space-xxLarge) auto;
  clear: both;
`
type BlockProps = {
  isInline: boolean
  value: IframeRenderer
} & PortableTextBlock

export const BasicIframe = (iframe: BlockProps) => {
  const { value } = iframe
  const data = {
    ...value,
    type: value._type,
    id: value._key,
  }

  return (
    <Container>
      <IFrame
        frameTitle={data.frameTitle}
        url={data.url}
        cookiePolicy={data.cookiePolicy}
        aspectRatio={data.designOptions.aspectRatio}
        height={data.designOptions.height}
        hasSectionTitle={!!data.title}
      />
    </Container>
  )
}
