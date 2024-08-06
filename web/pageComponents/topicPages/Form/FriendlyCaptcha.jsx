import { useEffect, useRef } from 'react'
import { WidgetInstance } from 'friendly-challenge'

const FriendlyCaptcha = ({ doneCallback, errorCallback }) => {
  const sitekey = process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY
  const container = useRef()
  const widget = useRef()
  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: 'focus',
        doneCallback: doneCallback,
        errorCallback: errorCallback,
        puzzleEndpoint: 'https://eu-api.friendlycaptcha.eu/api/v1/puzzle',
      })
    }
  }, [container, doneCallback, errorCallback])

  return <div ref={container} className="frc-captcha" data-sitekey={sitekey} />
}

export default FriendlyCaptcha
