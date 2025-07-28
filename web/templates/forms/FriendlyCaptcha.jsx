'use client'
import { useEffect, useRef } from 'react'
import { WidgetInstance } from 'friendly-challenge'
import { useRouter } from 'next/router'
import { friendlyCaptcha } from '../../lib/config'

const FriendlyCaptcha = ({ doneCallback, errorCallback }) => {
  const puzzleEndpoint = friendlyCaptcha.puzzleEndpoint
  const container = useRef()
  const widget = useRef()
  const router = useRouter()

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: 'focus',
        doneCallback: doneCallback,
        errorCallback: errorCallback,
        puzzleEndpoint: puzzleEndpoint,
      })
    }
  }, [container, doneCallback, errorCallback, puzzleEndpoint])

  return (
    <div ref={container} className="frc-captcha" data-sitekey={friendlyCaptcha.siteKey} data-lang={router.locale} />
  )
}

export default FriendlyCaptcha
