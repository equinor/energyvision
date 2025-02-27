import { Flags } from '../../../common/helpers/datasetHelpers'

export const sendRequestToServiceNow = async (url: string) => {
  if (Flags.IS_DEV) console.log('Request to service now \n' + url)
  const headersList = {
    Accept: '*/*',
    Authorization: 'Basic ' + process.env.SERVICE_NOW_CREDENTIALS,
  }
  const response = await fetch(url, {
    method: 'PUT',
    headers: headersList,
  })
  return response.text()
}
