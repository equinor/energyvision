import { useRouter } from 'next/router'

const useRouterRemoveQueryParams = () => {
  const router = useRouter()

  return (routerOptions = {}) => {
    const urlParts = router.asPath.split('?')

    // Check to see if this has a hash
    // We probably don't want the # part of an url when we replace an url
    const plainUrl = urlParts[0].split('#')[0] || urlParts[0]

    router.replace(plainUrl, plainUrl, {
      shallow: true,
      ...routerOptions,
    })
  }
}

export default useRouterRemoveQueryParams
