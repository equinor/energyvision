import { NextApiRequest } from 'next'
import { validateCaptcha } from '../validate/validateCaptcha'

export async function validateFormRequest(req: NextApiRequest, formName: string) {
  if (req.method !== 'POST') {
    return { status: 405, message: 'Invalid request' }
  }

  const frcCaptchaSolution = req.body.frcCaptchaSolution
  if (!frcCaptchaSolution) {
    return { status: 500, message: 'Anti-robot check solution was not present' }
  }

  try {
    const allowErrors = formName === 'contact us form'
    const { accept, errorCode, captchaDetail, captchaError } = await validateCaptcha(frcCaptchaSolution, allowErrors)

    if (!accept) {
      console.log(`Anti-robot check failed [code=${errorCode}] for ${formName}`)
      console.error(`Captcha internal error: ${captchaError} - ${captchaDetail}`)
      return { status: 400, message: `Anti-robot check failed [code=${errorCode}], please try again.` }
    }
  } catch (err) {
    console.error('Error occured while attempting to validate captcha', err)
    return { status: 502, message: 'failed to validate captcha' }
  }

  return {
    status: 200,
    message: 'ok',
  }
}
