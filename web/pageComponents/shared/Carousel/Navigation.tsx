import styled from 'styled-components'
import { Icon } from '@equinor/eds-core-react'
import { Button } from '@components'
import { chevron_right, chevron_left } from '@equinor/eds-icons'
import { useSwiper } from 'swiper/react'
import { useState, useEffect } from 'react'
import type { Swiper } from 'swiper'

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

const StyledButton = styled(Button)`
  background: var(--white-100);
  border: 1px solid var(--black-80);
  color: var(--black-80);

  &:hover {
    background: var(--black-80);
    color: var(--white-100);
  }
`

type NavigationType = 'prev' | 'next'

const checkShouldRender = (config: Swiper, type: NavigationType) => {
  if (config.isLocked) return false

  if (config.isBeginning == null || config.isEnd == null) return false

  if ((type === 'prev' && config.isBeginning) || (type !== 'prev' && config.isEnd)) return false

  return true
}

export const NavButton = ({ type }: { type: 'prev' | 'next' }) => {
  const swiper = useSwiper()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setShouldRender(checkShouldRender(swiper, type))

    swiper.on('reachBeginning', (swipe) => setShouldRender(checkShouldRender(swipe, type)))
    swiper.on('reachEnd', (swipe) => setShouldRender(checkShouldRender(swipe, type)))
    swiper.on('lock', (swipe) => setShouldRender(checkShouldRender(swipe, type)))
    swiper.on('unlock', (swipe) => setShouldRender(checkShouldRender(swipe, type)))

    return () => {
      swiper.off('reachBeginning', (swipe) => setShouldRender(checkShouldRender(swipe, type)))
      swiper.off('reachEnd', (swipe) => setShouldRender(checkShouldRender(swipe, type)))
      swiper.off('lock', (swipe) => setShouldRender(checkShouldRender(swipe, type)))
      swiper.off('unlock', (swipe) => setShouldRender(checkShouldRender(swipe, type)))
    }
  }, [swiper, setShouldRender, type])

  if (!shouldRender) return null

  const isPrev = type === 'prev'
  const Wrapper = isPrev ? Prev : Next

  return (
    <Wrapper>
      <StyledButton variant="contained_icon" onClick={() => (isPrev ? swiper.slidePrev() : swiper.slideNext())}>
        <Icon size={16} data={isPrev ? chevron_left : chevron_right} />
      </StyledButton>
    </Wrapper>
  )
}
