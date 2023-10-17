export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })
}

export const pushToDataLayer = (event, data) => {
  console.log(event, data)
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: event,
    ...data,
  })
}
