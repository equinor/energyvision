import useWindowSize from './useWindowSize'

function usePaginationPadding() {
  const { width } = useWindowSize()
  const isMobile = width && width < 375
  return isMobile ? 0 : 1
}

export default usePaginationPadding
