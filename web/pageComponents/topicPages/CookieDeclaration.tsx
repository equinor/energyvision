import { useRouter } from 'next/router'

const CookieDeclaration = () => {
  const router = useRouter()
  return (
    <>
      Cookie Declaration
      <script
        id="CookieDeclaration"
        src="https://consent.cookiebot.com/f1327b03-7951-45da-a2fd-9181babc783f/cd.js"
        type="text/javascript"
        data-culture={router.locale == 'no' ? 'nb' : router.locale}
        async
      ></script>
    </>
  )
}
export default CookieDeclaration
