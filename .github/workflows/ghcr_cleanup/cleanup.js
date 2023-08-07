import fetch from 'node-fetch'

// @ts-ignore
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
  const data = Array.isArray(rawData) ? rawData : []

  // Sort by activeFrom
  data.sort((a, b) => new Date(b.activeFrom).getTime() - new Date(a.activeFrom).getTime())

  // Keep only the latest 5 results
  data.slice(0, 5)

  // Filter the results, keeping only image objects
  const filteredData = data.filter((item) => item.components.filter((c) => c.image))

  console.log(JSON.stringify(filteredData, null, 2))
}

cleanup()
