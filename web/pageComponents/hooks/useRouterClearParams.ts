import { useRouter } from 'next/router'

const useRouterClearParams = () => {
  const router = useRouter()

  return (routerOptions = {}) => {
    const href = { pathname: router.pathname }
    delete router.query.filter
    router.replace(href, undefined, { shallow: true, ...routerOptions })
  }
}
export default useRouterClearParams
