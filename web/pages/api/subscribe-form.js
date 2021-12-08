import { signUp } from '../../components/utils/subscription'

export default function handler(req, res) {
  const data = req.body
  signUp(data).then((isSuccessful) => {
    if (!isSuccessful) {
      return res.status(500).json({ msg: 'Subscribe failed' })
    }
    res.status(200).json({ msg: 'Successfully subscribed.' })
  })
}
