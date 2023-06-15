import type { FullWidthVideoData } from '../../types/types'
import Image, { Ratios } from '../shared/SanityImage'
import { StyledCaption } from '../shared/image/StyledCaption'

type TeaserProps = {
  data: FullWidthVideoData
  anchor?: string
}

const FullWidthVideo = ({ data }: TeaserProps) => {
  console.log(data)
  return <></>
}

export default FullWidthVideo
