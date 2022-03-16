import { NextApiRequest, NextApiResponse } from 'next'
import { sendRequestToServiceNow } from './service-now-base'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const catalogIdentifier = "66f0ff89db2e2644ff6272dabf961945"
    const data = req.body
    const email = encodeURI(data.email)
    const category = encodeURI(data.category)
    const howCanWeHelp = encodeURI(data.message)
    const tryingToReach = encodeURI(data.receiver)
    const name = encodeURI(data.name)
   
    const urlString = process.env.SERVICE_NOW_FORM_URL
                    + "/api/stasa/statoildotcomproject/ContactUs/" + process.env.SERVICE_NOW_FORM_CATALOG_ITEM + "/"
                    + catalogIdentifier + "?Email=" + email + "&Category=" + category + "&HowCanWeHelp="
                    + howCanWeHelp + "&TryingToReach=" + tryingToReach + "&Name=" + name;

                
 await sendRequestToServiceNow(urlString).then((response)=>{
     if(JSON.parse(response).status == 'failure')
        console.log("Failed to create ticket in service-now")
     res.status(200).end()
 }).catch(error =>{
     console.log(error)
     res.status(500).end()
 })
}