import { signUp } from './subscription'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateFormRequest } from './forms/validateFormRequest'

export default async function handler(
  req: { body: { subscribeFormParamers: any; frcCaptchaSolution: any }; method: string },
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: { error?: any; msg?: string }): any; new (): any }
    }
  },
) {
  console.log('📥 API received request with:', req.body)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { subscribeFormParamers, frcCaptchaSolution } = req.body

  // 🛑 Check if subscribeFormParamers is undefined
  if (!subscribeFormParamers || !subscribeFormParamers.email) {
    console.error('❌ Missing or invalid subscribeFormParamers:', subscribeFormParamers)
    return res.status(400).json({ msg: 'Invalid request data' })
  }

  console.log('✅ Valid request data:', subscribeFormParamers)

  try {
    const success = await signUp(subscribeFormParamers)
    if (!success) throw new Error('Subscription failed')

    return res.status(200).json({ msg: 'Subscription successful' })
  } catch (error) {
    console.error('❌ Error in signUp:', (error as Error).message)
    return res.status(500).json({ msg: 'Subscription failed', error: (error as Error).message })
  }
}


