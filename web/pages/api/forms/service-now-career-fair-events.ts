import { NextApiRequest, NextApiResponse } from 'next'
import { sendRequestToServiceNow } from './service-now-base'
import { validateCaptcha } from './validateCaptcha'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const catalogIdentifier = "848f447ddb692600ff6272dabf961948"
    const frcCaptchaSolution = req.body.frcCaptchaSolution
    const data = req.body.data
    const email = encodeURI(data.email)
    const groupOrganisation = encodeURI(data.organisation)
    const contactPerson = encodeURI(data.contactPerson)
    const phone = encodeURI(data.phone)
    const event = encodeURI(data.event)
    const eventDescription = encodeURI(data.eventDescription)
    const website = encodeURI(data.website)
    const sendSupportingDocuments = data.supportingDocuments!==""? "Yes":"No"
    const preferredLang = data.preferredLang
    
    const urlString = process.env.SERVICE_NOW_FORM_URL
    + "/api/stasa/statoildotcomproject/CareerFairs/" + process.env.SERVICE_NOW_FORM_CATALOG_ITEM 
        + "/" + catalogIdentifier
    + "?SchoolOrganisation="+groupOrganisation+"&ContactPerson="+contactPerson+"&PhoneNumber="+phone+"&Email="+email+"&Event="+event+"&DescriptionOfEvent="+eventDescription+"&LinkToWebsite="+website+"&SupportingDocuments="+sendSupportingDocuments+"&PreferredLang="+preferredLang

    if (!frcCaptchaSolution) {
        return res.status(500).json({ msg: 'Anti-robot check solution was not present' })
    } 
    try {
        const { accept, errorCode } = await validateCaptcha(frcCaptchaSolution)
        if (!accept) {
          console.log(`Anti-robot check failed [code=${errorCode}] for career fair and events form`)
          return res.status(400).json({ msg: `Anti-robot check failed [code=${errorCode}], please try again.` })
        }
      } catch (err) {
        console.error(err)
        return res.status(502).json({ msg: 'failed to validate captcha' })
      }
 await sendRequestToServiceNow(urlString).then((response)=>{
     if(JSON.parse(response).status == 'failure' || JSON.parse(response).Status?.includes("Failure")){
        console.log("Failed to create ticket in service-now")
        res.status(500).end()
     }
     res.status(200).end()
 }).catch(error =>{
     console.log(error)
     res.status(500).end()
 })
}