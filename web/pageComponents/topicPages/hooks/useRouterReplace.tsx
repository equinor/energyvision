import { useRouter } from 'next/router'
import { stringify } from 'query-string'

const useRouterReplace = () => {
  const router = useRouter()

  return (queryParams = {}, routerOptions = {}) => {
    let originalQuery
    // @TODO: Look at how we should make this more general if we have more than slug
    if ('slug' in router.query) {
      // eslint-disable-next-line no-unused-vars
      const { slug, ...rest } = router.query
      originalQuery = rest
    } else {
      originalQuery = router.query
    }

    const query = { ...originalQuery, ...queryParams }
    const href = { pathname: router.pathname, query }

    const urlParts = router.asPath.split('?')
    const hasQueryParams = Object.keys(query).length > 0

    router.replace(href, `${urlParts[0]}${hasQueryParams ? `?${stringify(query)}` : ''}`, {
      shallow: true,
      ...routerOptions,
    })
  }
}

export default useRouterReplace
