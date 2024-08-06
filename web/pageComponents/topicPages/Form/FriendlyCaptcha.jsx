import { useEffect, useRef } from 'react'
import { WidgetInstance } from 'friendly-challenge'
import { friendlyCaptcha } from '../../../lib/config'

const FriendlyCaptcha = ({ doneCallback, errorCallback }) => {
  const puzzleEndpoint = friendlyCaptcha.puzzleEndpoint
  const container = useRef()
  const widget = useRef()
  useEffect(() => {
    if (!widget.current && container.current) {
      console.log(puzzleEndpoint)
      widget.current = new WidgetInstance(container.current, {
        startMode: 'focus',
        doneCallback: doneCallback,
        errorCallback: errorCallback,
        puzzleEndpoint: puzzleEndpoint,
      })
    }
  }, [container, doneCallback, errorCallback, puzzleEndpoint])

  return <div ref={container} className="frc-captcha" data-sitekey={friendlyCaptcha.siteKey} />
}

export default FriendlyCaptcha
