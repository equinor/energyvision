import { createContext, useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { friendlyCaptcha } from '../../lib/config'
import { FriendlyCaptchaSDK, StartMode, WidgetHandle } from '@friendlycaptcha/sdk'

export const FriendlyCaptchaContext = createContext<FriendlyCaptchaSDK | undefined>(undefined)

const FriendlyCaptcha = ({
  doneCallback,
  errorCallback,
  startMode = 'focus',
}: {
  doneCallback: (event: any) => void
  errorCallback: (error: string) => void
  startMode?: StartMode
}) => {
  const container = useRef(null)
  const widget = useRef<WidgetHandle>()
  const router = useRouter()
  const sdk = useContext(FriendlyCaptchaContext)

  useEffect(() => {
    if (!widget.current && container.current && sdk) {
      widget.current = sdk?.createWidget({
        element: container.current,
        sitekey: friendlyCaptcha.siteKey,
        startMode: startMode,
        language: router.locale == 'no' ? 'nb' : router.locale,
        apiEndpoint: 'https://eu.frcapi.com/api/v2/captcha',
      })

      widget.current.addEventListener('frc:widget.complete', doneCallback)

      widget.current.addEventListener('frc:widget.error', (event) => {
        const detail = event.detail
        errorCallback(detail.error.detail)
        console.error('Something went wrong in solving the captcha: ', detail.error)
      })

      widget.current.addEventListener('frc:widget.expire', (event) => {
        console.warn('The captcha solution is no longer valid, the user waited too long.')
        errorCallback(event.detail.response)
      })
    }
    ;() => {
      widget.current?.destroy()
    }
  }, [container, doneCallback, errorCallback, router.locale, sdk, startMode])

  return <div ref={container} />
}

export default FriendlyCaptcha
