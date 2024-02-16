import { useMediaQuery } from './useMediaQuery'

function usePaginationPadding() {
  const isMobile = useMediaQuery(`(max-width: 375px)`)
  return isMobile ? 0 : 1
}

export default usePaginationPadding
