import soapRequest from 'easy-soap-request'
import * as xml2js from 'xml2js'
import { LoginResult, SubscribeFormParameters, NewsDistributionParameters } from '../../types/types'
//import { appInsights } from '../../common'

const subscriptionUrl = process.env.BRANDMASTER_EMAIL_SUBSCRIPTION_URL || ''
export const authenticationUrl = process.env.BRANDMASTER_EMAIL_AUTHENTICATION_URL || ''
const clientSecret = process.env.BRANDMASTER_EMAIL_CLIENT_SECRET
const password = process.env.BRANDMASTER_EMAIL_PASSWORD
const apnId = process.env.BRANDMASTER_EMAIL_APN_ID
const otyId = process.env.BRANDMASTER_EMAIL_OTY_ID
const ptlId = process.env.BRANDMASTER_EMAIL_PTL_ID

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
    if (err != null) console.error('Error while authenticating from Brandmaster : ----------------\n' + err)
    if (parsedError(result, 'could not get apiSecret and instId ') != undefined) return

    const soapBody = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['0']
    const loginResult = soapBody['v1:Authentication___LoginResponse']['0']['v1:Result']['0']
    apiSecret = loginResult['v1:apiSecret']['0']
    instId = loginResult['v1:instId']['0']
  })
  return { apiSecret, instId }
}

const createSignUpRequest = async (loginResult: LoginResult, formParameters: SubscribeFormParameters) => {
  const additionalParameters = `
  {
    "stock_market": "${formParameters.stockMarketAnnouncements ? 'Y' : 'N'}",
    "company_news": "${formParameters.generalNews ? 'Y' : 'N'}",
    "crude_oil_assays": "${formParameters.crudeOilAssays ? 'Y' : 'N'}",
    "magazine": "${formParameters.magazineStories ? 'Y' : 'N'}",
    "type": "Investor",
    "lang": "${formParameters.languageCode}"
  }`

  const envelope = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><Subscription___SignUp xmlns="http://tempuri.org/"><clientSecret>${clientSecret}</clientSecret><apiSecret>${loginResult.apiSecret}</apiSecret><instId>${loginResult.instId}</instId><firstName>${formParameters.firstName}</firstName><email>${formParameters.email}</email><additionalParams>${additionalParameters}</additionalParams></Subscription___SignUp></s:Body></s:Envelope>`
  const { response } = await soapRequest({
    url: subscriptionUrl,
    headers: sampleHeaders,
    xml: envelope,
    timeout: 5000,
  })
  xml2js.parseString(response.body, function (err, result) {
    if (err != null) {
      console.log('Error while creating signup request to Brandmaster : ----------------\n' + err)
      response.statusCode = 500
    }
    if (parsedError(result, 'could not create sign up request ') != undefined) {
      response.statusCode = 500
      return
    }
  })
  return response.statusCode == 200
}

const createDistributeRequest = async (loginResult: LoginResult, parameters: NewsDistributionParameters) => {
  const envelope = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><Subscription___Distribute xmlns="http://tempuri.org/"><clientSecret>${clientSecret}</clientSecret><apiSecret>${loginResult.apiSecret}</apiSecret><instId>${loginResult.instId}</instId><timeStamp>${parameters.timeStamp}</timeStamp><Title><![CDATA[${parameters.title}]]></Title><Ingress><![CDATA[${parameters.ingress}]]></Ingress><newsURL><![CDATA[${parameters.link}]]></newsURL><newsType><![CDATA[${parameters.newsType}]]></newsType><language><![CDATA[${parameters.languageCode}]]></language><additionalParams/></Subscription___Distribute></s:Body></s:Envelope>`
  const { response } = await soapRequest({
    url: subscriptionUrl,
    headers: sampleHeaders,
    xml: envelope,
    timeout: 5000,
  })
  xml2js.parseString(response.body, function (err, result) {
    if (err != null) {
      console.error('Error while creating distribute request to Brandmaster : ----------------\n' + err)
      response.statusCode = 400
    }
    const error = parsedError(
      result,
      'could not distribute newsletter ' + parameters.link + ' published at ' + parameters.timeStamp,
    )
    if (error != undefined) {
      // should trigger mail...
      console.log('Newsletter distribution failure', response.body.toString())
      // @TODO Move to Dynatrace
      // appInsights.trackEvent({name:"Newsletter distribution failure"},{message:error})
      response.statusCode = 400
    }
  })

  return response.statusCode == 200
}

export const signUp = async (formParameters: SubscribeFormParameters) => {
  const loginResult = await authenticate()
  if (loginResult.apiSecret != '' && loginResult.instId != '') return createSignUpRequest(loginResult, formParameters)
  else return false
}

export const distribute = async (parameters: NewsDistributionParameters) => {
  const loginResult = await authenticate()
  if (loginResult.apiSecret != '' && loginResult.instId != '') {
    return createDistributeRequest(loginResult, parameters)
  } else return false
}

const parsedError = (result: any, prefix: string) => {
  const soapBody = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['0']
  if (soapBody['SOAP-ENV:Fault'] != undefined) {
    const error = soapBody['SOAP-ENV:Fault']['0']['faultstring']
    console.error(Date() + ' : Newsletter Failure Error: ' + prefix + '\n' + error)
    return error
  }
}
