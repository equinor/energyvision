import soapRequest from 'easy-soap-request'
import * as xml2js from 'xml2js'
import { LoginResult, SubscribeFormParmeters } from '../../types/types'

const subscriptionUrl = 'https://stage.brandmaster.com/apigateway/apigateway.dll/SOAP_UNENCRYPTED?service=Subscription'
const authenticationUrl =
  'https://stage.brandmaster.com/apigateway/apigateway.dll/SOAP_UNENCRYPTED?service=Authentication'

const clientSecret = '436A925B124666CCE053F210630A046C'
const password = 'df823HISD!io8Hnsdf'
const apnId = '32'
const otyId = '114961'
const ptlId = '14414'

const sampleHeaders = {
  'Content-Type': 'text/xml;charset=UTF-8',
}
const xml = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><Authentication___Login xmlns="http://tempuri.org/"><clientSecret>${clientSecret}</clientSecret><userName>SUBSCRIPTIONAPI</userName><password>${password}</password><comId>34</comId><ptlId>${ptlId}</ptlId><otyId>${otyId}</otyId><laeId>1</laeId><apnId>${apnId}</apnId></Authentication___Login></s:Body></s:Envelope>`
const authenticate = async () => {
  const { response } = await soapRequest({
    url: authenticationUrl,
    headers: sampleHeaders,
    xml: xml,
    timeout: 5000,
  })
  const { body } = response

  let apiSecret = ''
  let instId = ''
  xml2js.parseString(body, function (err, result) {
    if (err != null) console.error(err)
    const soapBody = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['0']
    if (soapBody['SOAP-ENV:Fault'] != undefined) {
      console.error('Error ' + soapBody['SOAP-ENV:Fault']['0']['faultstring'])
      return null
    }
    const loginResult = soapBody['v1:Authentication___LoginResponse']['0']['v1:Result']['0']
    apiSecret = loginResult['v1:apiSecret']['0']
    instId = loginResult['v1:instId']['0']
  })
  return { apiSecret, instId }
}

const createSignUpRequest = async (loginResult: LoginResult, formParameters: SubscribeFormParmeters) => {
  const additionalParameters = `
  {
    "stock_market": "${formParameters.stockMarketAnnouncements ? 'y' : 'n'}",
    "company_news": "${formParameters.generalNews ? 'y' : 'n'}",
    "crude_oil_assays":  "${formParameters.crudeOilAssays ? 'y' : 'n'}",
    "magazine": "${formParameters.magazineStories ? 'y' : 'n'}",
    "loop": "${formParameters.loopStories ? 'y' : 'n'}",
    "type": "Investor",
    "lang": "${formParameters.languageCode}",
  }`

  const envelope = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><Subscription___SignUp xmlns="http://tempuri.org/"><clientSecret>${clientSecret}</clientSecret><apiSecret>${loginResult.apiSecret}</apiSecret><instId>${loginResult.instId}</instId><firstName>${formParameters.firstName}</firstName><email>${formParameters.email}</email><additionalParams>${additionalParameters}</additionalParams></Subscription___SignUp></s:Body></s:Envelope>`
  const { response } = await soapRequest({
    url: subscriptionUrl,
    headers: sampleHeaders,
    xml: envelope,
    timeout: 5000,
  })

  console.log(response)
  return response.statusCode == 200
}

export const signUp = async (formParameters: SubscribeFormParmeters) => {
  const loginResult = await authenticate()
  return createSignUpRequest(loginResult, formParameters)
}
