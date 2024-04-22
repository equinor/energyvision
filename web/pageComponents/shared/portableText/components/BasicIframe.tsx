import IFrame from '../../iframe/IFrame'

import type { PortableTextBlock } from '@portabletext/types'
import type { IFrameData } from 'types/types'
import styled from 'styled-components'
import RichText from '../RichText'
import { twMerge } from 'tailwind-merge'

type IframeRenderer = {
  _key: string
  _type: string
} & IFrameData

const Container = styled.div`
  clear: both;
`
type BlockProps = {
  isInline: boolean
  value: IframeRenderer
  className?: string
} & PortableTextBlock

export const BasicIframe = (iframe: BlockProps) => {
  const { value, className = '' } = iframe
  const data = {
    ...value,
    type: value._type,
    id: value._key,
  }

  return (
    <Container className={twMerge(`my-14 mx-auto`, className)}>
      {value.title && <RichText value={value.title} />}
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
