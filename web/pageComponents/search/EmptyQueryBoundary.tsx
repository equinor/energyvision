import { useInstantSearch } from 'react-instantsearch-hooks-web'

export const EmptyQueryBoundary = ({ children, fallback }: any) => {
  const { indexUiState, results } = useInstantSearch()
  if (!indexUiState.query && !results.__isArtificial) {
    return fallback
  }

  return children
}

export default EmptyQueryBoundary
