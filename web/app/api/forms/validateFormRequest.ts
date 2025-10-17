import { validateCaptcha } from './validateCaptcha'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validateFormRequest(method: string, body: any, formName: string) {
  if (method !== 'POST') {
    return { status: 405, message: 'Invalid request' }
  }
  const frcCaptchaSolution = body.frcCaptchaSolution
  if (!frcCaptchaSolution) {
    return { status: 500, message: 'Anti-robot check solution was not present' }
  }

  try {
    const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)
    if (!accept) {
      console.log(`Anti-robot check failed [code=${errorCode}] for ${formName}`)
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
