'use server'
const FRIENDLY_CAPTCHA_SITEVERIFY_API_URL =
  'https://eu.frcapi.com/api/v2/captcha/siteverify'

const API_KEY = process.env.FRIENDLY_CAPTCHA_API_KEY || ''
async function validateCaptcha(captchaSolution: string, acceptErrors = false) {
  // API docs here: https://developer.friendlycaptcha.com/docs/v2/api/siteverify
  const res = await fetch(FRIENDLY_CAPTCHA_SITEVERIFY_API_URL, {
    method: 'POST',
    body: JSON.stringify({
      response: captchaSolution,
      sitekey: process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITEKEY,
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
  })

  // Looks like {success: false, errors: ["secret_missing"], details: "secret is missing"}
  // or {success: true} in case of success
  // biome-ignore lint/suspicious/noImplicitAnyLet: Don't know what response type is
  let respBody
  try {
    respBody = await res.json()
  } catch (e) {
    respBody = {
      success: false,
      errors: ['could_not_parse_as_json'],
      details: JSON.stringify(e),
    }
  }
  // if unauthorized
  if (res.status === 400 || res.status === 401) {
    console.error(
      'FRIENDLY CAPTCHA MISCONFIGURATION WARNING\nCould not verify Friendly Captcha solution due to client error:',
      respBody,
    )
    return {
      accept: acceptErrors,
      captchaError: respBody.error.error_code,
      captchaDetail: respBody.error.detail,
      errorCode: 500,
    }
  }
  // if success
  if (res.status === 200) {
    return {
      accept: respBody.success,
      errorCode: respBody.error?.error_code,
    }
  }
  // otherwise
  console.error(
    'Could not verify Friendly Captcha solution due to external issue:',
    respBody,
  )
  return {
    accept: acceptErrors,
    captchaError: respBody.error.error_code,
    captchaDetail: respBody.error.detail,
    errorCode: 500,
  }
}

export default async function verifyCaptcha(
  frcCaptchaSolution: any,
): Promise<boolean | { error: string }> {
  try {
    const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)
    if (!accept) {
      console.log(
        `Anti-robot check failed [code=${errorCode}] for file download`,
      )
      return {
        error: `Anti-robot check failed [code=${errorCode}], please try again.`,
      }
    }
    return true
  } catch (err) {
    console.error('Error occured while attempting to validate captcha', err)
    return { error: 'failed to validate captcha' }
  }
}
