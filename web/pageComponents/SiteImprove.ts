export const loadSiteImproveScript = () => {
  const script = document.createElement('script')
  script.src = 'https://siteimproveanalytics.com/js/siteanalyze_6003171.js'
  script.id = 'siteimprove'
  script.async = true
  document.head.appendChild(script)
}

export const cleanUpSiteImproveScript = () => {
  document.getElementById('siteimprove')?.remove()
}
