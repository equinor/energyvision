"use server"
import { validateCaptcha } from '@/app/api/forms/validateCaptcha'

export default async function verifyCaptcha(frcCaptchaSolution:any): Promise<boolean|{error:string}> {
    try {
        const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)
        if (!accept) {
          console.log(`Anti-robot check failed [code=${errorCode}] for file download`)
          return { error: `Anti-robot check failed [code=${errorCode}], please try again.` }
        }
        return true
      } catch (err) {
        console.error('Error occured while attempting to validate captcha', err)
        return { error: 'failed to validate captcha' }
      }
}
