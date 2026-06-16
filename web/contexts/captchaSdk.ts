import { FriendlyCaptchaSDK } from '@friendlycaptcha/sdk'

let globalCaptchaSDK: FriendlyCaptchaSDK | null = null

// Initialize only on the client side
if (typeof window !== 'undefined') {
  globalCaptchaSDK = new FriendlyCaptchaSDK()
}

export { globalCaptchaSDK }
