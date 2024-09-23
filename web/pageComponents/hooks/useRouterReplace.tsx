import { useRouter } from 'next/router'
import { stringify } from 'query-string'

const useRouterReplace = () => {
  const router = useRouter()

  return (queryParams = {}, routerOptions = {}) => {
    let originalQuery
    // @TODO: Look at how we should make this more general if we have more than slug
    // The slug is something next.js adds with dynamic routes
    if ('slug' in router.query) {
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { slug, ...rest } = router.query
      originalQuery = rest
    } else {
      originalQuery = router.query
    }

    const query = { ...originalQuery, ...queryParams }

    const href = { pathname: router.pathname, query }
    const urlParts = router.asPath.split('?')

    // Check to see if this has a hash
    // We probably don't want the # part of an url when we replace an url
    const plainUrl = urlParts[0].split('#')[0] || urlParts[0]

    const hasQueryParams = Object.keys(query).length > 0

    router.replace(href, `${plainUrl}${hasQueryParams ? `?${stringify(query)}` : ''}`, {
      shallow: true,
      ...routerOptions,
    })
  }
}

export const useRouterClearParams = () => {
  const router = useRouter()

  return (routerOptions = {}) => {
    const href = { pathname: router.pathname }
    delete router.query.filter
    router.replace(href, undefined, { shallow: true, ...routerOptions })
  }
}
export default useRouterReplace
