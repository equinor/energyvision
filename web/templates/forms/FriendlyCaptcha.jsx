import { useEffect, useRef } from 'react'
import { FriendlyCaptchaSDK } from "@friendlycaptcha/sdk";
import { useRouter } from 'next/router'
import { friendlyCaptcha } from '../../lib/config'

const FriendlyCaptcha = ({ doneCallback, errorCallback, focusMode= "focus"}) => {
  const container = useRef()
  const widget = useRef()
  const router = useRouter()
  let sdk

  useEffect(()=>{
  // Create a SDK instance, you should only create one and re-use it.
  if(!sdk)
   sdk = new FriendlyCaptchaSDK();
  },[])


  useEffect(() => {
    if (!widget.current && container.current) {
  widget.current = sdk.createWidget({
    element: container.current,
    sitekey: friendlyCaptcha.siteKey,
    startMode:focusMode,
    language:router.locale=="no"? "nb": router.locale,
    apiEndpoint: "https://eu.frcapi.com/api/v2/captcha"
})

widget.current.addEventListener("frc:widget.complete", (event) => {
    doneCallback()
})

widget.current.addEventListener("frc:widget.error", (event) => {
    const detail = event.detail;
    errorCallback(detail.error)
    console.error("Something went wrong in solving the captcha: ", detail.error)
})

widget.current.addEventListener("frc:widget.expire", (event) => {
    console.warn("The captcha solution is no longer valid, the user waited too long.")
    //TODO
})
    }
    ()=>{
      widget.current?.destroy()
    }
  }, [container, doneCallback, errorCallback,router.locale])

  return (
    <div ref={container} />
  )
}

export default FriendlyCaptcha
