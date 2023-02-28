import styled from 'styled-components'
import { urlFor } from '../../../common/helpers'
import { LoopingVideoData, LoopingVideoRatio } from '../../../types'

const StyledFigure = styled.figure<{ ratio: LoopingVideoRatio }>`
  justify-content: center;
  display: flex;
  background-color: var(--grey-10);
  min-width: 100%;
  margin: 0;
  ${({ ratio }) =>
    ratio === 'narrow' && {
      'max-height': '500px',
    }};
`

export const LoopingVideo = ({ video }: { video: LoopingVideoData }) => {
  const { title, url, thumbnail, ratio } = video
  const style: React.CSSProperties = {
    minWidth: '60vw',
    objectFit: ratio === 'narrow' ? 'cover' : undefined,
  }
  return (
    <StyledFigure ratio={ratio}>
      <video
        loop
        muted
        autoPlay
        playsInline
        title={title}
        poster={urlFor(thumbnail).url()}
        src={url.replace('cdn.sanity.io', 'cdn.equinor.com')}
        style={style}
      >
        <source type={'video/mp4'} />
      </video>
    </StyledFigure>
  )
}
