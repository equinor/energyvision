import fetch from 'node-fetch'

const bearerToken = process.env.APP_SERVICE_ACCOUNT_TOKEN

async function cleanup() {
  const url =
    'https://server-radix-api-prod.c2.radix.equinor.com/api/v1/applications/equinor-web-sites/deployments?environment=prod'
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
  })

  const rawData = await response.json()
  const data = Array.isArray(rawData) ? rawData : undefined
  console.log(data)

  if (!data || data.length === 0) return

  // Sort by activeFrom
  data.sort((a, b) => new Date(b.activeFrom).getTime() - new Date(a.activeFrom).getTime())

  // Filter the results, keeping only latest 5 images, and only image urls
  const filteredData = data
    .slice(0, 5)
    .map((item) => item.components.map((c) => c.image))
    .flat()
    .sort()

  console.log(filteredData)

  return filteredData
}

cleanup().then((tags) => console.log(`::set-output name=tags::${tags}`))
