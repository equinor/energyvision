import { useEffect, useRef } from 'react'
import { WidgetInstance } from 'friendly-challenge'

const FriendlyCaptcha = ({ doneCallback, errorCallback }) => {
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

    return () => {
      if (widget.current != undefined) widget.current.destroy()
    }
  }, [container])

  return <div ref={container} className="frc-captcha" data-sitekey="FCMJCLB7MR20RMO6" />
}

export default FriendlyCaptcha
