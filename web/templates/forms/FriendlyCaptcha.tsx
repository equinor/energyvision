'use client'
import type {
  StartMode,
  WidgetHandle,
} from '@friendlycaptcha/sdk'
import { useLocale } from 'next-intl'
import {  useContext, useEffect, useRef } from 'react'
import { friendlyCaptcha } from '../../lib/config'
import { FriendlyCaptchaContext } from '@/contexts/FriendlyCaptchaContext'

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
  const widget = useRef<WidgetHandle>(null)
  const fRCContext = useContext(FriendlyCaptchaContext)
  const locale = useLocale()

  useEffect(() => {
    if (!widget.current && container.current && fRCContext?.sdk) {
      widget.current = fRCContext?.sdk?.createWidget({
        element: container.current,
        sitekey: friendlyCaptcha.siteKey,
        startMode: startMode,
        language: locale === 'no' ? 'nb' : locale,
        apiEndpoint: 'https://eu.frcapi.com/api/v2/captcha',
      })

      widget.current.addEventListener('frc:widget.complete', doneCallback)

      widget.current.addEventListener('frc:widget.error', event => {
        const detail = event.detail
        errorCallback(detail.error.detail)
        console.error(
          'Something went wrong in solving the captcha: ',
          detail.error,
        )
      })

      widget.current.addEventListener('frc:widget.expire', event => {
        console.warn(
          'The captcha solution is no longer valid, the user waited too long.',
        )
        errorCallback(event.detail.response)
      })
    }
    ;() => {
      widget.current?.destroy()
    }
  }, [doneCallback, errorCallback, locale, startMode])



  return <div ref={container} />
}

export default FriendlyCaptcha
