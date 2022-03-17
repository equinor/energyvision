import { NextApiRequest, NextApiResponse } from 'next'
import { sendRequestToServiceNow } from './../service-now-base'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const catalogIdentifier = "848f447ddb692600ff6272dabf961948"
    const data = req.body
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

    console.log(urlString)
 await sendRequestToServiceNow(urlString).then((response)=>{
     if(JSON.parse(response).status == 'failure')
        console.log("Failed to create ticket in service-now")
     res.status(200).end()
 }).catch(error =>{
     console.log(error)
     res.status(500).end()
 })
}