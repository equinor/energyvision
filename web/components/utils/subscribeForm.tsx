import soapRequest from 'easy-soap-request'
import * as xml2js from 'xml2js'

const subscriptionUrl = 'https://stage.brandmaster.com/apigateway/apigateway.dll/SOAP_UNENCRYPTED?service=Subscription'
const authenticationUrl =
  'https://stage.brandmaster.com/apigateway/apigateway.dll/SOAP_UNENCRYPTED?service=Authentication'

const clientSecret = 'clientSecret'
const password = 'password'
const apnId = '32'
const otyId = '114961'
const ptlId = '14414'

const sampleHeaders = {
  'Content-Type': 'text/xml;charset=UTF-8',
}
const xml = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><Authentication___Login xmlns="http://tempuri.org/"><clientSecret>${clientSecret}</clientSecret><userName>SUBSCRIPTIONAPI</userName><password>${password}</password><comId>34</comId><ptlId>${ptlId}</ptlId><otyId>${otyId}</otyId><laeId>1</laeId><apnId>${apnId}</apnId></Authentication___Login></s:Body></s:Envelope>`
export const authenticate = async () => {
  const { response } = await soapRequest({
    url: authenticationUrl,
    headers: sampleHeaders,
    xml: xml,
    timeout: 5000,
  })
  const { body } = response

  xml2js.parseString(body, function (err, result) {
    const soapBody = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['0']
    if (soapBody['SOAP-ENV:Fault'] != undefined) {
      console.error('Error ' + soapBody['SOAP-ENV:Fault']['0']['faultstring'])
      return null
    }
    const loginResult = soapBody['v1:Authentication___LoginResponse']['0']['v1:Result']['0']
    const apiSecret = loginResult['v1:apiSecret']['0']
    const instId = loginResult['v1:instId']['0']
    const formParameters = {
      subscribeToStockMarketAnnouncements: 'y',
      subscribeToCompanyNews: 'n',
      subscribeToCrudeOilAssays: 'n',
      subscribeToLoopArticles: 'n',
      language_code: 'en',
    }
    createSignUpRequest({ apiSecret, instId }, formParameters)
  })
}

export const createSignUpRequest = async (
  { apiSecret, instId }: { apiSecret: string; instId: string },
  formParameters: any,
) => {
  // check if form has valid language code...
  /*if(!formParameters["language_code"] == "en" && !formParameters["language_code"] == "no"){
    console.error("Invalid language code.")
  }*/

  const additionalParameters = `
  {
    "stock_market": "${formParameters['subscribeToStockMarketAnnouncements']}",
    "company_news": "${formParameters['subscribeToCompanyNews']}",
    "crude_oil_assays":  "${formParameters['subscribeToCrudeOilAssays']}",
    "magazine": "${formParameters['subscribeToCrudeOilAssays']}",
    "magazine_people": "${formParameters['subscribeToCrudeOilAssays']}",
    "loop": "${formParameters['subscribeToLoopArticles']}",
    "lang": "${formParameters['language_code']}",
    "type": "Investor"
  }`
  const envelope = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><Subscription___SignUp xmlns="http://tempuri.org/"><clientSecret>${clientSecret}</clientSecret><apiSecret>${apiSecret}</apiSecret><instId>${instId}</instId><firstName>${formParameters['firstName']}</firstName><email>${formParameters['email']}</email><additionalParams>${additionalParameters}</additionalParams></Subscription___SignUp></s:Body></s:Envelope>`
  const { response } = await soapRequest({
    url: subscriptionUrl,
    headers: sampleHeaders,
    xml: envelope,
    timeout: 5000,
  })

  console.log(response)
}
