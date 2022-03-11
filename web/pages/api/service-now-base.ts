export const sendRequestToServiceNow =async (url:string)=>{
const headersList = {
    "Accept": "*/*",
    "Authorization": "Basic "+process.env.SERVICE_NOW_CREDENTIALS
   } 
   const response = await fetch(url,{ 
    method: "PUT",
    headers: headersList
  })
  return response.text()
}