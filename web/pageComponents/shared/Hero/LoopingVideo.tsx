import styled from 'styled-components'
import { urlFor } from '../../../common/helpers'
import { LoopingVideoData } from '../../../types'

const StyledFigure = styled.figure`
  max-height: 600px;
  justify-content: center;
  display: flex;
  background-color: var(--grey-30);
`

export const LoopingVideo = ({ video }: { video: LoopingVideoData }) => {
  const { title, url, thumbnail } = video

  return (
    <StyledFigure>
      <video
        loop
        muted
        autoPlay
        playsInline
        title={title}
        poster={urlFor(thumbnail).height(600).url()}
        src={url.replace('cdn.sanity.io', 'cdn.equinor.com')}
      >
        <source type={'video/mp4'} />
      </video>
    </StyledFigure>
  )
}
