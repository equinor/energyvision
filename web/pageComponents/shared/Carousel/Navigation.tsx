import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { Button } from '@components'
import { chevron_right, chevron_left } from '@equinor/eds-icons'
import { useSwiper } from 'swiper/react'
import { useState, useEffect } from 'react'

const SharedStyle = styled.div`
  height: calc(100% - var(--space-xxLarge));
  position: absolute;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 var(--space-small);
`

const Prev = styled(SharedStyle)`
  left: 0;
`

const Next = styled(SharedStyle)`
  right: 0;
`

export const NavButton = ({ type }: { type: 'prev' | 'next' }) => {
  const swiper = useSwiper()

  /**
   * The useSwiper hook is not reactive. So we need to rely on events and state
   * in order to _make_ it reactive.
   */
  const [swiperConfig, setSwiperConfig] = useState({
    isLocked: swiper.isLocked,
    isBeginning: swiper.isBeginning,
    isEnd: swiper.isEnd,
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateConfig = (swipe: any) => {
      setSwiperConfig({
        isLocked: swipe.isLocked,
        isBeginning: swipe.isBeginning,
        isEnd: swipe.isEnd,
      })
    }

    swiper.on('slideChange', (swipe) => {
      updateConfig(swipe)
    })
    swiper.on('lock', (swipe) => {
      updateConfig(swipe)
    })
    swiper.on('unlock', (swipe) => {
      updateConfig(swipe)
    })
  }, [swiper])

  if (type !== 'prev' && type !== 'next') return null

  if (swiperConfig.isLocked) return null

  const isPrev = type === 'prev'

  if ((isPrev && swiperConfig.isBeginning) || (!isPrev && swiperConfig.isEnd)) return null

  const Wrapper = isPrev ? Prev : Next

  return (
    <Wrapper>
      <Button variant="contained_icon" onClick={() => (isPrev ? swiper.slidePrev() : swiper.slideNext())}>
        <Icon size={16} data={isPrev ? chevron_left : chevron_right} />
      </Button>
    </Wrapper>
  )
}
